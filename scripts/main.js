// Main JavaScript for BuildLab Platform

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


// Template responses for fallback mode
const templateResponses = {
    'login': 'I can help you create a login form! Here\'s what you need:\n\n```html\n<form>\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Password">\n  <button>Login</button>\n</form>\n```\n\nDrag Container, Text, and Button components to build this!',
    'form': 'Forms are great! Try dragging:\n1. Container (for structure)\n2. Text components (for labels)\n3. Button (for submit)\n\nThen click Generate Code!',
    'button': 'Buttons are easy! Just drag a Button component from the sidebar. You can customize it in the properties panel.',
    'default': 'I can help you with:\n• Creating forms and layouts\n• Adding buttons and text\n• Generating HTML/CSS/JavaScript\n• Backend API design\n• Database schemas\n\nWhat would you like to build?'
};

// State Management
const state = {
    currentView: 'design',
    selectedComponent: null,
    canvas: {
        components: [],
        zoom: 1
    },
    chat: {
        messages: []
    },
    ghostCursor: null,
    generatedCode: {
        html: '',
        css: '',
        javascript: '',
        backend: '',
        database: ''
    },
    projectConfig: {
        name: 'My App',
        framework: 'html',
        hasBackend: false,
        hasDatabase: false,
        hasAuth: false
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeGhostCursor();
    initializeAnimations();
    initializeScrollEffects();
    initializeBuilderInteractions();
    initializeChat();
    addMouseTrackingEffects();
    checkLoginAndAutoOpen();
});

// Initialize Ghost Cursor
function initializeGhostCursor() {
    // Wait for Three.js to load
    if (typeof THREE === 'undefined' || typeof GhostCursor === 'undefined') {
        console.warn('Three.js or GhostCursor not loaded, retrying...');
        setTimeout(initializeGhostCursor, 100);
        return;
    }

    try {
        const container = document.getElementById('ghostCursorContainer');
        if (container) {
            state.ghostCursor = new GhostCursor(container, {
                color: '#B19EEF',
                brightness: 1.2,
                edgeIntensity: 0,
                trailLength: 50,
                inertia: 0.5,
                grainIntensity: 0.05,
                bloomStrength: 0.15,
                bloomRadius: 1.0,
                bloomThreshold: 0.025,
                fadeDelayMs: 1000,
                fadeDurationMs: 1500,
                mixBlendMode: 'screen'
            });
            console.log('GhostCursor initialized ✨');
        }
    } catch (error) {
        console.error('Failed to initialize GhostCursor:', error);
    }
}

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
    console.log('startBuilding function called!');
    const modal = document.getElementById('builderModal');
    
    if (!modal) {
        console.error('Modal element not found!');
        alert('Builder modal not found. Please refresh the page.');
        return;
    }
    
    console.log('Modal found, activating...');
    modal.classList.add('active');
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.animation = 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    // Initialize canvas
    initializeCanvas();
    console.log('Builder modal activated successfully!');
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
    
    // Welcome message
    setTimeout(() => {
        addChatMessage('Welcome to BuildLab! 👋\n\nI\'m your AI assistant. Here\'s how to get started:\n\n1️⃣ Configure your project (name, backend, database)\n2️⃣ Drag components from above to the canvas\n3️⃣ Tell me what you want to build\n4️⃣ Click "Generate Code" when ready\n5️⃣ Preview and export your app\n\nTry saying: "Create a login form with email and password"\n\nWhat would you like to build today?', 'ai');
    }, 500);
}

