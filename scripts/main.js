// Main JavaScript for BuildLab Platform

// State Management
const state = {
    currentView: 'design',
    selectedComponent: null,
    targetCursor: null,
    canvas: {
        components: [],
        zoom: 1
    },
    chat: {
        messages: []
    },
    generatedCode: {
        html: '',
        css: '',
        javascript: '',
        backend: '',
        database: '',
        full: ''
    },
    projectConfig: {
        name: 'My App',
        framework: 'html',
        hasBackend: false,
        hasDatabase: false,
        hasAuth: false
    }
};

// Make state globally accessible for ai-assistant.js
window.state = state;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeScrollEffects();
    initializeBuilderInteractions();
    initializeTargetCursor();
    // Chat is initialized by ai-assistant.js
    addMouseTrackingEffects();
    checkLoginAndAutoOpen();
    updateNavigation(); // Update navigation based on login status
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize Scroll Animations
function initializeAnimations() {
    // Add fade-in animations to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-description, .hero-cta, .hero-stats, .hero-demo');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}

// Scroll Reveal Effects
function initializeScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe step items
    document.querySelectorAll('.step-item').forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.2}s`;
        observer.observe(step);
    });
}

// Mouse Tracking Effects for Interactive Cards
function addMouseTrackingEffects() {
    const cards = document.querySelectorAll('.feature-card, .step-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            card.style.setProperty('--mouse-x', `${x}%`);
            card.style.setProperty('--mouse-y', `${y}%`);
            
            // Add tilt effect
            const tiltX = ((y - 50) / 50) * 5;
            const tiltY = ((x - 50) / 50) * -5;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// Builder Modal Functions
function startBuilding() {
    console.log('🚀 Start Building clicked!');
    
    // Check if user is logged in
    const user = localStorage.getItem('buildlab_user');
    let isLoggedIn = false;
    
    if (user) {
        try {
            const userData = JSON.parse(user);
            isLoggedIn = userData.loggedIn === true;
            console.log('User login status:', isLoggedIn);
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    
    if (isLoggedIn) {
        // User is logged in, open builder directly
        console.log('✅ User logged in, opening builder...');
        openBuilder();
    } else {
        // User not logged in, show login modal first
        console.log('🔐 User not logged in, showing login modal...');
        showLoginModal();
    }
}

function showLoginModal() {
    const loginModal = document.getElementById('loginModal');
    
    if (!loginModal) {
        console.error('❌ Login modal not found!');
        return;
    }
    
    console.log('📋 Opening login modal...');
    loginModal.classList.add('active');
    loginModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = loginModal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function closeLoginModal() {
    console.log('Closing login modal...');
    const loginModal = document.getElementById('loginModal');
    
    if (!loginModal) {
        console.error('Login modal not found!');
        return;
    }
    
    const modalContent = loginModal.querySelector('.modal-content');
    
    // Add exit animation
    if (modalContent) {
        modalContent.style.animation = 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => {
        loginModal.classList.remove('active');
        loginModal.style.display = 'none';
        document.body.style.overflow = '';
        console.log('✅ Login modal closed');
    }, 300);
}

function handleQuickLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('quickUsername').value;
    const password = document.getElementById('quickPassword').value;
    const loginBtn = document.getElementById('quickLoginBtn');
    
    console.log('🔑 Quick login attempt:', { username });
    
    // Show loading state
    loginBtn.classList.add('loading');
    loginBtn.disabled = true;
    
    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
        if (username && password) {
            // Store user data
            const userData = {
                email: username,
                name: username,
                plan: 'Pro Plan',
                avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
                loggedIn: true,
                timestamp: Date.now()
            };
            
            localStorage.setItem('buildlab_user', JSON.stringify(userData));
            console.log('✅ Login successful!');
            
            // Close login modal
            closeLoginModal();
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 400);
        } else {
            alert('Please enter valid credentials');
            loginBtn.classList.remove('loading');
            loginBtn.disabled = false;
        }
    }, 1500);
}

function openBuilder() {
    console.log('🎨 Opening builder...');
    const builderModal = document.getElementById('builderModal');
    
    if (!builderModal) {
        console.error('❌ Builder modal not found!');
        alert('Builder modal not found. Please refresh the page.');
        return;
    }
    
    console.log('Modal found, activating...');
    builderModal.classList.add('active');
    builderModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = builderModal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Initialize canvas
    initializeCanvas();
    
    // Welcome message with user data
    const user = localStorage.getItem('buildlab_user');
    if (user) {
        try {
            const userData = JSON.parse(user);
            setTimeout(() => {
                addChatMessage(`Welcome back, ${userData.name}! 🎉\n\nReady to build something amazing? Let's get started!`, 'ai');
            }, 500);
        } catch (error) {
            console.error('Error parsing user data:', error);
        }
    }
    
    console.log('✅ Builder modal activated successfully!');
}

