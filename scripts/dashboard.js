// Dashboard JavaScript for BuildLab

// Global state
const dashboardState = {
    sidebarCollapsed: false,
    currentPage: 'dashboard',
    aiDrawerOpen: false,
    notificationsOpen: false,
    profileMenuOpen: false,
    currentTheme: 'dark',
    user: null,
    projects: [],
    notifications: [],
    aiMessages: []
};

// Initialize dashboard on load
document.addEventListener('DOMContentLoaded', () => {
    initializeDashboard();
    loadUserData();
    setupEventListeners();
    initializeWidgets();
    startAnimations();
});

// Initialize dashboard
function initializeDashboard() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('buildlab_user') || 'null');
    
    if (!user) {
        // Redirect to login if not authenticated
        window.location.href = 'index.html';
        return;
    }
    
    dashboardState.user = user;
    
    // Load or initialize notifications from localStorage
    loadStoredNotifications();
    
    // Add login notification if this is a fresh login
    const lastLoginTime = localStorage.getItem('buildlab_last_login');
    const currentTime = Date.now();
    if (!lastLoginTime || (currentTime - parseInt(lastLoginTime)) > 60000) { // More than 1 minute ago
        addNotification('Welcome back!', `You logged in as ${user.name || user.email}`, 'success');
        localStorage.setItem('buildlab_last_login', currentTime.toString());
    }
    
    // Update user info in UI
    updateUserInfo();
    
    // Load initial data
    loadProjects();
    // Load settings (must happen before rendering notifications/widgets so we can hide/show parts)
    loadSettings();
    applySettings();
    loadNotifications();
    loadAIActivity();
    loadDeployments();
    loadAnalytics();
    loadTeamActivity();
    
    // Start activity tracking
    startActivityTracking();
}

// Load user data
function loadUserData() {
    const user = dashboardState.user;
    
    // Update profile display
    const profileName = document.querySelector('.profile-name');
    const profilePlan = document.querySelector('.profile-plan');
    const profileAvatar = document.querySelector('.profile-avatar');
    
    if (profileName) profileName.textContent = user.name || 'User';
    if (profilePlan) profilePlan.textContent = user.plan || 'Free Plan';
    if (profileAvatar) profileAvatar.src = user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (user.name || 'user');
    
    // Update hero greeting
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const greeting = getGreeting();
        heroTitle.innerHTML = `${greeting}, <span class="highlight typewriter">${user.name || 'there'}!</span>`;
    }
}

// Get time-based greeting
function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
}

