/**
 * AI Assistant Module for BuildLab Platform
 * Handles all AI chat functionality, code generation, and OpenAI API integration
 */

const OPENAI_API_KEY = ''; // Add your OpenAI API key here if you want AI features

// Template responses for fallback mode when API is not available
const templateResponses = {
    'login': 'I can help you create a login form! Here\'s what you need:\n\n```html\n<form>\n  <input type="email" placeholder="Email">\n  <input type="password" placeholder="Password">\n  <button>Login</button>\n</form>\n```\n\nDrag Container, Text, and Button components to build this!',
    'form': 'Forms are great! Try dragging:\n1. Container (for structure)\n2. Text components (for labels)\n3. Button (for submit)\n\nThen click Generate Code!',
    'button': 'Buttons are easy! Just drag a Button component from the sidebar. You can customize it in the properties panel.',
    'card': 'Cards are perfect for displaying content! Here\'s a quick template:\n\n```html\n<div class="card">\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n  <button>Action</button>\n</div>\n```',
    'navbar': 'Let me help you create a navigation bar:\n\n```html\n<nav>\n  <div class="logo">Logo</div>\n  <ul>\n    <li><a href="#">Home</a></li>\n    <li><a href="#">About</a></li>\n    <li><a href="#">Contact</a></li>\n  </ul>\n</nav>\n```',
    'default': 'I can help you with:\n• Creating forms and layouts\n• Adding buttons and text\n• Generating HTML/CSS/JavaScript\n• Backend API design\n• Database schemas\n\nWhat would you like to build?'
};

/**
 * Initialize Chat Functionality
 */
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

/**
 * Send Message to AI Assistant
 */
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
Be concise, helpful, and provide code examples when requested. Current project context: ${JSON.stringify(window.state?.projectConfig || {})}`
                        },
                        ...window.state.chat.messages.slice(-5).map(msg => ({
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

/**
 * Get Fallback Response for Common Queries
 */
function getFallbackResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('login') || lowerMessage.includes('sign in')) {
        return templateResponses.login;
    } else if (lowerMessage.includes('form')) {
        return templateResponses.form;
    } else if (lowerMessage.includes('button')) {
        return templateResponses.button;
    } else if (lowerMessage.includes('card')) {
        return templateResponses.card;
    } else if (lowerMessage.includes('navbar') || lowerMessage.includes('navigation')) {
        return templateResponses.navbar;
    } else if (lowerMessage.includes('help')) {
        return templateResponses.default;
    }
    
    return null;
}

/**
 * Add Chat Message to UI
 */
function addChatMessage(text, sender, isTyping = false) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return null;
    
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
    
    // Add to state (only if not typing indicator)
    if (!isTyping && window.state) {
        window.state.chat.messages.push({ text, sender, timestamp: Date.now() });
    }
    
    return messageDiv;
}

/**
 * Format Code Blocks in Messages
 */
function formatCodeBlocks(text) {
    return text.replace(/```(\w+)?\n([\s\S]+?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });
}

/**
 * Escape HTML for Safe Display
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Test OpenAI API Key Connection
 */
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

/**
 * Generate Production-Ready Code
 */
async function generateCode() {
    const components = window.state?.canvas.components || [];
    
    if (components.length === 0) {
        alert('Please add components to the canvas first!');
        return;
    }
    
    const canvasArea = document.getElementById('canvasArea');
    const canvasHTML = canvasArea ? canvasArea.innerHTML : '';
    
    // Show loading
    const loadingMsg = addChatMessage('Generating production-ready code...', 'ai', true);
    
    try {
        const prompt = `Generate production-ready code for a web application based on these components:
${JSON.stringify(components, null, 2)}

Canvas HTML structure:
${canvasHTML}

Project config:
${JSON.stringify(window.state?.projectConfig || {}, null, 2)}

Please provide:
1. Clean HTML structure
2. Professional CSS styling
3. JavaScript functionality
4. ${window.state?.projectConfig?.hasBackend ? 'Node.js/Express backend API code' : ''}
5. ${window.state?.projectConfig?.hasDatabase ? 'Database schema (MongoDB)' : ''}
6. ${window.state?.projectConfig?.hasAuth ? 'JWT authentication implementation' : ''}

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
        
        if (window.state) {
            window.state.generatedCode.full = generatedCode;
        }
        
        // Add to chat
        addChatMessage(generatedCode, 'ai');
        addChatMessage('Code generated successfully! You can now preview, edit, or export it.', 'ai');
        
        // Show code view button
        showCodeViewButton();
        
    } catch (error) {
        loadingMsg.remove();
        console.error('Code Generation Error:', error);
        addChatMessage('Error generating code. Please try again or check your API key.', 'ai');
        
        // Provide fallback template
        setTimeout(() => {
            const fallbackCode = generateFallbackCode(components);
            addChatMessage('Here\'s a basic template to get you started:\n\n' + fallbackCode, 'ai');
        }, 500);
    }
}

/**
 * Generate Fallback Code Template
 */
function generateFallbackCode(components) {
    return `\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${window.state?.projectConfig?.name || 'My App'}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: system-ui, -apple-system, sans-serif; }
        .container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Welcome to ${window.state?.projectConfig?.name || 'My App'}</h1>
        <!-- Your components will be added here -->
        ${components.map(c => `<div class="component">${c.type}</div>`).join('\n        ')}
    </div>
</body>
</html>
\`\`\``;
}