function closeBuilder() {
    console.log('Closing builder...');
    const modal = document.getElementById('builderModal');
    
    if (!modal) {
        console.error('Modal not found!');
        return;
    }
    
    const modalContent = modal.querySelector('.modal-content');
    
    // Add exit animation
    if (modalContent) {
        modalContent.style.animation = 'slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    setTimeout(() => {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
        console.log('✅ Builder closed');
    }, 300);
}

function showDemo() {
    // Create and show demo video or interactive demo
    alert('Demo feature coming soon! This would show an interactive walkthrough of the platform.');
}

// Builder Interactions
function initializeBuilderInteractions() {
    // Drag and Drop for Components
    const componentItems = document.querySelectorAll('.component-item');
    const canvasArea = document.getElementById('canvasArea');
    
    if (componentItems && canvasArea) {
        componentItems.forEach(item => {
            item.addEventListener('dragstart', handleDragStart);
            item.addEventListener('dragend', handleDragEnd);
        });
        
        canvasArea.addEventListener('dragover', handleDragOver);
        canvasArea.addEventListener('drop', handleDrop);
    }
    
    // Toolbar button interactions
    const toolbarBtns = document.querySelectorAll('.toolbar-btn');
    toolbarBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            toolbarBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Add ripple effect
            addRippleEffect(this);
        });
    });
}

let draggedComponent = null;

function handleDragStart(e) {
    draggedComponent = e.target.cloneNode(true);
    e.target.style.opacity = '0.5';
    
    // Add visual feedback
    e.dataTransfer.effectAllowed = 'copy';
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    
    // Add visual feedback to canvas
    const canvasArea = document.getElementById('canvasArea');
    canvasArea.style.background = 'rgba(99, 102, 241, 0.05)';
}

function handleDrop(e) {
    e.preventDefault();
    
    const canvasArea = document.getElementById('canvasArea');
    canvasArea.style.background = '';
    
    if (draggedComponent) {
        // Remove placeholder if exists
        const placeholder = canvasArea.querySelector('.canvas-placeholder');
        if (placeholder) {
            placeholder.remove();
        }
        
        // Create new component on canvas
        const newComponent = createCanvasComponent(draggedComponent, e);
        canvasArea.appendChild(newComponent);
        
        // Add to state
        state.canvas.components.push({
            id: Date.now(),
            type: draggedComponent.textContent.trim(),
            position: { x: e.offsetX, y: e.offsetY }
        });
        
        // Show success animation
        newComponent.style.animation = 'scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
}

function createCanvasComponent(template, dropEvent) {
    const component = document.createElement('div');
    component.className = 'canvas-component';
    component.style.cssText = `
        position: absolute;
        left: ${dropEvent.offsetX}px;
        top: ${dropEvent.offsetY}px;
        padding: 1.5rem;
        background: var(--bg-secondary);
        border: 2px solid var(--primary-color);
        border-radius: var(--radius-lg);
        cursor: move;
        min-width: 150px;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
    `;
    
    const icon = template.querySelector('svg').cloneNode(true);
    const text = document.createElement('div');
    text.textContent = template.textContent.trim();
    text.style.cssText = 'margin-top: 0.5rem; font-size: 0.875rem; color: var(--text-primary);';
    
    component.appendChild(icon);
    component.appendChild(text);
    
    // Make draggable within canvas
    makeDraggable(component);
    
    // Add click handler for selection
    component.addEventListener('click', () => selectComponent(component));
    
    return component;
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    element.onmousedown = dragMouseDown;
    
    function dragMouseDown(e) {
        e.preventDefault();
        e.stopPropagation();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        element.style.zIndex = '1000';
    }
    
    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }
    
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        element.style.zIndex = '';
    }
}