// Update user info display
function updateUserInfo() {
    const user = dashboardState.user;
    
    // Update profile page
    const profileHeaderName = document.querySelector('.profile-header-name');
    const profileHeaderEmail = document.querySelector('.profile-header-email');
    const profileAvatarLarge = document.querySelector('.profile-avatar-large img');
    
    if (profileHeaderName) profileHeaderName.textContent = user.name || 'User';
    if (profileHeaderEmail) profileHeaderEmail.textContent = user.email || 'user@example.com';
    if (profileAvatarLarge) profileAvatarLarge.src = user.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + (user.name || 'user');
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    // Navigation items
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const page = item.dataset.page;

            // Special behaviors for certain pages
            if (page === 'ai-studio') {
                // Open the AI drawer/chat
                toggleAIDrawer();
                return;
            }

            if (page === 'deployments') {
                // Open external deployment provider (Vercel)
                window.open('https://vercel.com/', '_blank');
                return;
            }

            if (page === 'templates') {
                // Open Figma templates
                window.open('https://www.figma.com/community/website-templates/blog?resource_type=mixed&editor_type=all&price=all&sort_by=all_time&creators=all', '_blank');
                return;
            }

            navigateToPage(page);
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // AI chat toggle
    const aiChatBtn = document.getElementById('aiChatBtn');
    if (aiChatBtn) {
        aiChatBtn.addEventListener('click', toggleAIDrawer);
    }
    
    // Notifications toggle
    const notificationsBtn = document.getElementById('notificationsBtn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', toggleNotifications);
    }
    
    // Profile menu toggle
    const profileBtn = document.querySelector('.profile-btn');
    if (profileBtn) {
        profileBtn.addEventListener('click', toggleProfileMenu);
    }
    
    // Close drawers on outside click
    document.addEventListener('click', handleOutsideClick);
    
    // AI message send
    const aiSendBtn = document.querySelector('.send-btn');
    const aiInput = document.querySelector('.drawer-input input');
    
    if (aiSendBtn) {
        aiSendBtn.addEventListener('click', sendAIMessage);
    }
    
    if (aiInput) {
        aiInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Logout
    const logoutBtn = document.querySelector('.nav-item.logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Notifications: mark all as read button
    const markAllBtn = document.querySelector('#notificationsPanel .btn-link');
    if (markAllBtn) {
        markAllBtn.addEventListener('click', (e) => {
            e.preventDefault();
            markAllRead();
        });
    }

    // Settings controls (bindings)
    const sProjects = document.getElementById('setting_show_projects');
    const sBackend = document.getElementById('setting_show_backend');
    const btnEnableAll = document.getElementById('btnEnableAll');
    const btnOpenAIStudio = document.getElementById('btnOpenAIStudio');
    const btnOpenDeployments = document.getElementById('btnOpenDeployments');
    const btnOpenTemplates = document.getElementById('btnOpenTemplates');

    if (sProjects) sProjects.addEventListener('change', () => { saveSettings(); applySettings(); });
    if (sBackend) sBackend.addEventListener('change', () => { saveSettings(); applySettings(); });
    if (btnEnableAll) btnEnableAll.addEventListener('click', (e) => { e.preventDefault(); enableAllSettings(); });
    if (btnOpenAIStudio) btnOpenAIStudio.addEventListener('click', (e) => { e.preventDefault(); toggleAIDrawer(); });
    if (btnOpenDeployments) btnOpenDeployments.addEventListener('click', (e) => { e.preventDefault(); window.open('https://vercel.com/', '_blank'); });
    if (btnOpenTemplates) btnOpenTemplates.addEventListener('click', (e) => { e.preventDefault(); window.open('https://www.figma.com/community/website-templates/blog?resource_type=mixed&editor_type=all&price=all&sort_by=all_time&creators=all', '_blank'); });
}

// Toggle sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
        dashboardState.sidebarCollapsed = !dashboardState.sidebarCollapsed;
    }
}