// Chat Functionality
function initializeChat() {
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    if (chatInput && sendBtn) {
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
}

async function sendMessage() {
    const input = document.querySelector('.chat-input input');
    const message = input.value.trim();
    
    if (message) {
        // Add user message
        addChatMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        const typingIndicator = addChatMessage('Thinking...', 'ai', true);
        
        try {
            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `You are an AI assistant for BuildLab, a no-code platform. Help users:
1. Design web applications visually
2. Generate HTML, CSS, JavaScript code
3. Create backend APIs with Node.js/Express
4. Design database schemas (MongoDB/PostgreSQL)
5. Implement authentication systems
6. Suggest UI/UX improvements
Be concise, helpful, and provide code examples when requested. Current project context: ${JSON.stringify(state.projectConfig)}`
                        },
                        ...state.chat.messages.slice(-5).map(msg => ({
                            role: msg.sender === 'user' ? 'user' : 'assistant',
                            content: msg.text
                        })),
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            // Remove typing indicator
            typingIndicator.remove();
            
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API Error Details:', errorData);
                throw new Error(`API Error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
            }
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            // Add AI response
            addChatMessage(aiResponse, 'ai');
            
            // Check if AI suggested code generation
            if (aiResponse.toLowerCase().includes('code') || aiResponse.toLowerCase().includes('generate')) {
                setTimeout(() => {
                    addChatMessage('Would you like me to generate the code for this? Type "generate code" or click the 📝 Generate Code button.', 'ai');
                }, 500);
            }
            
        } catch (error) {
            typingIndicator.remove();
            console.error('AI Chat Error:', error);
            
            // More helpful error messages
            let errorMessage = 'Sorry, I encountered an error. ';
            
            if (error.message.includes('401')) {
                errorMessage += 'The API key appears to be invalid. Please check your OpenAI API key.';
            } else if (error.message.includes('429')) {
                errorMessage += 'Rate limit exceeded. Please wait a moment and try again.';
            } else if (error.message.includes('Failed to fetch')) {
                errorMessage += 'Network error. Please check your internet connection.';
            } else if (error.message.includes('quota')) {
                errorMessage += 'API quota exceeded. Please check your OpenAI account.';
            } else {
                errorMessage += `Error: ${error.message}`;
            }
            
            addChatMessage(errorMessage, 'ai');
            
            // Offer fallback
            setTimeout(() => {
                addChatMessage('Meanwhile, I can still help! Try:\n• Drag components to the canvas\n• Click "Generate Code" to see what you\'ve built\n• Ask me for code examples (I\'ll provide templates)', 'ai');
                
                // Try fallback response
                const fallbackResponse = getFallbackResponse(message);
                if (fallbackResponse) {
                    setTimeout(() => {
                        addChatMessage(fallbackResponse, 'ai');
                    }, 1000);
                }
            }, 500);
        }
    }
}

function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
        return templateResponses.login;
    } else if (lowerMessage.includes('form')) {
        return templateResponses.form;
    } else if (lowerMessage.includes('button')) {
        return templateResponses.button;
    } else if (lowerMessage.includes('help')) {
        return templateResponses.default;
    }
    
    return null;
}

function addChatMessage(text, sender, isTyping = false) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    
    if (isTyping) {
        messageDiv.classList.add('typing');
    }
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'ai' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Check if text contains code blocks
    if (text.includes('```')) {
        content.innerHTML = formatCodeBlocks(text);
    } else {
        content.textContent = text;
    }
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    
    // Smooth scroll to bottom
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
    
    // Add state (only if not typing indicator)
    if (!isTyping) {
        state.chat.messages.push({ text, sender, timestamp: Date.now() });
    }
    
    return messageDiv;
}

function formatCodeBlocks(text) {
    return text.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

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
window.showDemo = showDemo;
window.deleteComponent = deleteComponent;
window.generateCode = generateCode;
window.previewApp = previewApp;
window.exportCode = exportCode;
window.deployApp = deployApp;
window.testAPIKey = testAPIKey;

// Test API Key function
async function testAPIKey() {
    addChatMessage('Testing API connection...', 'ai', true);
    
    try {
        const response = await fetch('https://api.openai.com/v1/models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            }
        });
        
        document.querySelectorAll('.chat-message.typing').forEach(el => el.remove());
        
        if (response.ok) {
            addChatMessage('✅ API Key is valid! Connection successful.', 'ai');
        } else {
            const errorData = await response.json().catch(() => ({}));
            addChatMessage(`❌ API Key test failed: ${response.status}\n${errorData.error?.message || 'Please check your API key.'}`, 'ai');
        }
    } catch (error) {
        document.querySelectorAll('.chat-message.typing').forEach(el => el.remove());
        addChatMessage(`❌ Connection failed: ${error.message}\n\nPlease check:\n1. Your internet connection\n2. API key validity\n3. OpenAI service status`, 'ai');
    }
}

// Code Generation Functions
async function generateCode() {
    const components = state.canvas.components;
    
    if (components.length === 0) {
        alert('Please add components to the canvas first!');
        return;
    }
    
    const canvasArea = document.getElementById('canvasArea');
    const canvasHTML = canvasArea.innerHTML;
    
    // Show loading
    const loadingMsg = addChatMessage('Generating production-ready code...', 'ai', true);
    
    try {
        const prompt = `Generate production-ready code for a web application based on these components:
${JSON.stringify(components, null, 2)}

Canvas HTML structure:
${canvasHTML}

Project config:
${JSON.stringify(state.projectConfig, null, 2)}

Please provide:
1. Clean HTML structure
2. Professional CSS styling
3. JavaScript functionality
4. ${state.projectConfig.hasBackend ? 'Node.js/Express backend API code' : ''}
5. ${state.projectConfig.hasDatabase ? 'Database schema (MongoDB)' : ''}
6. ${state.projectConfig.hasAuth ? 'JWT authentication implementation' : ''}

Format each section with proper code blocks.`;

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert full-stack developer. Generate clean, production-ready code with best practices.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature: 0.3,
                max_tokens: 2000
            })
        });
        
        loadingMsg.remove();
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        const generatedCode = data.choices[0].message.content;
        state.generatedCode.full = generatedCode;
        
        // Add to chat
        addChatMessage(generatedCode, 'ai');
        addChatMessage('Code generated successfully! You can now preview, edit, or export it.', 'ai');
         // Show code view button
        showCodeViewButton();
        
    } catch (error) {
        loadingMsg.remove();
        console.error('Code Generation Error:', error);
        addChatMessage('Error generating code. Please try again.', 'ai');
    }
}