function selectComponent(component) {
    // Remove previous selection
    document.querySelectorAll('.canvas-component').forEach(c => {
        c.style.borderColor = 'var(--primary-color)';
    });
    
    // Highlight selected
    component.style.borderColor = 'var(--accent-color)';
    state.selectedComponent = component;
    
    // Update properties panel
    updatePropertiesPanel(component);
}

function updatePropertiesPanel(component) {
    const propertiesContent = document.querySelector('.properties-content');
    const componentType = component.querySelector('div').textContent;
    
    propertiesContent.innerHTML = `
        <div style="padding: 1rem 0;">
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">Component Type</label>
                <input type="text" value="${componentType}" readonly style="width: 100%; padding: 0.625rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.875rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">Width</label>
                <input type="text" value="150px" style="width: 100%; padding: 0.625rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.875rem;">
            </div>
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">Height</label>
                <input type="text" value="auto" style="width: 100%; padding: 0.625rem; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); color: var(--text-primary); font-size: 0.875rem;">
            </div>
            <button onclick="deleteComponent()" style="width: 100%; padding: 0.75rem; background: var(--danger-color); border: none; border-radius: var(--radius-md); color: white; font-weight: 600; cursor: pointer; transition: all 0.2s;">Delete Component</button>
        </div>
    `;
}

function deleteComponent() {
    if (state.selectedComponent) {
        state.selectedComponent.style.animation = 'scaleOut 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            state.selectedComponent.remove();
            state.selectedComponent = null;
            document.querySelector('.properties-content').innerHTML = '<p class="properties-empty">Select a component to edit its properties</p>';
        }, 300);
    }
}

// Add scale out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes scaleOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.8); }
    }
    @keyframes slideDown {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(40px); }
    }
`;
document.head.appendChild(style);

function initializeCanvas() {
    const canvasArea = document.getElementById('canvasArea');
    
    // Setup project config listeners
    const projectName = document.getElementById('projectName');
    const hasBackend = document.getElementById('hasBackend');
    const hasDatabase = document.getElementById('hasDatabase');
    const hasAuth = document.getElementById('hasAuth');
    
    if (projectName) {
        projectName.addEventListener('input', (e) => {
            state.projectConfig.name = e.target.value;
        });
    }
    
    if (hasBackend) {
        hasBackend.addEventListener('change', (e) => {
            state.projectConfig.hasBackend = e.target.checked;
            addChatMessage(`Backend API ${e.target.checked ? 'enabled' : 'disabled'}`, 'ai');
        });
    }
    
    if (hasDatabase) {
        hasDatabase.addEventListener('change', (e) => {
            state.projectConfig.hasDatabase = e.target.checked;
            addChatMessage(`Database ${e.target.checked ? 'enabled' : 'disabled'}`, 'ai');
        });
    }
    
    if (hasAuth) {
        hasAuth.addEventListener('change', (e) => {
            state.projectConfig.hasAuth = e.target.checked;
            addChatMessage(`Authentication ${e.target.checked ? 'enabled' : 'disabled'}`, 'ai');
        });
    }
    
    // Welcome message - Initialize chat
    setTimeout(() => {
        // Chat initialization is now handled by ai-assistant.js
        if (typeof initializeChat === 'function') {
            initializeChat();
        }
        addChatMessage('Welcome to BuildLab! 👋\n\nI\'m your AI assistant. Here\'s how to get started:\n\n1️⃣ Configure your project (name, backend, database)\n2️⃣ Drag components from above to the canvas\n3️⃣ Tell me what you want to build\n4️⃣ Click "Generate Code" when ready\n5️⃣ Preview and export your app\n\nTry saying: "Create a login form with email and password"\n\nWhat would you like to build today?', 'ai');
    }, 500);
}

// Note: Chat, AI, and Code Generation functions are now in ai-assistant.js
// This includes: sendMessage, addChatMessage, generateCode, testAPIKey, etc.

// Ripple Effect for Buttons
function addRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple 0.6s;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    
    const rect = element.getBoundingClientRect();
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            opacity: 1;
            transform: scale(0);
        }
        to {
            opacity: 0;
            transform: scale(4);
        }
    }
`;
document.head.appendChild(rippleStyle);

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Code preview animation
function animateCodePreview() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            line.style.transition = 'all 0.4s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, 100 * index);
    });
}

