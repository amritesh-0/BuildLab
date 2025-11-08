/**
 * GhostCursor - A smooth, animated cursor trail effect using Three.js
 * Pure vanilla JavaScript implementation (no React dependencies)
 */

class GhostCursor {
  constructor(container, options = {}) {
    // Default options
    this.options = {
      trailLength: options.trailLength ?? 50,
      inertia: options.inertia ?? 0.5,
      grainIntensity: options.grainIntensity ?? 0.05,
      bloomStrength: options.bloomStrength ?? 0.1,
      bloomRadius: options.bloomRadius ?? 1.0,
      bloomThreshold: options.bloomThreshold ?? 0.025,
      brightness: options.brightness ?? 1,
      color: options.color ?? '#B19EEF',
      mixBlendMode: options.mixBlendMode ?? 'screen',
      edgeIntensity: options.edgeIntensity ?? 0,
      maxDevicePixelRatio: options.maxDevicePixelRatio ?? 0.5,
      fadeDelayMs: options.fadeDelayMs ?? 1000,
      fadeDurationMs: options.fadeDurationMs ?? 1500,
      zIndex: options.zIndex ?? 10
    };

    this.container = container;
    this.parent = container.parentElement;
    
    // State
    this.trailBuffer = [];
    this.head = 0;
    this.currentMouse = { x: 0.5, y: 0.5 };
    this.velocity = { x: 0, y: 0 };
    this.fadeOpacity = 1.0;
    this.lastMoveTime = performance.now();
    this.pointerActive = false;
    this.running = false;
    this.rafId = null;

    // Detect touch device
    this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Adjust defaults for touch
    if (this.isTouch) {
      this.options.fadeDelayMs = this.options.fadeDelayMs ?? 500;
      this.options.fadeDurationMs = this.options.fadeDurationMs ?? 1000;
    }

    this.init();
  }

  init() {
    if (!window.THREE) {
      console.error('Three.js is required for GhostCursor');
      return;
    }

    // Set parent position
    const prevParentPos = this.parent.style.position;
    if (!prevParentPos || prevParentPos === 'static') {
      this.parent.style.position = 'relative';
    }
    this.prevParentPos = prevParentPos;

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({
      antialias: !this.isTouch,
      alpha: true,
      depth: false,
      stencil: false,
      powerPreference: this.isTouch ? 'low-power' : 'high-performance',
      premultipliedAlpha: false,
      preserveDrawingBuffer: false
    });
    
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.style.pointerEvents = 'none';
    this.renderer.domElement.style.position = 'absolute';
    this.renderer.domElement.style.inset = '0';
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.renderer.domElement.style.zIndex = this.options.zIndex;
    
    if (this.options.mixBlendMode) {
      this.renderer.domElement.style.mixBlendMode = this.options.mixBlendMode;
    }

    this.container.appendChild(this.renderer.domElement);

    // Setup scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Initialize trail buffer
    const maxTrail = Math.max(1, Math.floor(this.options.trailLength));
    this.trailBuffer = Array.from({ length: maxTrail }, () => ({ x: 0.5, y: 0.5 }));

    // Create material
    this.createMaterial(maxTrail);

    // Create mesh
    const geometry = new THREE.PlaneGeometry(2, 2);
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Setup post-processing
    this.setupPostProcessing();

    // Setup resize observer
    this.resize();
    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(this.parent);
    this.resizeObserver.observe(this.container);

    // Setup event listeners
    this.bindEvents();

    // Start animation
    this.startTime = performance.now();
    this.ensureLoop();
  }

  createMaterial(maxTrail) {
    const baseColor = new THREE.Color(this.options.color);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec2 iMouse;
      uniform vec2 iPrevMouse[${maxTrail}];
      uniform float iOpacity;
      uniform float iScale;
      uniform vec3 iBaseColor;
      uniform float iBrightness;
      uniform float iEdgeIntensity;
      varying vec2 vUv;

      float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i = floor(p), f = fract(p);
        f *= f * (3. - 2. * f);
        return mix(mix(hash(i + vec2(0.,0.)), hash(i + vec2(1.,0.)), f.x),
                   mix(hash(i + vec2(0.,1.)), hash(i + vec2(1.,1.)), f.x), f.y);
      }
      float fbm(vec2 p){
        float v = 0.0;
        float a = 0.5;
        mat2 m = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for(int i=0;i<5;i++){
          v += a * noise(p);
          p = m * p * 2.0;
          a *= 0.5;
        }
        return v;
      }
      vec3 tint1(vec3 base){ return mix(base, vec3(1.0), 0.15); }
      vec3 tint2(vec3 base){ return mix(base, vec3(0.8, 0.9, 1.0), 0.25); }

