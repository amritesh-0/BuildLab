# 🚀 BuildLab - AI-Powered No-Code Platform

> **Empowering product builders with the most powerful coding agents**

BuildLab is a modern, AI-powered platform that enables non-technical users to create and deploy full-stack web applications using drag-and-drop tools combined with AI-assisted code generation.

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [How to Use](#-how-to-use)
- [Authentication](#-authentication)
- [API Configuration](#-api-configuration)
- [Browser Support](#-browser-support)
- [Customization](#-customization)
- [Troubleshooting](#-troubleshooting)

---

## ✨ Features

### Core Functionality
- **🎨 Visual Canvas Builder**: Intuitive drag-and-drop interface for UI design
- **🤖 AI Code Generation**: Production-ready code generation powered by OpenAI GPT-3.5-turbo
- **⚙️ Backend Builder**: Create Node.js/Express APIs with MongoDB integration
- **👁️ Instant Preview**: Real-time preview of your application
- **📦 One-Click Export**: Download complete project files
- **🔐 Authentication System**: JWT-based user authentication generation
- **💬 AI Chat Assistant**: Context-aware real-time help and code suggestions

### Components Available
- Container
- Text
- Button
- Card
- List
- Grid

### Generated Code Includes
- HTML5 structure
- Modern CSS3 styling
- Vanilla JavaScript functionality
- Node.js/Express backend (optional)
- MongoDB database schemas (optional)
- JWT authentication (optional)

---

## 🚀 Quick Start

### Installation

1. **Clone or Download** the project
2. **Navigate** to the project directory
3. **Start** a local server:

```bash
# Using npm (recommended)
npm run dev

# Or using Python
python -m http.server 3000

# Or using Node.js
npx http-server -p 3000
```

4. **Open** your browser to `http://localhost:3000`

### First Steps

1. Click **"Get Started Now"** or **"Sign In"**
2. Login with any credentials (demo mode)
3. **Builder opens automatically**
4. Start dragging components!

---

## 📁 Project Structure

```
web tech/
├── index.html              # Main landing page & builder interface
├── login.html              # Login page with ColorBends animation
├── signup.html             # Signup page with ColorBends animation
├── package.json            # npm configuration
├── styles/
│   ├── main.css           # Core styles and components
│   └── animations.css     # Animation definitions
├── scripts/
│   ├── main.js            # Main application logic & AI integration
│   └── GhostCursor.js     # Cursor trail effect
├── assets/
│   └── favicon.png        # Site favicon
└── README.md              # This file
```

---

## 🛠️ Technologies

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Modern styling with custom properties
- **Vanilla JavaScript**: Zero dependencies for core functionality
- **Three.js r128**: WebGL rendering for ColorBends background
- **Drag & Drop API**: Native HTML5 drag-and-drop

### Backend & AI
- **OpenAI GPT-3.5-turbo**: AI code generation
- **Fetch API**: Async API communication
- **LocalStorage**: Session management

### Design
- **ColorBends**: Fluid animated gradient backgrounds
- **Glassmorphism**: Modern UI design
- **Custom Animations**: Smooth transitions throughout

---

## 💡 How to Use

### Building Your First App

1. **Start Building**
   - Click "Sign In" or "Get Started Now"
   - Login with any email/password

2. **Configure Project**
   - Set project name
   - Toggle Backend API (Node.js/Express)
   - Toggle Database (MongoDB)
   - Toggle Authentication (JWT)

3. **Design Interface**
   - Drag components from sidebar
   - Drop onto canvas
   - Click to edit properties

4. **Use AI Assistant**
   ```
   "Create a login form with email and password"
   "Add a navigation bar with logo"
   "Generate a user registration API"
   "Create a product card grid"
   ```

5. **Generate Code**
   - Click "📝 Generate Code" button
   - AI creates complete code
   - View in chat window

6. **Preview & Export**
   - Click "👁️ Preview" to see live demo
   - Click "💾 Export Code" to download
   - Get complete project structure

### Example Workflows

#### Simple Landing Page
```
1. Drag Container → Canvas
2. Drag Text → Inside container (heading)
3. Drag Button → Inside container
4. Generate Code
5. Preview!
```

#### Full-Stack App
```
1. Enable Backend + Database + Auth
2. Chat: "Create user management system"
3. Drag form components
4. Generate Code
5. Get: Frontend + API + Database + Auth
```

---

## 🔐 Authentication

### Login Page
- **URL**: `/login.html`
- **Features**:
  - Email/Username login
  - Password authentication
  - "Remember Me" option
  - Social login UI (Google, Apple, GitHub)
  - ColorBends animated background
  - Forgot password link
  - Sign up redirect

### Signup Page
- **URL**: `/signup.html`
- **Features**:
  - Username, Email/Phone, Password fields
  - Confirm password validation
  - Social signup UI
  - ColorBends animated background
  - Login redirect

### Session Management
- Uses `localStorage` for demo
- Stores user data on login
- Auto-redirects if logged in
- Logout clears session

---

## 🔑 API Configuration

### OpenAI API Key

Located in `scripts/main.js`:

```javascript

### Testing API Connection

In the builder, click **"🔑 Test API Connection"** to verify the key is working.

### Fallback Mode

If API fails, the system has template responses for common queries:
- Login forms
- Contact forms
- Navigation bars
- Button creation

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

- [ ] Homepage loads correctly
- [ ] "Sign In" button → login page
- [ ] "Get Started Now" → login page
- [ ] Login with any credentials works
- [ ] Builder opens after login
- [ ] Components drag to canvas
- [ ] AI chat responds
- [ ] Generate Code works
- [ ] Preview opens in new window
- [ ] Export downloads file
- [ ] Signup page accessible
- [ ] ColorBends animates smoothly

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

### 🔜 Coming Soon
- Real OAuth integration
- Backend deployment
- Database hosting
- Version control
- Template marketplace
- Collaboration features
- Advanced AI prompts
- Component customization

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
http://localhost:3000/           # Homepage
http://localhost:3000/login.html # Login
http://localhost:3000/signup.html # Signup
```

---

**Ready to build? Start at http://localhost:3000** 🚀
