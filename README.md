# 🚀 BuildLab - AI-Powered No-Code Platform

<div align="center">

![BuildLab Logo](assets/favicon.png)

**Empowering product builders with the most powerful coding agents**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](package.json)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()

[Demo](http://localhost:3000) • [Documentation](#-documentation) • [Features](#-features) • [Get Started](#-quick-start)

</div>

---

## 🌟 Overview

BuildLab is a revolutionary AI-powered platform that enables anyone—from entrepreneurs to non-technical founders—to create production-ready full-stack web applications without writing a single line of code. Featuring an intuitive drag-and-drop builder, real-time AI code generation, and a comprehensive dashboard with smart activity tracking, BuildLab transforms ideas into reality.

---

## 📋 Table of Contents

- [🌟 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🎯 Why BuildLab?](#-why-buildlab)
- [🚀 Quick Start](#-quick-start)
- [📁 Project Structure](#-project-structure)
- [🛠️ Technologies](#️-technologies)
- [📊 Dashboard Features](#-dashboard-features)
  - [Dynamic Notifications](#dynamic-notifications-system)
  - [Activity Tracking](#activity-tracking)
  - [Settings Management](#settings-management)
- [🎨 Builder Guide](#-builder-guide)
  - [Getting Started](#getting-started-with-builder)
  - [Components](#available-components)
  - [AI Assistant](#ai-assistant-integration)
  - [Code Generation](#code-generation)
- [🔐 Authentication](#-authentication)
- [🤖 AI Integration](#-ai-integration)
- [⚙️ Configuration](#️-configuration)
- [🌐 Browser Support](#-browser-support)
- [🎨 Customization](#-customization)
- [📊 Testing](#-testing)
- [🐛 Troubleshooting](#-troubleshooting)
- [🗺️ Roadmap](#️-roadmap)
- [📞 Support](#-support)
- [📄 License](#-license)

---

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🎨 Visual Builder
- **Drag & Drop Interface**: Intuitive component placement
- **Live Preview**: See changes in real-time
- **Responsive Design**: Mobile-first approach
- **Component Library**: Pre-built UI elements

</td>
<td width="50%">

### 🤖 AI-Powered
- **GPT-3.5 Turbo**: Advanced code generation
- **Context-Aware**: Understands your project
- **Natural Language**: Describe what you want
- **Smart Suggestions**: AI-driven recommendations

</td>
</tr>
<tr>
<td width="50%">

### 📊 Smart Dashboard
- **Activity Tracking**: Monitor all actions
- **Dynamic Notifications**: Real-time updates
- **Persistent State**: Never lose progress
- **Usage Analytics**: Track productivity

</td>
<td width="50%">

### ⚡ Full-Stack Ready
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express APIs
- **Database**: MongoDB integration
- **Authentication**: JWT-based security

</td>
</tr>
</table>

### Core Capabilities

#### 🎯 Builder Features
- Visual drag-and-drop canvas with snap-to-grid
- Real-time component editing and property customization
- Live preview mode with responsive testing
- One-click code export with complete project structure
- Component library: Container, Text, Button, Card, List, Grid
- Undo/Redo functionality
- Copy/paste/duplicate components

#### 🤖 AI Assistant Features
- Natural language code generation
- Context-aware suggestions based on your project
- Full-stack code generation (Frontend + Backend + Database)
- API endpoint generation with Express.js
- Database schema creation with Mongoose
- JWT authentication scaffolding
- Real-time chat interface with conversation history
- Example prompts and templates
- Error handling and validation

#### 📊 Dashboard Features
- **Dynamic Notifications**: Smart activity-based alerts that persist across sessions
- **Activity Tracking**: Comprehensive monitoring of all user actions
  - Login/logout events with welcome messages
  - Project creation and opening
  - Builder and tool usage
  - AI assistant interactions (with milestone tracking)
  - Deployment activities
  - Page navigation
  - Return detection after 5+ minutes away
- **Settings Management**: Instant-apply toggles with localStorage persistence
- **Quick Actions**: Fast access to builder, API generator, model creator, deployment
- **AI Studio Integration**: Built-in AI drawer for instant assistance
- **External Integrations**: One-click Vercel deployments and Figma templates
- **Usage Analytics**: Track AI usage with milestone notifications
- **Notification Features**:
  - Persistent storage (survives page refresh)
  - Timestamp tracking
  - Badge counter with smart hiding
  - Mark as read (individual or bulk)
  - Clear all functionality
  - Auto-limit to 50 notifications
  - Session-gated to avoid spam

#### 🔧 Advanced Features
- **Backend Generation**: Complete Express.js API with routing
- **Database Models**: Mongoose schemas with validation
- **Authentication**: JWT token generation and middleware
- **API Documentation**: Automatic endpoint documentation
- **Environment Setup**: `.env` file generation
- **Error Handling**: Comprehensive error middleware
- **CORS Configuration**: Cross-origin resource sharing setup
- **Security**: Password hashing with bcrypt

#### 🔧 Advanced Features
- **Backend Generation**: Complete Express.js API with routing
- **Database Models**: Mongoose schemas with validation
- **Authentication**: JWT token generation and middleware
- **API Documentation**: Automatic endpoint documentation
- **Environment Setup**: `.env` file generation
- **Error Handling**: Comprehensive error middleware
- **CORS Configuration**: Cross-origin resource sharing setup
- **Security**: Password hashing with bcrypt

---

## 🎯 Why BuildLab?

### For Entrepreneurs 💼
- **Rapid Prototyping**: Go from idea to MVP in hours, not weeks
- **Cost-Effective**: No need to hire expensive developers initially
- **Investor-Ready**: Generate actual working code to demonstrate concepts
- **Quick Iteration**: Test ideas fast and pivot easily

### For Small Businesses 🏢
- **Custom Tools**: Build internal tools tailored to your needs
- **Client Portals**: Create custom client-facing applications
- **Landing Pages**: Generate professional marketing pages quickly
- **CRM Solutions**: Develop simple customer management systems

### For Students & Learners 🎓
- **Learn by Building**: See how professional code is structured
- **Experiment Freely**: Try ideas without syntax worries
- **Portfolio Projects**: Create impressive projects for your portfolio
- **Understand Patterns**: Learn web development best practices

### For Non-Technical Founders 🚀
- **No Code Needed**: Build without programming knowledge
- **Full Control**: Own your code and infrastructure
- **Fast Deployment**: From concept to production quickly
- **Professional Output**: Production-ready, clean code

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js installed (for running local server)
- OpenAI API key (for AI features)

### Installation Steps

1. **Clone or Download the Repository**
   ```bash
   git clone https://github.com/amritesh-0/Oneiros-muj.git
   cd "web tech(frontend)"
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```
   
   Or use alternative methods:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js http-server
   npx http-server -p 3000
   ```

4. **Open Your Browser**
   ```
   http://localhost:3000
   ```

5. **Sign In**
   - Click "Sign In" or "Get Started Now"
   - Enter any email/password (demo mode)
   - Dashboard loads automatically

6. **Start Building!**
   - Click "New Project" to open the builder
   - Drag components onto the canvas
   - Use AI Assistant for help
   - Generate and export your code

### First Project in 5 Minutes

1. **Login** → Enter any credentials
2. **New Project** → Click the button in dashboard
3. **Drag Container** → Drop onto canvas
4. **Add Text** → Drag text component inside container
5. **Add Button** → Drag button below text
6. **AI Assist** → Type "Style this as a hero section"
7. **Generate Code** → Click the button
8. **Preview** → See your creation live!
9. **Export** → Download complete project

---

---

## 📁 Project Structure

```
web-tech(frontend)/
│
├── 📄 index.html                    # Main landing page & visual builder
├── 🔐 login.html                    # Authentication - Login page
├── 📝 signup.html                   # Authentication - Signup page
├── 📊 dashboard.html                # User dashboard with notifications
├── 📦 package.json                  # npm dependencies and scripts
├── 📖 README.md                     # This comprehensive documentation
│
├── 🎨 styles/                       # Stylesheets
│   ├── main.css                    # Core styles & component library
│   ├── animations.css              # Animation definitions & keyframes
│   ├── letterglitch.css            # Text glitch effects
│   └── dashboard.css               # Dashboard-specific styles
│
├── 📜 scripts/                      # JavaScript modules
│   ├── main.js                     # Main app logic & AI integration
│   ├── dashboard.js                # Dashboard functionality & tracking
│   ├── GhostCursor.js             # Cursor trail effect
│   └── ai-assistant.js             # AI chat integration (optional)
│
└── 🖼️ assets/                       # Static assets
    ├── favicon.png                 # Site favicon (landing pages)
    └── favicon.svg                 # Site favicon (dashboard)
```

### Key Files Explained

#### `index.html` - Visual Builder
The main interface where users create applications:
- Drag-and-drop canvas
- Component sidebar
- AI chat assistant
- Preview mode
- Code generation interface
- Export functionality

#### `dashboard.html` - User Dashboard
Post-authentication central hub:
- Project management
- Dynamic notification system
- Activity tracking
- Settings configuration
- Quick actions
- AI Studio integration

#### `scripts/main.js` - Core Logic
Contains all builder functionality:
- Component management
- Drag-and-drop logic
- AI API integration
- Code generation algorithms
- Preview system
- Export functionality

#### `scripts/dashboard.js` - Dashboard Logic
Manages dashboard features:
- Notification system with localStorage
- Activity tracking functions
- Settings persistence
- Navigation handlers
- AI usage tracking
- Session management

#### `styles/main.css` - Design System
Complete styling framework:
- CSS custom properties (variables)
- Component styles
- Layout systems
- Responsive breakpoints
- Theme definitions

---

---

## 🛠️ Technologies

### Frontend Stack

<table>
<tr>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<br><strong>HTML5</strong>
<br>Semantic markup
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
<br><strong>CSS3</strong>
<br>Modern styling
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
<br><strong>Vanilla JS</strong>
<br>Zero dependencies
</td>
<td align="center" width="25%">
<img src="https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
<br><strong>Three.js</strong>
<br>WebGL rendering
</td>
</tr>
</table>

#### Core Technologies
- **HTML5**: Semantic markup, Drag & Drop API, Canvas API
- **CSS3**: Custom properties, Grid, Flexbox, Animations
- **JavaScript ES6+**: Modules, async/await, Promises, Classes
- **Three.js r128**: WebGL for ColorBends animated backgrounds
- **Native APIs**: Fetch API, LocalStorage API, File API

### Backend & AI Integration

<table>
<tr>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white" />
<br><strong>OpenAI GPT-3.5</strong>
<br>AI code generation
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<br><strong>Node.js</strong>
<br>Backend generation
</td>
<td align="center" width="33%">
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<br><strong>MongoDB</strong>
<br>Database schemas
</td>
</tr>
</table>

#### AI & Backend
- **OpenAI GPT-3.5-turbo**: Production code generation
- **Express.js**: RESTful API framework generation
- **MongoDB/Mongoose**: NoSQL database integration
- **JWT**: JSON Web Token authentication
- **bcrypt**: Password hashing security

### Design & UX

- **ColorBends**: Advanced WebGL fluid gradient animations
- **Glassmorphism**: Modern frosted glass UI effects
- **Lucide Icons**: Beautiful, consistent icon library
- **Custom Animations**: Smooth transitions and micro-interactions
- **Responsive Design**: Mobile-first approach with breakpoints

### Development Tools

- **npm**: Package management
- **http-server**: Local development server
- **Git**: Version control
- **VS Code**: Recommended editor

---

---

## 📊 Dashboard Features

The BuildLab dashboard is your command center, featuring intelligent activity tracking and persistent notifications.

### Dynamic Notifications System

The notification system automatically tracks and notifies you about all platform activities:

#### Notification Types

| Type | Icon | Use Case | Example |
|------|------|----------|---------|
| **Success** ✅ | Green | Completed actions | "Project created successfully" |
| **Info** ℹ️ | Blue | General updates | "Opened project: My App" |
| **Warning** ⚠️ | Orange | Important actions | "Deployment started" |
| **Error** ❌ | Red | Failed operations | "API connection failed" |

#### Features

✨ **Persistent Storage**
- All notifications saved to localStorage
- Survive page refreshes and browser restarts
- Automatic cleanup (max 50 notifications)

⏰ **Time Stamps**
- Each notification shows creation time
- Formatted as "3:45 PM"
- Auto-updates on page load

🔔 **Smart Badge Counter**
- Shows unread notification count
- Automatically hides when count is 0
- Updates in real-time

✅ **Mark as Read**
- Individual notification marking
- "Mark All as Read" bulk action
- Visual indication of read/unread state

🗑️ **Clear All**
- Remove all notifications with one click
- Confirmation before deletion
- Instant UI update

🗑️ **Clear All**
- Remove all notifications with one click
- Confirmation before deletion
- Instant UI update

### Activity Tracking

BuildLab automatically tracks and creates notifications for these activities:

#### User Authentication
- 🔐 **Login Detection**: Welcome message on login (time-gated to once per minute)
- 👤 **User Session**: Displays username in welcome notification
- 🔄 **Return Tracking**: Special welcome after 5+ minutes away

#### Project Activities
- 📁 **Project Opened**: Notification with project name
- ✨ **Project Created**: Success notification for new projects
- 🏗️ **Builder Launched**: Notification when opening builder
- 💾 **Project Saved**: Auto-save confirmations

#### Development Actions
- 🔧 **API Generation**: Tracks API generator tool usage
- 🗄️ **Model Creation**: Database model builder tracking
- 📝 **Code Generation**: AI-powered code creation events
- 🚀 **Deployment**: Deployment wizard initiation

#### AI Assistant Usage
- 🤖 **First Use**: Special notification on first AI interaction
- 📊 **Milestone Tracking**: Notification every 5 AI messages
- 💬 **Session Count**: Tracks usage per session
- 📈 **Usage Analytics**: Shows total AI interactions

#### Navigation & Engagement
- 🧭 **Page Navigation**: Tracks movement between dashboard sections
- ⚙️ **Settings Changes**: Confirms setting modifications
- 🔗 **External Links**: Tracks Vercel and Figma access
- 📊 **Dashboard Views**: Monitors section access

### Settings Management

Comprehensive settings with instant persistence:

#### Available Settings

1. **My Projects Toggle**
   - Show/hide project list in dashboard
   - Instant visual update
   - Persists across sessions

2. **Backend Services Toggle**
   - Enable/disable backend features
   - Controls API generation visibility
   - Saved to localStorage

3. **Enable All**
   - Quick action button
   - Activates all settings at once
   - Confirmation notification

#### Settings Features
- ⚡ **Instant Apply**: Changes take effect immediately
- 💾 **Auto-Save**: Automatically persists to localStorage
- 🔄 **Load on Start**: Settings loaded on dashboard init
- ✅ **Visual Feedback**: Smooth toggle animations
- 🎯 **Reset Options**: Quick enable/disable all

### Navigation Enhancements

Special navigation handlers for improved UX:

#### Smart Navigation

**🤖 AI Studio**
- Opens AI assistant drawer overlay
- No page navigation
- Instant access to help
- Conversation history maintained

**🚀 Deployments**
- Opens Vercel.com in new tab
- Direct deployment access
- No interruption to workflow
- Tracked in notifications

**📄 Templates**
- Opens Figma Community in new tab
- Browse design templates
- External resource access
- Activity tracked

**Standard Pages**
- 📊 Dashboard: Overview and stats
- 📁 Projects: Project management
- ⚙️ Settings: Configuration panel

### localStorage Structure

All dashboard data is stored locally:

```javascript
// Notifications array
buildlab_notifications = [{
  id: "notif_1699564800123",
  title: "Welcome back!",
  message: "You logged in as john@example.com",
  type: "success",
  unread: true,
  timestamp: "3:45 PM"
}]

// Dashboard settings
dashboard_settings = {
  showProjects: true,
  showBackend: true
}

// User session
buildlab_user = {
  email: "john@example.com",
  name: "John Doe",
  loginTime: "1699564800000"
}

// Activity tracking
buildlab_last_login = "1699564800000"
ai_usage_count = "5"
```

---

## 🎨 Builder Guide

### Getting Started with Builder

The visual builder is the heart of BuildLab, where you create your applications without code.

#### Builder Interface

```
┌─────────────────────────────────────────────────────────┐
│  [Logo] BuildLab Builder              [Preview] [Export] │
├──────────┬──────────────────────────────────────────────┤
│          │                                               │
│ Components│          Drag & Drop Canvas                  │
│          │                                               │
│ □ Container                                              │
│ □ Text   │         [Drop components here]               │
│ □ Button │                                               │
│ □ Card   │                                               │
│ □ List   │                                               │
│ □ Grid   │                                               │
│          │                                               │
├──────────┴──────────────────────────────────────────────┤
│ AI Assistant Chat                            [Generate] │
└─────────────────────────────────────────────────────────┘
```

### Available Components

#### 1. Container 📦
- **Purpose**: Layout wrapper and grouping
- **Properties**: 
  - Width, Height
  - Padding, Margin
  - Background Color
  - Border Radius
- **Use Cases**: Sections, wrappers, cards
- **Nesting**: Can contain other components

#### 2. Text 📝
- **Purpose**: Display text content
- **Properties**:
  - Content (editable)
  - Font Size, Weight
  - Color
  - Alignment
- **Use Cases**: Headings, paragraphs, labels
- **HTML Output**: `<h1>`, `<p>`, `<span>`

#### 3. Button 🔘
- **Purpose**: Interactive call-to-action
- **Properties**:
  - Label Text
  - Background/Text Color
  - Size (Small, Medium, Large)
  - Border Radius
- **Use Cases**: Forms, CTAs, navigation
- **Events**: Click handlers auto-generated

#### 4. Card 🎴
- **Purpose**: Content containers with elevation
- **Properties**:
  - Title
  - Content
  - Image URL
  - Shadow Depth
- **Use Cases**: Product cards, posts, profiles
- **Styling**: Pre-styled with shadows

#### 5. List 📋
- **Purpose**: Vertical list of items
- **Properties**:
  - List Items (array)
  - Item Style
  - Spacing
- **Use Cases**: Navigation menus, item lists
- **Output**: `<ul>` or `<ol>` elements

#### 6. Grid 📐
- **Purpose**: Responsive grid layouts
- **Properties**:
  - Columns (1-12)
  - Gap Size
  - Responsive Breakpoints
- **Use Cases**: Galleries, product grids, layouts
- **CSS**: Auto-generates grid CSS

### AI Assistant Integration

The AI assistant helps you build faster with natural language commands.

#### How to Use

1. **Open Chat**: Click AI icon or press `Ctrl+K`
2. **Describe Need**: Type what you want in plain English
3. **AI Generates**: Receives and processes your request
4. **Code Appears**: Generated code shown in chat
5. **Copy/Apply**: Use code or apply to canvas

#### Example Prompts

**UI Components**
```
"Create a login form with email and password"
"Add a navigation bar with logo and menu items"
"Make a hero section with heading and CTA button"
"Design a pricing table with 3 tiers"
```

**Styling**
```
"Style this button with a gradient background"
"Make the card have a shadow and rounded corners"
"Center align all text in this container"
"Add hover effects to the buttons"
```

**Full Features**
```
"Create a contact form with validation"
"Build a user dashboard with sidebar"
"Generate a product gallery grid"
"Make a responsive landing page"
```

**Backend & API**
```
"Generate a user registration API with Express"
"Create MongoDB schema for products"
"Add JWT authentication to the API"
"Build REST endpoints for blog posts"
```

#### AI Capabilities

✅ **Generates**:
- HTML structure
- CSS styling
- JavaScript functionality
- Express.js APIs
- Mongoose models
- JWT authentication
- Form validation
- Responsive layouts

❌ **Limitations**:
- Cannot connect to real databases
- No actual deployment
- Demo-level complexity
- Requires manual review

### Code Generation

Transform your visual design into production code.

#### Generation Process

1. **Design Complete**: Finish your visual layout
2. **Click Generate**: Hit "📝 Generate Code" button
3. **AI Processing**: GPT-3.5 analyzes your design
4. **Code Created**: Complete project structure generated
5. **Review Code**: Shown in AI chat window
6. **Export**: Download as ZIP file

#### Generated Output

**Frontend Files**:
```
project/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling
└── script.js           # JavaScript functionality
```

**Full-Stack Files** (if backend enabled):
```
project/
├── frontend/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/
│   ├── server.js       # Express server
│   ├── routes/         # API routes
│   ├── models/         # Mongoose models
│   ├── middleware/     # Auth middleware
│   └── .env.example    # Environment template
└── README.md           # Setup instructions
```

#### Code Quality

✅ **Clean Code**:
- Semantic HTML5
- Modern CSS (Grid, Flexbox)
- ES6+ JavaScript
- Comments included
- Best practices followed

✅ **Production-Ready**:
- Responsive design
- Cross-browser compatible
- Accessible (ARIA labels)
- SEO-friendly
- Performance optimized

---

---

## 🔐 Authentication

BuildLab features a beautiful authentication system with animated backgrounds.

### Login Page (`login.html`)

#### Features
- 📧 **Email/Username Input**: Flexible login identifier
- 🔒 **Password Field**: Secure password input with toggle visibility
- ☑️ **Remember Me**: Optional persistent login
- 🔗 **Forgot Password**: Password recovery link
- 🎨 **ColorBends Background**: Stunning WebGL fluid animation
- 🌓 **Dark Theme**: Modern dark UI design

#### Social Login UI
- Google OAuth button
- Apple Sign-In button
- GitHub authentication button
- *Note: Demo mode - not functional yet*

#### Form Validation
```javascript
// Email format validation
// Password length check
// Empty field detection
// Real-time error display
```

### Signup Page (`signup.html`)

#### Features
- 👤 **Username Field**: Unique identifier
- 📧 **Email/Phone**: Contact information
- 🔒 **Password**: Secure password creation
- 🔒 **Confirm Password**: Password verification
- ✅ **Terms Acceptance**: Terms of service checkbox
- 🎨 **ColorBends Background**: Matching animated gradient

#### Validation Rules
- Username: 3-20 characters
- Email: Valid format check
- Password: Minimum 8 characters
- Match: Passwords must match
- Terms: Must be accepted

### Session Management

#### Demo Mode
```javascript
// Current Implementation
localStorage.setItem('buildlab_user', JSON.stringify({
  email: email,
  name: username,
  loginTime: Date.now()
}));
```

#### Future: Real Authentication
- JWT token generation
- Secure HTTP-only cookies
- Refresh token rotation
- Session expiration
- Multi-device management

### ColorBends Animation

The login and signup pages feature "ColorBends" - a stunning WebGL fluid gradient animation.

#### Technology
- **Three.js**: WebGL rendering engine
- **Custom Shaders**: GLSL fragment shaders
- **Mouse Interaction**: Responds to cursor movement
- **Performance**: Optimized for 60 FPS

#### Customization

Edit colors in `login.html` or `signup.html`:
```javascript
const colors = [
  "#ff5c7a",  // Pink
  "#8a5cff",  // Purple
  "#00ffd1"   // Cyan
];

// Animation speed
material.uniforms.uSpeed.value = 0.3;

// Scale factor
material.uniforms.uScale.value = 1.2;

// Mouse influence
material.uniforms.uMouseInfluence.value = 0.8;
```

### Security Considerations

#### Current (Demo)
- ⚠️ No actual authentication
- ⚠️ Passwords not hashed
- ⚠️ Sessions not secure
- ⚠️ No server validation

#### Production Recommendations
- ✅ Implement bcrypt password hashing
- ✅ Use JWT with refresh tokens
- ✅ Add CSRF protection
- ✅ Implement rate limiting
- ✅ Use HTTPS only
- ✅ Add 2FA support
- ✅ Session timeout handling
- ✅ Brute force protection

---

## 🤖 AI Integration

BuildLab's AI capabilities are powered by OpenAI's GPT-3.5-turbo model.

### API Configuration

#### Setting Up Your API Key

1. **Get API Key**
   - Visit [OpenAI Platform](https://platform.openai.com/)
   - Sign up or log in
   - Navigate to API Keys
   - Create new secret key
   - Copy the key

2. **Add to BuildLab**
   
   Open `scripts/main.js` and find:
   ```javascript
   const OPENAI_API_KEY = 'your-api-key-here';
   ```
   
   Replace with your actual key:
   ```javascript
   const OPENAI_API_KEY = 'sk-proj-xxxxxxxxxxxx';
   ```

3. **Test Connection**
   - Open builder
   - Click "🔑 Test API Connection"
   - Should see success message

#### API Request Structure

```javascript
const requestBody = {
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content: "You are an expert web developer..."
    },
    {
      role: "user",
      content: userPrompt
    }
  ],
  temperature: 0.7,
  max_tokens: 2000
};
```

### AI Features

#### Code Generation

**Input**: Natural language description
**Process**: GPT-3.5 analysis and generation
**Output**: Production-ready code

**Capabilities**:
- HTML structure generation
- CSS styling with modern properties
- JavaScript functionality
- React/Vue component creation
- Express.js API endpoints
- Mongoose database models
- JWT authentication setup

#### Context Awareness

The AI understands:
- Current project structure
- Enabled features (Backend, Database, Auth)
- Previously generated code
- Component relationships
- Best practices and patterns

#### Example Interactions

**Simple Request**:
```
User: "Create a contact form"
AI: Generates HTML form + CSS styling + JS validation
```

**Complex Request**:
```
User: "Build a user authentication system with login, signup, and dashboard"
AI: Generates:
  - Login/Signup HTML forms
  - CSS styling
  - Frontend validation
  - Express.js auth routes
  - MongoDB User model
  - JWT middleware
  - Protected route examples
```

### Fallback Responses

If API is unavailable or rate-limited, BuildLab has template responses for common requests:

- Login forms
- Contact forms
- Navigation bars
- Button components
- Card layouts
- Hero sections

### Rate Limits & Costs

#### OpenAI Pricing (as of 2024)
- **GPT-3.5-turbo**: $0.002 per 1K tokens
- **Average Request**: ~500-1000 tokens
- **Cost per Request**: $0.001-$0.002

#### Best Practices
- ✅ Cache frequently used patterns
- ✅ Use fallback templates when possible
- ✅ Implement request debouncing
- ✅ Set max_tokens limits
- ✅ Monitor usage in OpenAI dashboard
- ✅ Implement error handling

### Error Handling

```javascript
try {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`
    },
    body: JSON.stringify(requestBody)
  });
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
  
} catch (error) {
  console.error('OpenAI API Error:', error);
  // Fall back to template response
  return getFallbackResponse(userPrompt);
}
```

---

## ⚙️ Configuration

### Environment Setup

#### Development Server Options

**Option 1: npm (Recommended)**
```bash
npm install
npm run dev
```

**Option 2: Python**
```bash
python -m http.server 3000
# or for Python 2
python -m SimpleHTTPServer 3000
```

**Option 3: Node.js**
```bash
npx http-server -p 3000
```

**Option 4: VS Code Live Server**
- Install Live Server extension
- Right-click `index.html`
- Select "Open with Live Server"

### Package.json Configuration

```json
{
  "name": "buildlab",
  "version": "2.0.0",
  "description": "AI-Powered No-Code Platform",
  "main": "index.html",
  "scripts": {
    "dev": "npx http-server -p 3000 -o",
    "start": "npm run dev"
  },
  "keywords": ["no-code", "ai", "builder", "web-development"],
  "author": "BuildLab Team",
  "license": "MIT"
}
```

### Port Configuration

Change default port (3000) in any command:
```bash
# Different port
npm run dev -- -p 8080
python -m http.server 8080
npx http-server -p 8080
```

### API Key Security

#### ⚠️ Important Security Notes

**Current Setup** (Development):
```javascript
// In scripts/main.js
const OPENAI_API_KEY = 'sk-proj-xxxx';
```

**Production Setup** (Recommended):
```javascript
// Use environment variables
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Or use a backend proxy
fetch('/api/generate', {
  method: 'POST',
  body: JSON.stringify({ prompt: userInput })
});
```

**Best Practices**:
- ❌ Never commit API keys to git
- ❌ Don't expose keys in frontend code
- ✅ Use backend API proxy for production
- ✅ Add keys to `.env` file
- ✅ Add `.env` to `.gitignore`
- ✅ Implement rate limiting
- ✅ Use CORS restrictions

---

## 🌐 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

**Requirements**:
- WebGL support (for ColorBends)
- ES6+ JavaScript
- CSS Custom Properties

---

## 🎨 Customization

### Colors

Edit `styles/main.css`:

```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    --accent-color: #06b6d4;
    --bg-primary: #0f0f23;
    --text-primary: #ffffff;
}
```

### ColorBends Background

In `login.html` and `signup.html`:

```javascript
const colors = ["#ff5c7a", "#8a5cff", "#00ffd1"]; // Change colors
material.uniforms.uSpeed.value = 0.3;             // Animation speed
material.uniforms.uScale.value = 1.2;             // Scale
material.uniforms.uMouseInfluence.value = 0.8;    // Mouse interaction
```

### Animations

Edit `styles/animations.css`:

```css
:root {
    --transition-fast: 150ms;
    --transition-base: 250ms;
    --transition-slow: 350ms;
}
```

---

## 🐛 Troubleshooting

### Dashboard Issues

#### Notifications Not Appearing?
1. Check browser console (F12) for errors
2. Clear localStorage: `localStorage.clear()` then refresh
3. Check that `dashboard.js` is loaded
4. Verify you're logged in

#### Settings Not Saving?
1. Ensure localStorage is enabled in browser
2. Check browser console for storage errors
3. Try incognito/private mode to test
4. Clear cache and reload

#### Activity Not Tracked?
1. Verify `startActivityTracking()` is called in console
2. Check notification permissions
3. Try performing actions (open project, use AI, etc.)
4. Look for JavaScript errors in console

### Chat Not Responding?
1. Check browser console (F12) for errors
2. Verify API key in `scripts/main.js`
3. Click "🔑 Test API Connection"
4. Check internet connection
5. Try fallback mode

### Components Not Dragging?
1. Refresh the page
2. Clear browser cache
3. Try a different browser
4. Check console for JavaScript errors

### Login/Signup Not Working?
1. Check that `login.html` and `signup.html` exist
2. Verify Three.js CDN is loading
3. Open browser console for errors
4. Try clearing localStorage: `localStorage.clear()`

### ColorBends Not Showing?
1. Ensure WebGL is supported
2. Check Three.js loaded correctly
3. Open console for WebGL errors
4. Try disabling browser extensions

### Code Generation Failed?
1. Verify API key is valid
2. Check rate limits
3. Review error message in chat
4. Try simpler request first

---

## 📊 Testing Checklist

### Landing & Authentication
- [ ] Homepage loads correctly
- [ ] "Sign In" button → login page
- [ ] "Get Started Now" → login page
- [ ] Login with any credentials works
- [ ] Signup page accessible
- [ ] ColorBends animates smoothly

### Dashboard
- [ ] Dashboard loads after login
- [ ] Welcome notification appears
- [ ] Notification badge shows correct count
- [ ] Badge hides when count is 0
- [ ] Mark as read works
- [ ] Clear all notifications works
- [ ] Settings page loads
- [ ] Settings toggles work
- [ ] Settings persist after refresh
- [ ] AI Studio opens drawer
- [ ] Deployments opens Vercel
- [ ] Templates opens Figma

### Builder
- [ ] Builder opens after login
- [ ] Components drag to canvas
- [ ] AI chat responds
- [ ] Generate Code works
- [ ] Preview opens in new window
- [ ] Export downloads file

### Activity Tracking
- [ ] Login notification appears
- [ ] Project open tracked
- [ ] Builder launch tracked
- [ ] API generation tracked
- [ ] Model creation tracked
- [ ] Deployment tracked
- [ ] AI usage tracked (1st use & every 5)
- [ ] Page navigation tracked
- [ ] Return after 5 min tracked

---

## 🎯 Use Cases

### For Entrepreneurs
- Quickly prototype MVP ideas
- Test concepts without hiring developers
- Generate code to show investors
- Launch simple products fast

### For Small Businesses
- Create custom internal tools
- Build client portals
- Generate landing pages
- Develop simple CRMs

### For Students
- Learn web development
- See how code is structured
- Experiment with ideas
- Build portfolio projects

### For Non-Technical Founders
- Turn ideas into reality
- No coding knowledge needed
- Full-stack capabilities
- Production-ready output

---

## 🚀 Features Roadmap

### ✅ Completed (MVP)
- Visual canvas builder
- Drag-and-drop components
- AI code generation
- Real OpenAI integration
- Login/Signup pages
- ColorBends backgrounds
- Session management
- Code preview & export
- **User Dashboard** ✨ NEW
- **Dynamic Notifications** ✨ NEW
- **Activity Tracking** ✨ NEW
- **Settings Management** ✨ NEW
- **Persistent State** ✨ NEW
- **AI Studio Integration** ✨ NEW
- **External Integrations (Vercel, Figma)** ✨ NEW

### 🔜 Coming Soon
- Real OAuth integration
- Backend deployment
- Database hosting
- Version control
- Template marketplace
- Collaboration features
- Advanced AI prompts
- Component customization
- Real-time notifications
- Email notifications
- Team workspaces
- Analytics dashboard

---

## 📞 Support

For issues or questions:
1. Check this README
2. Review browser console
3. Test API connection
4. Try fallback mode

---

## 🌟 Credits

- **Design Inspiration**: bolt.new, v0.dev, Webflow
- **ColorBends**: Advanced WebGL shader animation
- **Three.js**: 3D graphics library
- **OpenAI**: GPT-3.5-turbo for code generation

---

## 📄 License

This project is created as an MVP prototype for educational and demonstration purposes.

---

## 🎉 Success Metrics

✅ **Zero coding knowledge required**  
✅ **AI generates functional code**  
✅ **Full-stack capabilities**  
✅ **Production-ready output**  
✅ **Intuitive for non-technical users**  
✅ **Smart activity tracking**  
✅ **Persistent notifications**  
✅ **Real-time dashboard updates**

---

**Built with ❤️ for entrepreneurs and founders who want to bring their ideas to life**

---

## 📝 Quick Commands

```bash
# Start development server
npm run dev

# Or alternatives:
python -m http.server 3000
npx http-server -p 3000

# Access the app
http://localhost:3000

# Pages
http://localhost:3000/              # Homepage
http://localhost:3000/login.html    # Login
http://localhost:3000/signup.html   # Signup
http://localhost:3000/dashboard.html # Dashboard (requires login)
```

---

## 🔧 localStorage Structure

The application uses localStorage for state management:

```javascript
// Notifications
buildlab_notifications = [{
  id: "notif_123",
  title: "Welcome back!",
  message: "You logged in as user@example.com",
  type: "success",
  unread: true,
  timestamp: "3:45 PM"
}]

// Settings
dashboard_settings = {
  showProjects: true,
  showBackend: true
}

// User Session
buildlab_user = {
  email: "user@example.com",
  name: "John Doe"
}

// Activity Tracking
buildlab_last_login = "1699564800000"
ai_usage_count = "5"
```

---

**Ready to build? Start at http://localhost:3000** 🚀
