# 🚀 BuildLab - AI-Powered No-Code Platform

<div align="center">

![BuildLab](https://img.shields.io/badge/BuildLab-v2.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)

**Empowering everyone to build full-stack web applications without coding**

[Get Started](#-quick-start) • [Features](#-features) • [Demo](#-demo) • [Documentation](#-documentation)

</div>

---

## 🌟 Overview

BuildLab is a revolutionary AI-powered no-code platform that enables anyone—from entrepreneurs to students—to create production-ready full-stack web applications without writing a single line of code. With an intuitive drag-and-drop builder, real-time AI code generation powered by OpenAI GPT-3.5, and a smart dashboard with activity tracking, BuildLab transforms your ideas into reality.

link-"https://build-lab-muj.vercel.app/"

### Why BuildLab?

- 💡 **No Coding Required** - Build complete applications with drag & drop
- 🤖 **AI-Powered** - Generate production-ready code with natural language
- 📊 **Smart Dashboard** - Track activities with intelligent notifications
- ⚡ **Full-Stack Ready** - Frontend, backend, database, and authentication
- 🎨 **Beautiful UI** - Modern design with stunning animations
- 💾 **Persistent State** - Never lose your progress
- 🚀 **Quick Deployment** - From idea to production in minutes

---

## ✨ Features

### 🎨 Visual Builder
- **Drag & Drop Interface** - Intuitive component placement on canvas
- **Live Preview** - See your changes in real-time
- **Component Library** - Container, Text, Button, Card, List, Grid
- **Property Editor** - Customize colors, sizes, spacing, and more
- **Responsive Design** - Mobile-first approach with breakpoints
- **Undo/Redo** - Full edit history support

### 🤖 AI Code Generation
- **GPT-3.5 Turbo Integration** - Advanced AI-powered code generation
- **Natural Language** - Describe what you want in plain English
- **Context-Aware** - Understands your project structure
- **Full-Stack Generation** - Frontend + Backend + Database + Auth
- **Production-Ready** - Clean, documented, best-practice code
- **Multiple Frameworks** - HTML/CSS/JS, Node.js, Express, MongoDB

### 📊 Smart Dashboard
- **Dynamic Notifications** - Real-time activity tracking with persistence
- **Activity Monitoring** - Login, projects, builder usage, AI interactions
- **Settings Management** - Instant-apply toggles with localStorage
- **Usage Analytics** - Track productivity and AI usage milestones
- **Quick Actions** - Fast access to builder, API generator, deployment
- **AI Studio Integration** - Built-in AI assistant drawer

### ⚡ Advanced Features
- **Backend Generation** - Complete Express.js REST APIs
- **Database Models** - Mongoose schemas with validation
- **JWT Authentication** - Secure user authentication system
- **API Documentation** - Auto-generated endpoint docs
- **Environment Setup** - Pre-configured `.env` files
- **Error Handling** - Comprehensive error middleware
- **CORS & Security** - Production-ready security setup
- **Interactive Cursor** - GSAP-powered cursor with smart targeting and parallax effects

---

## 📁 Project Structure

```
BuildLab/
│
├── 📄 index.html                    # Landing page & visual builder
├── 🔐 login.html                    # Authentication - Login
├── 📝 signup.html                   # Authentication - Signup
├── 📊 dashboard.html                # User dashboard with tracking
├── 📦 package.json                  # npm configuration
├── 📖 README.md                     # This file
│
├── 🎨 styles/                       
│   ├── main.css                    # Core styles & design system
│   ├── animations.css              # Animation keyframes
│   ├── letterglitch.css            # Text effects
│   ├── targetcursor.css            # Custom cursor styles
│   └── dashboard.css               # Dashboard styles
│
├── 📜 scripts/                      
│   ├── main.js                     # Builder logic & AI integration
│   ├── TargetCursor.js             # GSAP-powered cursor interactions
│   └── dashboard.js                # Dashboard & notifications
│
└── 🖼️ assets/                       
    ├── favicon.png                 # Landing page icon
    └── favicon.svg                 # Dashboard icon
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v14 or higher)
- **Modern Browser** (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- **OpenAI API Key** (for AI features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/amritesh-0/BuildLab.git
   cd BuildLab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure OpenAI API Key**
   
   Open `scripts/main.js` and add your API key:
   ```javascript
   const OPENAI_API_KEY = 'your-api-key-here';
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   
   Or use alternatives:
   ```bash
   # Python
   python -m http.server 3000
   
   # Node.js
   npx http-server -p 3000
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

### First Project (5 Minutes)

1. Click **"Get Started"** or **"Sign In"**
2. Enter any email/password (demo mode)
3. Dashboard opens → Click **"New Project"**
4. Drag **Container** onto canvas
5. Drag **Text** and **Button** inside container
6. Click **"Generate Code"** button
7. AI creates complete project
8. Click **"Preview"** to see it live
9. Click **"Export"** to download ZIP

🎉 You just built your first app!

---

## 📊 Dashboard Features

### Dynamic Notifications System

Intelligent notification system that tracks all your activities:

**Notification Types:**
- ✅ **Success** - Project created, code generated, settings saved
- ℹ️ **Info** - Project opened, page navigation, updates
- ⚠️ **Warning** - Deployment started, important actions
- ❌ **Error** - Failed operations, issues

**Features:**
- 💾 Persistent storage (survives refresh)
- ⏰ Timestamps on every notification
- 🔔 Smart badge counter (hides at 0)
- ✅ Mark as read (individual or bulk)
- 🗑️ Clear all notifications
- 📊 Auto-limit to 50 notifications

### Activity Tracking

Automatically tracks:
- 🔐 Login/logout events
- 📁 Project creation & opening
- 🏗️ Builder launches
- 🔧 API generation
- 🗄️ Model creation
- 🚀 Deployments
- 🤖 AI assistant usage (with milestones)
- 🧭 Page navigation
- 🔄 Return after 5+ minutes away

### Settings Management

- **My Projects** - Toggle project visibility
- **Backend Services** - Enable/disable backend features
- **Quick Enable All** - Activate all settings
- ⚡ Instant apply with persistence

---

## 🎨 Builder Guide

### Available Components

| Component | Icon | Description | Use Cases |
|-----------|------|-------------|-----------|
| **Container** | 📦 | Layout wrapper | Sections, cards, groups |
| **Text** | 📝 | Text content | Headings, paragraphs, labels |
| **Button** | 🔘 | Interactive CTA | Forms, actions, navigation |
| **Card** | 🎴 | Content container | Products, posts, profiles |
| **List** | 📋 | Vertical items | Menus, lists, navigation |
| **Grid** | 📐 | Responsive grid | Galleries, layouts, products |

### AI Assistant

Use natural language to generate code:

```
"Create a login form with email and password"
"Add a navigation bar with logo and menu"
"Generate a user registration API with JWT"
"Build a product gallery with cards"
"Style this button with gradient background"
"Create MongoDB schema for blog posts"
```

**AI Generates:**
- ✅ HTML structure
- ✅ CSS styling
- ✅ JavaScript functionality
- ✅ Express.js APIs
- ✅ Mongoose models
- ✅ JWT authentication

---

## 🔐 Authentication

### Login Page
- Email/Username authentication
- Password with toggle visibility
- "Remember Me" option
- Social login UI (Google, Apple, GitHub)
- **ColorBends** animated WebGL background
- Forgot password link

### Signup Page
- Username, Email/Phone fields
- Password with confirmation
- Terms acceptance
- Social signup UI
- **ColorBends** animated background

### Session Management
- localStorage-based (demo mode)
- Automatic session persistence
- Login time tracking
- Activity monitoring

---

## 🤖 AI Integration

### Setup OpenAI API

1. Get API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to `scripts/main.js`:
   ```javascript
   const OPENAI_API_KEY = 'sk-proj-xxxxx';
   ```
3. Test connection in builder

### API Features

- **Model**: GPT-3.5-turbo
- **Temperature**: 0.7 (creative but consistent)
- **Max Tokens**: 2000 (optimal for code generation)
- **Context-Aware**: Understands project structure
- **Fallback Responses**: Template responses if API unavailable

### Cost Estimation

- ~$0.001-$0.002 per request
- Average 500-1000 tokens per generation
- Fallback templates for common patterns

---

## 🛠️ Technologies

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)

### Backend & AI
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white)

### Features
- **Drag & Drop API** - Native HTML5
- **Three.js r128** - WebGL ColorBends animation
- **Lucide Icons** - Modern icon library
- **localStorage** - State persistence
- **Fetch API** - Async communication

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 90+ | ✅ Full |
| Firefox | 88+ | ✅ Full |
| Safari | 14+ | ✅ Full |
| Edge | 90+ | ✅ Full |
| IE 11 | - | ❌ Not supported |

**Requirements:**
- WebGL 1.0+ (for ColorBends)
- ES6+ JavaScript
- CSS Grid & Flexbox
- localStorage API

---

## 🎨 Customization

### Color Scheme

Edit `styles/main.css`:

```css
:root {
  --primary-color: #6366f1;      /* Indigo */
  --secondary-color: #8b5cf6;    /* Purple */
  --accent-color: #06b6d4;       /* Cyan */
  --bg-primary: #0f0f23;         /* Dark Navy */
  --text-primary: #ffffff;       /* White */
  --success: #10b981;            /* Green */
  --warning: #f59e0b;            /* Orange */
  --error: #ef4444;              /* Red */
}
```

### ColorBends Animation

Edit in `login.html` or `signup.html`:

```javascript
const colors = ["#ff5c7a", "#8a5cff", "#00ffd1"];
material.uniforms.uSpeed.value = 0.3;           // 0.1-1.0
material.uniforms.uScale.value = 1.2;           // 0.5-2.0
material.uniforms.uMouseInfluence.value = 0.8;  // 0.0-1.0
```

### Animation Speed

Edit `styles/animations.css`:

```css
:root {
  --transition-fast: 150ms;
  --transition-base: 250ms;
  --transition-slow: 350ms;
}
```

---

## 📊 Testing Checklist

### ✅ Landing & Auth
- [ ] Homepage loads correctly
- [ ] Navigation links work
- [ ] Login page displays
- [ ] Signup page displays
- [ ] ColorBends animates smoothly
- [ ] Form validation works
- [ ] Demo login successful

### ✅ Dashboard
- [ ] Dashboard loads after login
- [ ] Welcome notification appears
- [ ] Notification badge updates
- [ ] Mark as read works
- [ ] Settings persist
- [ ] AI Studio opens
- [ ] External links work

### ✅ Builder
- [ ] Components drag & drop
- [ ] Property editing works
- [ ] AI chat responds
- [ ] Code generation works
- [ ] Preview opens
- [ ] Export downloads

### ✅ Activity Tracking
- [ ] Login tracked
- [ ] Project actions tracked
- [ ] AI usage tracked
- [ ] Navigation tracked
- [ ] Persistence works

---

## 🐛 Troubleshooting

### Chat Not Responding?
1. Check API key in `scripts/main.js`
2. Click "Test API Connection"
3. Check browser console (F12)
4. Verify internet connection
5. Try fallback mode

### Notifications Not Appearing?
1. Check browser console
2. Clear localStorage: `localStorage.clear()`
3. Verify `dashboard.js` loaded
4. Refresh page

### Components Not Dragging?
1. Refresh page
2. Clear browser cache
3. Check console for errors
4. Try different browser

### ColorBends Not Showing?
1. Verify WebGL support
2. Check Three.js CDN loaded
3. Disable browser extensions
4. Check console for errors

---

## 🗺️ Roadmap

### ✅ Completed (v2.0)
- [x] Visual drag-and-drop builder
- [x] AI code generation (GPT-3.5)
- [x] User dashboard
- [x] Dynamic notifications
- [x] Activity tracking
- [x] Settings management
- [x] Authentication pages
- [x] ColorBends animations
- [x] Code preview & export
- [x] AI Studio integration
- [x] External integrations (Vercel, Figma)

### 🔜 Coming Soon (v3.0)
- [ ] Real OAuth integration
- [ ] Backend deployment automation
- [ ] Database hosting
- [ ] Version control (Git integration)
- [ ] Template marketplace
- [ ] Real-time collaboration
- [ ] Component marketplace
- [ ] Advanced AI prompts
- [ ] Team workspaces
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Mobile app

---

## 🎯 Use Cases

### 👨‍💼 For Entrepreneurs
- Rapid MVP prototyping
- Validate ideas without developers
- Investor-ready demos
- Quick iteration and pivoting

### 🏢 For Small Businesses
- Custom internal tools
- Client portals
- Landing pages
- Simple CRM systems

### 🎓 For Students
- Learn web development
- Build portfolio projects
- Experiment with ideas
- See professional code structure

### 🚀 For Non-Technical Founders
- Turn ideas into reality
- No coding knowledge needed
- Own your code
- Fast to production

---

## 📞 Support & Contributing

### Get Help
- 📖 Check this README
- 🐛 [Open an issue](https://github.com/amritesh-0/BuildLab/issues)
- 💬 Review browser console
- 🔍 Search existing issues

### Contributing
Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Credits & Acknowledgments

- **Design Inspiration**: bolt.new, v0.dev, Webflow
- **ColorBends**: Advanced WebGL shader animation
- **Three.js**: 3D graphics rendering library
- **OpenAI**: GPT-3.5-turbo for code generation
- **Lucide Icons**: Beautiful icon library

---

## 📈 Stats & Metrics

✅ **Zero coding knowledge required**  
✅ **AI generates functional code**  
✅ **Full-stack capabilities**  
✅ **Production-ready output**  
✅ **Smart activity tracking**  
✅ **Persistent notifications**  
✅ **Real-time updates**  
✅ **Beautiful UI/UX**

---

## 📝 Quick Commands

```bash
# Development
npm run dev                    # Start dev server
npm install                    # Install dependencies

# Alternatives
python -m http.server 3000    # Python server
npx http-server -p 3000       # Node server

# Access
http://localhost:3000/              # Landing page
http://localhost:3000/login.html    # Login
http://localhost:3000/dashboard.html # Dashboard
```

---

## 💾 localStorage Structure

```javascript
// Notifications
buildlab_notifications = [{
  id: "notif_1699564800123",
  title: "Welcome back!",
  message: "You logged in as john@example.com",
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
  email: "john@example.com",
  name: "John Doe",
  loginTime: "1699564800000"
}

// Activity
buildlab_last_login = "1699564800000"
ai_usage_count = "5"
```

---

<div align="center">

### 🎉 Ready to Build?

**Start creating at [http://localhost:3000](http://localhost:3000)**

[⬆ Back to Top](#-buildlab---ai-powered-no-code-platform)

</div>