// Initialize code animation after delay
setTimeout(animateCodePreview, 1500);

// Export functions for global access
window.startBuilding = startBuilding;
window.closeBuilder = closeBuilder;
window.closeLoginModal = closeLoginModal;
window.handleQuickLogin = handleQuickLogin;
window.showDemo = showDemo;
window.deleteComponent = deleteComponent;
// Note: AI functions (generateCode, previewApp, exportCode, deployApp, testAPIKey) 
// are now exported from ai-assistant.js

console.log('BuildLab Platform Initialized ✨');

// Update navigation based on login status
function updateNavigation() {
    const user = localStorage.getItem('buildlab_user');
    const signInBtn = document.querySelector('.btn-secondary');
    
    if (user) {
        try {
            const userData = JSON.parse(user);
            if (userData.loggedIn && signInBtn) {
                // Replace Sign In with user info and logout
                signInBtn.textContent = `Hi, ${userData.name.split('@')[0]}`;
                signInBtn.onclick = () => {
                    if (confirm('Do you want to logout?')) {
                        logout();
                    }
                };
                signInBtn.style.cursor = 'pointer';
            }
        } catch (error) {
            console.error('Error updating navigation:', error);
        }
    }
}

// Logout function
function logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('buildlab_user');
    
    // Close any open modals
    const builderModal = document.getElementById('builderModal');
    const loginModal = document.getElementById('loginModal');
    
    if (builderModal) {
        builderModal.classList.remove('active');
        builderModal.style.display = 'none';
    }
    
    if (loginModal) {
        loginModal.classList.remove('active');
        loginModal.style.display = 'none';
    }
    
    document.body.style.overflow = '';
    
    // Refresh the page to reset state
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 300);
    
    console.log('✅ Logged out successfully');
}

// Export logout function
window.logout = logout;

// Check login state and auto-open builder
function checkLoginAndAutoOpen() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash;
    const user = localStorage.getItem('buildlab_user');
    
    console.log('🔍 Checking login state...');
    console.log('URL params:', window.location.search);
    console.log('Hash:', hash);
    console.log('Builder param:', urlParams.get('builder'));
    console.log('User data:', user);
    
    // Check if hash is #builder or URL param is builder=open
    if ((hash === '#builder' || urlParams.get('builder') === 'open') && user) {
        try {
            const userData = JSON.parse(user);
            console.log('✅ Parsed user data:', userData);
            
            if (userData.loggedIn) {
                console.log('🚀 Auto-opening builder...');
                // Auto open builder after login
                setTimeout(() => {
                    openBuilder();
                }, 800);
            }
        } catch (error) {
            console.error('❌ Error parsing user data:', error);
        }
    } else {
        console.log('ℹ️ No auto-open conditions met');
    }
}

// Initialize Target Cursor
function initializeTargetCursor() {
    // Check if GSAP and TargetCursor are available
    if (typeof gsap === 'undefined' || typeof TargetCursor === 'undefined') {
        console.warn('GSAP or TargetCursor not loaded, retrying...');
        setTimeout(initializeTargetCursor, 100);
        return;
    }

    try {
        const container = document.getElementById('targetCursorContainer');
        if (container) {
            state.targetCursor = new TargetCursor(container, {
                targetSelector: '.cursor-target',
                spinDuration: 2,
                hideDefaultCursor: true,
                hoverDuration: 0.2,
                parallaxOn: true
            });
            console.log('✨ TargetCursor initialized');
        } else {
            console.warn('Target cursor container not found');
        }
    } catch (error) {
        console.error('Failed to initialize TargetCursor:', error);
    }
}