function showCodeViewButton() {
    const toolbarGroup = document.querySelector('.canvas-toolbar .toolbar-group');
    const codeViewBtn = document.createElement('button');
    codeViewBtn.className = 'toolbar-btn btn-success';
    codeViewBtn.textContent = '📝 View Code';
    codeViewBtn.onclick = showCodeModal;
    toolbarGroup.appendChild(codeViewBtn);
}

function showCodeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 900px; max-height: 90vh; overflow: auto;">
            <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
            <div style="padding: 2rem;">
                <h2 style="margin-bottom: 1.5rem;">Generated Code</h2>
                <div class="code-tabs" style="display: flex; gap: 1rem; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border-color);">
                    <button class="code-tab active" data-tab="full">Full Code</button>
                    <button class="code-tab" data-tab="html">HTML</button>
                    <button class="code-tab" data-tab="css">CSS</button>
                    <button class="code-tab" data-tab="js">JavaScript</button>
                </div>
                <div class="code-content">
                    <pre style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-lg); overflow: auto; max-height: 500px;"><code>${escapeHtml(state.generatedCode.full || 'No code generated yet')}</code></pre>
                </div>
                <div style="display: flex; gap: 1rem; margin-top: 1.5rem;">
                    <button class="btn-primary" onclick="copyCode()">📋 Copy Code</button>
                    <button class="btn-primary" onclick="downloadCode()">💾 Download</button>
                    <button class="btn-primary" onclick="previewApp()">👁️ Preview</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function copyCode() {
    const code = state.generatedCode.full;
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    });
}

function downloadCode() {
    const code = state.generatedCode.full;
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.projectConfig.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function previewApp() {
    const previewWindow = window.open('', '_blank');
    previewWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Preview - ${state.projectConfig.name}</title>
            <style>
                body { margin: 0; padding: 20px; font-family: system-ui; }
                pre { background: #f5f5f5; padding: 15px; border-radius: 8px; overflow: auto; }
            </style>
        </head>
        <body>
            <h1>App Preview</h1>
            <p>Generated code preview:</p>
            <pre>${escapeHtml(state.generatedCode.full)}</pre>
        </body>
        </html>
    `);
}

function exportCode() {
    if (!state.generatedCode.full) {
        alert('Please generate code first!');
        return;
    }
    
    // Create ZIP file structure simulation
    const files = {
        'index.html': extractCodeSection(state.generatedCode.full, 'html'),
        'styles.css': extractCodeSection(state.generatedCode.full, 'css'),
        'script.js': extractCodeSection(state.generatedCode.full, 'javascript')
    };
    
    if (state.projectConfig.hasBackend) {
        files['server.js'] = extractCodeSection(state.generatedCode.full, 'backend');
    }
    
    if (state.projectConfig.hasDatabase) {
        files['models.js'] = extractCodeSection(state.generatedCode.full, 'database');
    }
    downloadCode();
}

function extractCodeSection(fullCode, section) {
    const regex = new RegExp(`\`\`\`${section}\\n([\\s\\S]*?)\`\`\``, 'i');
    const match = fullCode.match(regex);
    return match ? match[1] : '';
}

async function deployApp() {
    alert('Deployment feature:\n\n1. Code will be pushed to GitHub\n2. Deployed to Vercel/Netlify\n3. Backend deployed to Railway/Render\n4. Database hosted on MongoDB Atlas\n\nThis feature requires backend integration.');
}

console.log('BuildLab Platform Initialized ✨');

// Check login state and auto-open builder
function checkLoginAndAutoOpen() {
    const urlParams = new URLSearchParams(window.location.search);
    const user = localStorage.getItem('buildlab_user');
    
    console.log('🔍 Checking login state...');
    console.log('URL params:', window.location.search);
    console.log('Builder param:', urlParams.get('builder'));
    console.log('User data:', user);
    
    if (urlParams.get('builder') === 'open' && user) {
        try {
            const userData = JSON.parse(user);
            console.log('✅ Parsed user data:', userData);
            
            if (userData.loggedIn) {
                console.log('🚀 Auto-opening builder...');
                // Auto open builder after login
                setTimeout(() => {
                    const modal = document.getElementById('builderModal');
                    if (modal) {
                        modal.style.display = 'flex';
                        console.log('✅ Builder modal opened');
                        addChatMessage(`Welcome back, ${userData.name}! 👋 Ready to build something amazing?`, 'ai');
                    } else {
                        console.error('❌ Builder modal not found');
                    }
                }, 800);
            }
        } catch (error) {
            console.error('❌ Error parsing user data:', error);
        }
    } else {
        console.log('ℹ️ No auto-open conditions met');
    }
}