/**
 * Show Code View Button
 */
function showCodeViewButton() {
    const toolbarGroup = document.querySelector('.canvas-toolbar .toolbar-group');
    if (!toolbarGroup) return;
    
    // Check if button already exists
    if (document.querySelector('.btn-code-view')) return;
    
    const codeViewBtn = document.createElement('button');
    codeViewBtn.className = 'toolbar-btn btn-success btn-code-view';
    codeViewBtn.textContent = '📝 View Code';
    codeViewBtn.onclick = showCodeModal;
    toolbarGroup.appendChild(codeViewBtn);
}

/**
 * Show Code Modal with Generated Code
 */
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
                    <pre style="background: var(--bg-tertiary); padding: 1.5rem; border-radius: var(--radius-lg); overflow: auto; max-height: 500px;"><code>${escapeHtml(window.state?.generatedCode?.full || 'No code generated yet')}</code></pre>
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

/**
 * Copy Generated Code to Clipboard
 */
function copyCode() {
    const code = window.state?.generatedCode?.full || '';
    navigator.clipboard.writeText(code).then(() => {
        alert('Code copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy code. Please try again.');
    });
}

/**
 * Download Generated Code
 */
function downloadCode() {
    const code = window.state?.generatedCode?.full || '';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(window.state?.projectConfig?.name || 'my-app').replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

/**
 * Preview Generated App
 */
function previewApp() {
    const code = window.state?.generatedCode?.full || '';
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Preview - ${window.state?.projectConfig?.name || 'My App'}</title>
                <style>
                    body { margin: 0; padding: 20px; font-family: system-ui; }
                    pre { background: #f5f5f5; padding: 15px; border-radius: 8px; overflow: auto; }
                </style>
            </head>
            <body>
                <h1>App Preview</h1>
                <p>Generated code preview:</p>
                <pre>${escapeHtml(code)}</pre>
            </body>
            </html>
        `);
    }
}

/**
 * Export Code as ZIP
 */
function exportCode() {
    if (!window.state?.generatedCode?.full) {
        alert('Please generate code first!');
        return;
    }
    
    // Create ZIP file structure simulation
    const files = {
        'index.html': extractCodeSection(window.state.generatedCode.full, 'html'),
        'styles.css': extractCodeSection(window.state.generatedCode.full, 'css'),
        'script.js': extractCodeSection(window.state.generatedCode.full, 'javascript')
    };
    
    if (window.state.projectConfig?.hasBackend) {
        files['server.js'] = extractCodeSection(window.state.generatedCode.full, 'backend');
    }
    
    if (window.state.projectConfig?.hasDatabase) {
        files['models.js'] = extractCodeSection(window.state.generatedCode.full, 'database');
    }
    
    downloadCode();
}

/**
 * Extract Code Section from Generated Code
 */
function extractCodeSection(fullCode, section) {
    const regex = new RegExp(`\`\`\`${section}\\n([\\s\\S]*?)\`\`\``, 'i');
    const match = fullCode.match(regex);
    return match ? match[1] : '';
}

/**
 * Deploy App (Placeholder)
 */
async function deployApp() {
    alert('Deployment feature:\n\n1. Code will be pushed to GitHub\n2. Deployed to Vercel/Netlify\n3. Backend deployed to Railway/Render\n4. Database hosted on MongoDB Atlas\n\nThis feature requires backend integration.');
}

// Export functions to global scope
if (typeof window !== 'undefined') {
    window.AIAssistant = {
        initializeChat,
        sendMessage,
        addChatMessage,
        testAPIKey,
        generateCode,
        copyCode,
        downloadCode,
        previewApp,
        exportCode,
        deployApp,
        getFallbackResponse
    };
    
    // Also export individual functions for backward compatibility
    window.initializeChat = initializeChat;
    window.sendMessage = sendMessage;
    window.addChatMessage = addChatMessage;
    window.testAPIKey = testAPIKey;
    window.generateCode = generateCode;
    window.copyCode = copyCode;
    window.downloadCode = downloadCode;
    window.previewApp = previewApp;
    window.exportCode = exportCode;
    window.deployApp = deployApp;
}

console.log('✅ AI Assistant Module Loaded');