      vec4 blob(vec2 p, vec2 mousePos, float intensity, float activity) {
        vec2 q = vec2(fbm(p * iScale + iTime * 0.1), fbm(p * iScale + vec2(5.2,1.3) + iTime * 0.1));
        vec2 r = vec2(fbm(p * iScale + q * 1.5 + iTime * 0.15), fbm(p * iScale + q * 1.5 + vec2(8.3,2.8) + iTime * 0.15));

        float smoke = fbm(p * iScale + r * 0.8);
        float radius = 0.5 + 0.3 * (1.0 / iScale);
        float distFactor = 1.0 - smoothstep(0.0, radius * activity, length(p - mousePos));
        float alpha = pow(smoke, 2.5) * distFactor;

        vec3 c1 = tint1(iBaseColor);
        vec3 c2 = tint2(iBaseColor);
        vec3 color = mix(c1, c2, sin(iTime * 0.5) * 0.5 + 0.5);

        return vec4(color * alpha * intensity, alpha * intensity);
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy / iResolution.xy * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
        vec2 mouse = (iMouse * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);

        vec3 colorAcc = vec3(0.0);
        float alphaAcc = 0.0;

        vec4 b = blob(uv, mouse, 1.0, iOpacity);
        colorAcc += b.rgb;
        alphaAcc += b.a;

        for (int i = 0; i < ${maxTrail}; i++) {
          vec2 pm = (iPrevMouse[i] * 2.0 - 1.0) * vec2(iResolution.x / iResolution.y, 1.0);
          float t = 1.0 - float(i) / float(${maxTrail});
          t = pow(t, 2.0);
          if (t > 0.01) {
            vec4 bt = blob(uv, pm, t * 0.8, iOpacity);
            colorAcc += bt.rgb;
            alphaAcc += bt.a;
          }
        }

        colorAcc *= iBrightness;

        vec2 uv01 = gl_FragCoord.xy / iResolution.xy;
        float edgeDist = min(min(uv01.x, 1.0 - uv01.x), min(uv01.y, 1.0 - uv01.y));
        float distFromEdge = clamp(edgeDist * 2.0, 0.0, 1.0);
        float k = clamp(iEdgeIntensity, 0.0, 1.0);
        float edgeMask = mix(1.0 - k, 1.0, distFromEdge);

        float outAlpha = clamp(alphaAcc * iOpacity * edgeMask, 0.0, 1.0);
        gl_FragColor = vec4(colorAcc, outAlpha);
      }
    `;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(1, 1, 1) },
        iMouse: { value: new THREE.Vector2(0.5, 0.5) },
        iPrevMouse: { value: this.trailBuffer.map(v => new THREE.Vector2(v.x, v.y)) },
        iOpacity: { value: 1.0 },
        iScale: { value: 1.0 },
        iBaseColor: { value: new THREE.Vector3(baseColor.r, baseColor.g, baseColor.b) },
        iBrightness: { value: this.options.brightness },
        iEdgeIntensity: { value: this.options.edgeIntensity }
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false
    });
  }

  setupPostProcessing() {
    // Simplified version without post-processing dependencies
    // Will render directly to screen for broader compatibility
    this.composer = null;
  }

  calculateScale() {
    const rect = this.container.getBoundingClientRect();
    const base = 600;
    const current = Math.min(Math.max(1, rect.width), Math.max(1, rect.height));
    return Math.max(0.5, Math.min(2.0, current / base));
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const cssW = Math.max(1, Math.floor(rect.width));
    const cssH = Math.max(1, Math.floor(rect.height));

    const pixelBudget = this.isTouch ? 0.9e6 : 1.3e6;
    const currentDPR = Math.min(window.devicePixelRatio || 1, this.options.maxDevicePixelRatio);
    const need = cssW * cssH * currentDPR * currentDPR;
    const scale = need <= pixelBudget ? 1 : Math.max(0.5, Math.min(1, Math.sqrt(pixelBudget / Math.max(1, need))));
    const pixelRatio = currentDPR * scale;

    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(cssW, cssH, false);

    if (this.composer) {
      if (this.composer.setPixelRatio) this.composer.setPixelRatio(pixelRatio);
      this.composer.setSize(cssW, cssH);
    }

    const wpx = Math.max(1, Math.floor(cssW * pixelRatio));
    const hpx = Math.max(1, Math.floor(cssH * pixelRatio));
    this.material.uniforms.iResolution.value.set(wpx, hpx, 1);
    this.material.uniforms.iScale.value = this.calculateScale();
  }

  bindEvents() {
    this.onPointerMove = (e) => {
      const rect = this.parent.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
      const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / Math.max(1, rect.height)));
      this.currentMouse.x = x;
      this.currentMouse.y = y;
      this.pointerActive = true;
      this.lastMoveTime = performance.now();
      this.ensureLoop();
    };

    this.onPointerEnter = () => {
      this.pointerActive = true;
      this.ensureLoop();
    };

    this.onPointerLeave = () => {
      this.pointerActive = false;
      this.lastMoveTime = performance.now();
      this.ensureLoop();
    };

    this.parent.addEventListener('pointermove', this.onPointerMove, { passive: true });
    this.parent.addEventListener('pointerenter', this.onPointerEnter, { passive: true });
    this.parent.addEventListener('pointerleave', this.onPointerLeave, { passive: true });
  }

  animate = () => {
    const now = performance.now();
    const t = (now - this.startTime) / 1000;

    if (this.pointerActive) {
      this.velocity.x = this.currentMouse.x - this.material.uniforms.iMouse.value.x;
      this.velocity.y = this.currentMouse.y - this.material.uniforms.iMouse.value.y;
      this.material.uniforms.iMouse.value.set(this.currentMouse.x, this.currentMouse.y);
      this.fadeOpacity = 1.0;
    } else {
      this.velocity.x *= this.options.inertia;
      this.velocity.y *= this.options.inertia;
      if (this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y > 1e-6) {
        this.material.uniforms.iMouse.value.x += this.velocity.x;
        this.material.uniforms.iMouse.value.y += this.velocity.y;
      }
      const dt = now - this.lastMoveTime;
      if (dt > this.options.fadeDelayMs) {
        const k = Math.min(1, (dt - this.options.fadeDelayMs) / this.options.fadeDurationMs);
        this.fadeOpacity = Math.max(0, 1 - k);
      }
    }

    // Update trail
    const N = this.trailBuffer.length;
    this.head = (this.head + 1) % N;
    this.trailBuffer[this.head].x = this.material.uniforms.iMouse.value.x;
    this.trailBuffer[this.head].y = this.material.uniforms.iMouse.value.y;
    
    const arr = this.material.uniforms.iPrevMouse.value;
    for (let i = 0; i < N; i++) {
      const srcIdx = (this.head - i + N) % N;
      arr[i].set(this.trailBuffer[srcIdx].x, this.trailBuffer[srcIdx].y);
    }

    this.material.uniforms.iOpacity.value = this.fadeOpacity;
    this.material.uniforms.iTime.value = t;

    // Render directly without post-processing for compatibility
    this.renderer.render(this.scene, this.camera);

    if (!this.pointerActive && this.fadeOpacity <= 0.001) {
      this.running = false;
      this.rafId = null;
      return;
    }

    this.rafId = requestAnimationFrame(this.animate);
  };

  ensureLoop() {
    if (!this.running) {
      this.running = true;
      this.rafId = requestAnimationFrame(this.animate);
    }
  }

  destroy() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
    this.running = false;

    this.parent.removeEventListener('pointermove', this.onPointerMove);
    this.parent.removeEventListener('pointerenter', this.onPointerEnter);
    this.parent.removeEventListener('pointerleave', this.onPointerLeave);

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    if (this.mesh) {
      this.scene.remove(this.mesh);
      this.mesh.geometry.dispose();
      this.material.dispose();
    }

    if (this.composer) {
      this.composer.dispose();
    }

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement && this.renderer.domElement.parentElement) {
        this.renderer.domElement.parentElement.removeChild(this.renderer.domElement);
      }
    }

    if (!this.prevParentPos || this.prevParentPos === 'static') {
      this.parent.style.position = this.prevParentPos;
    }
  }
}

// Export for use in other files
window.GhostCursor = GhostCursor;