// Navigate to page
function navigateToPage(page) {
    dashboardState.currentPage = page;
    
    // Update active nav item
    const navItems = document.querySelectorAll('.nav-item[data-page]');
    navItems.forEach(item => {
        if (item.dataset.page === page) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // Show/hide page content
    const pageContents = document.querySelectorAll('.page-content');
    pageContents.forEach(content => {
        if (content.id === `${page}-page`) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

// Toggle theme
function toggleTheme() {
    const themes = ['dark', 'light', 'glass'];
    const currentIndex = themes.indexOf(dashboardState.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    dashboardState.currentTheme = themes[nextIndex];
    
    // Apply theme (would need CSS variables)
    document.body.setAttribute('data-theme', dashboardState.currentTheme);
    
    // Update icon
    const themeIcon = document.querySelector('#themeToggle i');
    if (themeIcon) {
        const icons = {
            'dark': 'moon',
            'light': 'sun',
            'glass': 'sparkles'
        };
        themeIcon.setAttribute('data-lucide', icons[dashboardState.currentTheme]);
        lucide.createIcons();
    }
}

// Toggle AI drawer
function toggleAIDrawer() {
    const aiDrawer = document.querySelector('.ai-drawer');
    if (aiDrawer) {
        aiDrawer.classList.toggle('active');
        dashboardState.aiDrawerOpen = !dashboardState.aiDrawerOpen;
    }
}

// Toggle notifications
function toggleNotifications() {
    const notificationsPanel = document.querySelector('.notifications-panel');
    if (notificationsPanel) {
        notificationsPanel.classList.toggle('active');
        dashboardState.notificationsOpen = !dashboardState.notificationsOpen;
    }
}

// Toggle profile menu
function toggleProfileMenu() {
    const profileMenu = document.querySelector('.dropdown-menu');
    if (profileMenu) {
        profileMenu.classList.toggle('active');
        dashboardState.profileMenuOpen = !dashboardState.profileMenuOpen;
    }
}

// Handle outside click
function handleOutsideClick(e) {
    // Close profile menu if clicked outside
    const profileBtn = document.querySelector('.profile-btn');
    const profileMenu = document.querySelector('.dropdown-menu');
    
    if (profileMenu && !profileBtn.contains(e.target) && !profileMenu.contains(e.target)) {
        profileMenu.classList.remove('active');
        dashboardState.profileMenuOpen = false;
    }
    
    // Close notifications if clicked outside
    const notificationsBtn = document.getElementById('notificationsBtn');
    const notificationsPanel = document.querySelector('.notifications-panel');
    
    if (notificationsPanel && !notificationsBtn.contains(e.target) && !notificationsPanel.contains(e.target)) {
        notificationsPanel.classList.remove('active');
        dashboardState.notificationsOpen = false;
    }
}

// Send AI message
function sendAIMessage() {
    const input = document.querySelector('.drawer-input input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Track AI usage
    const aiUsageCount = parseInt(sessionStorage.getItem('ai_usage_count') || '0') + 1;
    sessionStorage.setItem('ai_usage_count', aiUsageCount.toString());
    
    // Add notification on first use or every 5 messages
    if (aiUsageCount === 1) {
        addNotification('AI Assistant', 'You started using AI Assistant', 'success');
    } else if (aiUsageCount % 5 === 0) {
        addNotification('AI Usage', `You've used AI Assistant ${aiUsageCount} times this session`, 'info');
    }
    
    // Add user message
    addAIMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addAIMessage(response, 'ai');
    }, 1000);
}

// Add AI message to chat
function addAIMessage(text, sender) {
    const messagesContainer = document.querySelector('.ai-messages');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `ai-message ${sender}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'user' ? '👤' : '🤖';
    
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    
    if (sender === 'ai') {
        bubble.innerHTML = `<span class="typing-text">${text}</span>`;
    } else {
        bubble.textContent = text;
    }
    
    messageEl.appendChild(avatar);
    messageEl.appendChild(bubble);
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Store in state
    dashboardState.aiMessages.push({ text, sender, timestamp: Date.now() });
}

// Get AI response (simple responses for demo)
function getAIResponse(message) {
    const responses = {
        'hello': 'Hi there! How can I assist you with your BuildLab project today?',
        'help': 'I can help you with:\n• Creating new projects\n• Generating code\n• Debugging issues\n• Deployment guidance\n• API integration\n\nWhat would you like help with?',
        'create': 'Great! Let\'s create a new project. What type of app would you like to build? (e.g., web app, landing page, dashboard)',
        'deploy': 'To deploy your project, go to the Deployments page and click "New Deployment". I can guide you through the process!',
        'default': 'I understand you\'re asking about: "' + message + '". Let me help you with that. Could you provide more details?'
    };
    
    const lowerMessage = message.toLowerCase();
    
    for (const key in responses) {
        if (lowerMessage.includes(key)) {
            return responses[key];
        }
    }
    
    return responses.default;
}

// Handle search
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    console.log('Searching for:', query);
    
    // Implement search functionality here
    // Could search through projects, pages, etc.
}

// Handle logout
function handleLogout(e) {
    e.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('buildlab_user');
        window.location.href = 'index.html';
    }
}

// Initialize widgets
function initializeWidgets() {
    animateCounters();
    initializeCharts();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize charts
function initializeCharts() {
    const chartCanvas = document.getElementById('analyticsChart');
    if (!chartCanvas) return;
    
    const ctx = chartCanvas.getContext('2d');
    const width = chartCanvas.width = chartCanvas.offsetWidth;
    const height = chartCanvas.height = 200;
    
    // Sample data
    const data = [65, 78, 85, 81, 95, 120, 140];
    const max = Math.max(...data);
    
    // Draw simple line chart
    ctx.strokeStyle = '#7C3AED';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = (index / (data.length - 1)) * width;
        const y = height - (value / max) * height * 0.8;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add gradient fill
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(124, 58, 237, 0.3)');
    gradient.addColorStop(1, 'rgba(124, 58, 237, 0)');
    
    ctx.fillStyle = gradient;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
}

// Load projects
function loadProjects() {
    // Sample project data
    const projects = [
        {
            id: 1,
            name: 'E-Commerce Store',
            thumbnail: '🛒',
            updated: '2 hours ago',
            status: 'live',
            tags: ['React', 'Node.js']
        },
        {
            id: 2,
            name: 'Portfolio Website',
            thumbnail: '💼',
            updated: '5 days ago',
            status: 'draft',
            tags: ['HTML', 'CSS']
        },
        {
            id: 3,
            name: 'Task Manager',
            thumbnail: '✅',
            updated: '1 week ago',
            status: 'live',
            tags: ['Vue.js', 'Firebase']
        }
    ];
    
    dashboardState.projects = projects;
    
    // Render projects
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;
    
    projectGrid.innerHTML = projects.map(project => `
        <div class="project-card" onclick="openProject(${project.id})">
            <div class="project-thumbnail">${project.thumbnail}</div>
            <div class="project-info">
                <h4>${project.name}</h4>
                <div class="project-meta">
                    <i data-lucide="clock" style="width: 14px; height: 14px;"></i>
                    <span>Updated ${project.updated}</span>
                </div>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="project-status ${project.status}">
                    <span class="status-dot"></span>
                    ${project.status === 'live' ? 'Live' : 'Draft'}
                </div>
            </div>
        </div>
    `).join('');
    
    // Reinitialize Lucide icons
    lucide.createIcons();
}

// Load notifications
function loadNotifications() {
    // If notifications don't exist in state yet, initialize with sample data
    if (!dashboardState.notifications || !dashboardState.notifications.length) {
        dashboardState.notifications = [
            {
                id: 1,
                title: 'New deployment successful',
                message: 'Your E-Commerce Store is now live',
                time: '5 minutes ago',
                type: 'success',
                unread: true
            },
            {
                id: 2,
                title: 'Team invitation',
                message: 'John invited you to collaborate',
                time: '1 hour ago',
                type: 'info',
                unread: true
            },
            {
                id: 3,
                title: 'API limit warning',
                message: 'You\'ve used 80% of your monthly quota',
                time: '3 hours ago',
                type: 'warning',
                unread: false
            }
        ];
    }
    
    const notifications = dashboardState.notifications;
    
    // Update badge
    const badge = document.querySelector('#notificationsBtn .badge');
    const unreadCount = notifications.filter(n => n.unread).length;
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? '' : 'none';
    }
    
    // Render notifications
    const notificationsList = document.querySelector('.panel-content');
    if (!notificationsList) return;
    
    notificationsList.innerHTML = notifications.map(notif => `
        <div class="notification-item ${notif.unread ? 'unread' : ''}" onclick="markAsRead(${notif.id})">
            <div class="notification-header">
                <div class="notification-icon ${notif.type === 'success' ? 'purple' : notif.type === 'info' ? 'cyan' : 'gold'}">
                    <i data-lucide="${notif.type === 'success' ? 'check-circle' : notif.type === 'info' ? 'bell' : 'alert-triangle'}" style="width: 18px; height: 18px;"></i>
                </div>
                <div class="notification-content">
                    <h4>${notif.title}</h4>
                    <p>${notif.message}</p>
                </div>
            </div>
            <div class="notification-time">${notif.time}</div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Load AI activity
function loadAIActivity() {
    const activities = [
        {
            title: 'Generated React component',
            time: '10 minutes ago',
            type: 'purple'
        },
        {
            title: 'Fixed API integration bug',
            time: '1 hour ago',
            type: 'cyan'
        },
        {
            title: 'Optimized database queries',
            time: '3 hours ago',
            type: 'gold'
        }
    ];
    
    const activityFeed = document.querySelector('.activity-feed');
    if (!activityFeed) return;
    
    activityFeed.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i data-lucide="sparkles" style="width: 18px; height: 18px;"></i>
            </div>
            <div class="activity-info">
                <div class="activity-title">${activity.title}</div>
                <div class="activity-time">${activity.time}</div>
            </div>
        </div>
    `).join('');
    
    lucide.createIcons();
}

// Load deployments
function loadDeployments() {
    const deployments = [
        {
            name: 'E-Commerce Store',
            status: 'success',
            progress: 100
        },
        {
            name: 'Portfolio Website',
            status: 'pending',
            progress: 65
        },
        {
            name: 'Task Manager',
            status: 'success',
            progress: 100
        }
    ];
    
    const deploymentList = document.querySelector('.deployment-list');
    if (!deploymentList) return;
    
    deploymentList.innerHTML = deployments.map(deployment => `
        <div class="deployment-item">
            <div class="deployment-header">
                <span class="deployment-name">${deployment.name}</span>
                <span class="deployment-status ${deployment.status}">${deployment.status}</span>
            </div>
            <div class="deployment-progress">
                <div class="deployment-progress-bar" style="width: ${deployment.progress}%"></div>
            </div>
        </div>
    `).join('');
}

// Load analytics
function loadAnalytics() {
    // Analytics are rendered in HTML with static values
    // Could add dynamic data loading here
}

// Load team activity
function loadTeamActivity() {
    const activities = [
        {
            name: 'Sarah Chen',
            action: 'deployed Portfolio Website',
            time: '5m ago',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
        },
        {
            name: 'Mike Johnson',
            action: 'created new API endpoint',
            time: '15m ago',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike'
        },
        {
            name: 'Emma Davis',
            action: 'updated design system',
            time: '1h ago',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma'
        }
    ];
    
    const teamActivity = document.querySelector('.team-activity');
    if (!teamActivity) return;
    
    teamActivity.innerHTML = activities.map(activity => `
        <div class="team-item">
            <img src="${activity.avatar}" alt="${activity.name}" class="team-avatar">
            <div class="team-info">
                <div class="team-name">${activity.name}</div>
                <div class="team-action">${activity.action}</div>
            </div>
            <div class="team-time">${activity.time}</div>
        </div>
    `).join('');
}

// Start animations
function startAnimations() {
    // Staggered fade-in for widgets
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((widget, index) => {
        widget.style.animationDelay = `${index * 0.1}s`;
    });
}

// Quick action handlers
function newProject() {
    openBuilder();
}

function connectAPI() {
    alert('Opening API connection dialog...');
}

function deployApp() {
    addNotification('Deployment Started', 'Opening deployment wizard...', 'warning');
    trackActivity('deployment', 'Initiated deployment process');
    alert('Opening deployment wizard...');
}

function viewDocs() {
    window.open('https://docs.buildlab.com', '_blank');
}

// Project handler
function openProject(projectId) {
    const project = dashboardState.projects.find(p => p.id === projectId);
    const projectName = project ? project.name : 'Project';
    addNotification('Project Opened', `Opening ${projectName}...`, 'info');
    trackActivity('project_open', `Opened project: ${projectName}`);
    console.log('Opening project:', projectId);
    setTimeout(() => {
        window.location.href = 'index.html#builder?project=' + projectId;
    }, 300);
}

// --- Settings persistence and application ---
function loadSettings() {
    const defaults = {
        showProjects: true,
        showBackend: true
    };
    try {
        const raw = localStorage.getItem('dashboard_settings');
        if (!raw) {
            dashboardState.settings = defaults;
            localStorage.setItem('dashboard_settings', JSON.stringify(defaults));
            return dashboardState.settings;
        }
        dashboardState.settings = Object.assign({}, defaults, JSON.parse(raw));
        return dashboardState.settings;
    } catch (err) {
        console.error('Error loading settings:', err);
        dashboardState.settings = defaults;
        return dashboardState.settings;
    }
}

function saveSettings() {
    const sProjects = document.getElementById('setting_show_projects');
    const sBackend = document.getElementById('setting_show_backend');
    dashboardState.settings = dashboardState.settings || {};
    if (sProjects) dashboardState.settings.showProjects = !!sProjects.checked;
    if (sBackend) dashboardState.settings.showBackend = !!sBackend.checked;
    localStorage.setItem('dashboard_settings', JSON.stringify(dashboardState.settings));
}

function applySettings() {
    const settings = dashboardState.settings || loadSettings();
    // Show/hide My Projects widget
    const projectWidget = document.querySelector('.widget-large .widget-title h3') && document.querySelector('.widget-large');
    const projectsNav = document.querySelector('.nav-item[data-page="projects"]');
    if (projectsNav) projectsNav.style.display = settings.showProjects ? '' : 'none';
    if (projectWidget) projectWidget.style.display = settings.showProjects ? '' : 'none';

    // Show/hide backend nav
    const backendNav = document.querySelector('.nav-item[data-page="backend"]');
    if (backendNav) backendNav.style.display = settings.showBackend ? '' : 'none';

    // Update settings controls state
    const sProjects = document.getElementById('setting_show_projects');
    const sBackend = document.getElementById('setting_show_backend');
    if (sProjects) sProjects.checked = !!settings.showProjects;
    if (sBackend) sBackend.checked = !!settings.showBackend;
}

function enableAllSettings() {
    dashboardState.settings = dashboardState.settings || {};
    dashboardState.settings.showProjects = true;
    dashboardState.settings.showBackend = true;
    localStorage.setItem('dashboard_settings', JSON.stringify(dashboardState.settings));
    applySettings();
}

// --- Dynamic notifications helpers ---
function loadStoredNotifications() {
    try {
        const stored = localStorage.getItem('buildlab_notifications');
        if (stored) {
            dashboardState.notifications = JSON.parse(stored);
        } else {
            dashboardState.notifications = [];
        }
    } catch (err) {
        console.error('Error loading notifications:', err);
        dashboardState.notifications = [];
    }
}

function saveNotifications() {
    try {
        localStorage.setItem('buildlab_notifications', JSON.stringify(dashboardState.notifications));
    } catch (err) {
        console.error('Error saving notifications:', err);
    }
}

function addNotification(title, message, type = 'info') {
    const id = Date.now();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const notif = { id, title, message, time: timeStr, type, unread: true, timestamp: Date.now() };
    dashboardState.notifications = dashboardState.notifications || [];
    dashboardState.notifications.unshift(notif);
    
    // Keep only last 50 notifications
    if (dashboardState.notifications.length > 50) {
        dashboardState.notifications = dashboardState.notifications.slice(0, 50);
    }
    
    saveNotifications();
    loadNotifications();
    return id;
}

function removeNotification(id) {
    dashboardState.notifications = (dashboardState.notifications || []).filter(n => n.id !== id);
    saveNotifications();
    loadNotifications();
}

function markAllRead() {
    (dashboardState.notifications || []).forEach(n => n.unread = false);
    saveNotifications();
    loadNotifications();
}


// Mark notification as read
function markAsRead(notifId) {
    const notif = dashboardState.notifications.find(n => n.id === notifId);
    if (notif) {
        notif.unread = false;
        saveNotifications();
        loadNotifications();
    }
}

// Clear all notifications
function clearAllNotifications() {
    dashboardState.notifications = [];
    saveNotifications();
    loadNotifications();
}

// Activity tracking
function startActivityTracking() {
    // Track page navigation
    const originalNavigateToPage = navigateToPage;
    window.navigateToPage = function(page) {
        originalNavigateToPage(page);
        trackActivity('navigation', `Navigated to ${page}`);
    };
    
    // Track visibility changes (user comes back to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            const timeAway = Date.now() - (dashboardState.lastActiveTime || Date.now());
            if (timeAway > 300000) { // 5 minutes away
                addNotification('Welcome back!', 'You were away for a while. Check out recent updates.', 'info');
            }
        }
        dashboardState.lastActiveTime = Date.now();
    });
}

function trackActivity(type, description) {
    const activityMap = {
        'navigation': (desc) => {
            if (desc.includes('Projects')) {
                addNotification('Project View', 'You are viewing your projects', 'info');
            } else if (desc.includes('ai-studio')) {
                addNotification('AI Studio', 'AI Assistant is ready to help you', 'info');
            }
        },
        'project_open': (desc) => {
            addNotification('Project Opened', desc, 'info');
        },
        'project_create': (desc) => {
            addNotification('New Project Created', desc, 'success');
        },
        'code_generate': (desc) => {
            addNotification('Code Generated', desc, 'success');
        },
        'deployment': (desc) => {
            addNotification('Deployment', desc, 'warning');
        }
    };
    
    if (activityMap[type]) {
        activityMap[type](description);
    }
}

// Open builder with blank workspace
function openBuilder() {
    addNotification('Opening Builder', 'Starting a new project...', 'info');
    // Redirect to index.html with builder mode
    setTimeout(() => {
        window.location.href = 'index.html#builder';
    }, 500);
}

// Generate API function
function generateAPI() {
    addNotification('API Generator', 'Opening API generation tools...', 'info');
    alert('Opening API generator...');
    // Future implementation: Open API generation interface
}

// Create model function
function createModel() {
    addNotification('Database Model', 'Opening database model creator...', 'info');
    alert('Opening model creator...');
    // Future implementation: Open database model creator
}

// Setup project function (redirects to workspace/builder)
function setupProject(projectId) {
    addNotification('Setting up project', 'Opening workspace builder...', 'info');
    // Redirect to index.html with builder mode after a brief delay
    setTimeout(() => {
        window.location.href = 'index.html#builder';
    }, 800);
}

// Delete project function
function deleteProject(projectId) {
    // Confirm deletion
    if (confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
        // Find the project card element
        const projectCard = document.querySelector(`[data-project-id="${projectId}"]`);
        
        if (projectCard) {
            // Add fade out animation
            projectCard.style.transition = 'all 0.3s ease';
            projectCard.style.opacity = '0';
            projectCard.style.transform = 'scale(0.9)';
            
            // Remove the card after animation
            setTimeout(() => {
                projectCard.remove();
                
                // Update project count in filter buttons
                updateProjectCounts();
                
                // Show success notification
                addNotification('Project Deleted', 'The project has been removed successfully', 'success');
                
                // Reinitialize Lucide icons after DOM update
                lucide.createIcons();
            }, 300);
        }
    }
}

// Update project counts in filter buttons
function updateProjectCounts() {
    const allProjects = document.querySelectorAll('.project-card').length;
    const deployedProjects = document.querySelectorAll('.project-card[data-status="deployed"]').length;
    const developmentProjects = document.querySelectorAll('.project-card[data-status="development"]').length;
    const draftProjects = document.querySelectorAll('.project-card[data-status="draft"]').length;
    
    // Update filter button texts
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        const filter = btn.getAttribute('data-filter');
        if (filter === 'all') {
            btn.textContent = `All Projects (${allProjects})`;
        } else if (filter === 'deployed') {
            btn.textContent = `Deployed (${deployedProjects})`;
        } else if (filter === 'development') {
            btn.textContent = `In Development (${developmentProjects})`;
        } else if (filter === 'draft') {
            btn.textContent = `Drafts (${draftProjects})`;
        }
    });
    
    // Update statistics section
    const statCards = document.querySelectorAll('.stat-card-simple');
    statCards.forEach(card => {
        const statValue = card.querySelector('.stat-value-large');
        const statLabel = card.querySelector('.stat-label-simple');
        
        if (statLabel) {
            const label = statLabel.textContent.trim();
            if (label === 'Total Projects') {
                statValue.textContent = allProjects;
            } else if (label === 'Deployed') {
                statValue.textContent = deployedProjects;
            } else if (label === 'In Development') {
                statValue.textContent = developmentProjects;
            } else if (label === 'Drafts') {
                statValue.textContent = draftProjects;
            }
        }
    });
}

// Export for global use
window.dashboardState = dashboardState;
window.toggleSidebar = toggleSidebar;
window.navigateToPage = navigateToPage;
window.toggleTheme = toggleTheme;
window.toggleAIDrawer = toggleAIDrawer;
window.toggleNotifications = toggleNotifications;
window.toggleProfileMenu = toggleProfileMenu;
window.newProject = newProject;
window.connectAPI = connectAPI;
window.deployApp = deployApp;
window.viewDocs = viewDocs;
window.openProject = openProject;
window.markAsRead = markAsRead;
window.clearAllNotifications = clearAllNotifications;
window.openBuilder = openBuilder;
window.generateAPI = generateAPI;
window.createModel = createModel;
window.addNotification = addNotification;
window.removeNotification = removeNotification;
window.markAllRead = markAllRead;
window.loadSettings = loadSettings;
window.saveSettings = saveSettings;
window.applySettings = applySettings;
window.enableAllSettings = enableAllSettings;
window.startActivityTracking = startActivityTracking;
window.trackActivity = trackActivity;
window.loadStoredNotifications = loadStoredNotifications;
window.saveNotifications = saveNotifications;
window.setupProject = setupProject;
window.deleteProject = deleteProject;
window.updateProjectCounts = updateProjectCounts;
