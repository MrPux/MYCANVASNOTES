# MYCANVASNOTES

A collaborative learning platform that integrates with Canvas LMS to provide enhanced study tools, group learning features, and real-time collaboration capabilities.

## Features

- 🎓 **Group Learning** - Create study groups by major, class, and assignment
- 📚 **Independent Learning** - Access your Canvas classes with enhanced study tools
- 🎨 **Interactive Whiteboard** - Real-time collaborative whiteboard with drawing tools, shapes, and LaTeX equation support
- 💬 **Live Chat** - Communicate with study group members in real-time
- 📝 **Collaborative Documents** - Work together on notes and assignments
- 💻 **Code Editor** - Write, share, and execute JavaScript code in real-time (Python, Java, C++ coming soon)
- 📹 **Video Meetings** - Integrated video calls for virtual study sessions
- 🌓 **Dark/Light Mode** - Customizable theme preferences
- 🔄 **Pull-to-Refresh** - Beautiful liquid animation for syncing Canvas data

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm i

# Start the development server
npm run dev
```

## Technology Stack

### Core Framework & Build Tools
- **React** (^18.3.1) - JavaScript library for building user interfaces
- **React DOM** (^18.3.1) - React package for working with the DOM
- **Vite** - Lightning-fast build tool and development server
- **TypeScript** - Typed superset of JavaScript for better developer experience

### UI Component Library (shadcn/ui + Radix UI)
A comprehensive collection of accessible, unstyled UI primitives:
- **@radix-ui/react-accordion** - Collapsible content sections
- **@radix-ui/react-alert-dialog** - Modal dialogs for important actions
- **@radix-ui/react-avatar** - User profile pictures with fallbacks
- **@radix-ui/react-checkbox** - Accessible checkbox inputs
- **@radix-ui/react-collapsible** - Hide and show content
- **@radix-ui/react-context-menu** - Right-click menus
- **@radix-ui/react-dialog** - Modal overlays
- **@radix-ui/react-dropdown-menu** - Dropdown menus
- **@radix-ui/react-hover-card** - Popover card on hover
- **@radix-ui/react-label** - Form labels with accessibility
- **@radix-ui/react-menubar** - Application menu bar
- **@radix-ui/react-navigation-menu** - Navigation menus
- **@radix-ui/react-popover** - Floating content panels
- **@radix-ui/react-progress** - Progress indicators
- **@radix-ui/react-radio-group** - Radio button groups
- **@radix-ui/react-scroll-area** - Custom scrollable areas
- **@radix-ui/react-select** - Select dropdowns
- **@radix-ui/react-separator** - Visual dividers
- **@radix-ui/react-slider** - Range sliders
- **@radix-ui/react-switch** - Toggle switches
- **@radix-ui/react-tabs** - Tabbed interfaces
- **@radix-ui/react-toast** - Toast notifications
- **@radix-ui/react-toggle** - Toggle buttons
- **@radix-ui/react-toggle-group** - Toggle button groups
- **@radix-ui/react-tooltip** - Contextual tooltips

### Styling & Design System
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **tailwind-merge** (^2.6.0) - Utility for intelligently merging Tailwind CSS classes
- **tailwindcss-animate** (^1.0.7) - Animation utilities and keyframes for Tailwind
- **class-variance-authority** (^0.7.1) - Tool for creating variant-based component APIs
- **clsx** (^2.1.1) - Utility for constructing className strings conditionally
- **next-themes** (^0.3.0) - Theme management (dark/light mode) for React apps

### Routing
- **react-router-dom** (^6.30.1) - Declarative routing for React single-page applications

### Data Fetching & State Management
- **@tanstack/react-query** (^5.83.0) - Powerful data synchronization, caching, and state management for React

### Forms & Validation
- **react-hook-form** (^7.61.1) - Performant, flexible form validation library with minimal re-renders
- **@hookform/resolvers** (^3.10.0) - Validation resolvers for react-hook-form
- **zod** (^3.25.76) - TypeScript-first schema validation with static type inference

### Date & Time
- **date-fns** (^3.6.0) - Modern JavaScript date utility library
- **react-day-picker** (^8.10.1) - Flexible date picker component for React

### Icons & UI Utilities
- **lucide-react** (^0.462.0) - Beautiful, consistent icon library with 1000+ icons
- **cmdk** (^1.1.1) - Fast, composable command menu component
- **input-otp** (^1.4.2) - One-time password input component
- **sonner** (^1.7.4) - Opinionated toast notification library
- **vaul** (^0.9.9) - Unstyled drawer component for React

### Carousel & Media
- **embla-carousel-react** (^8.6.0) - Lightweight, extensible carousel library

### Charts & Data Visualization
- **recharts** (^2.15.4) - Composable charting library built with React and D3

### Whiteboard & Canvas Features
- **fabric** (^6.7.1) - Powerful HTML5 canvas library for creating and manipulating graphics, drawings, and interactive whiteboard features
  - Drawing tools (pencil, shapes, text)
  - Object manipulation (select, move, resize, rotate)
  - **Image insertion** - Load images from file uploads or URLs using `fabric.FabricImage.fromURL()`
  - Shape library (rectangle, circle, triangle, star, hexagon)
  - Right-click context menu for object duplication and deletion
  - Export/import capabilities
- **katex** (^0.16.22) - Fast math typesetting library for rendering LaTeX equations
- **@types/katex** (^0.16.7) - TypeScript definitions for KaTeX

### Video Conferencing
- **@daily-co/daily-js** (^0.84.0) - Daily.co video calling SDK for real-time video meetings and screen sharing

### Layout Components
- **react-resizable-panels** (^2.1.9) - Resizable panel components for creating flexible layouts

### Backend Integration
- **firebase** (^12.3.0) - Google's Backend-as-a-Service platform for authentication, real-time database, and cloud storage
  - Real-time collaborative features (cursor tracking, live updates)
  - Document synchronization
  - User authentication (ready to integrate)

## Project Structure

```
src/
├── components/
│   ├── ui/                      # Reusable shadcn/ui components
│   ├── CanvasAssignmentSelector.tsx  # Canvas assignment picker
│   ├── CircleMeeting.tsx        # Video meeting component
│   ├── FontToggle.tsx           # Font size controls
│   ├── LiquidRefresh.tsx        # Pull-to-refresh animation
│   ├── MeetingNotification.tsx  # Meeting alerts
│   ├── RichTextEditor.tsx       # Text editing component
│   └── ThemeToggle.tsx          # Dark/light mode toggle
├── hooks/
│   ├── use-mobile.tsx           # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
├── lib/
│   ├── canvasData.ts            # Canvas LMS mock data
│   ├── studyGroupData.ts        # Study group data management
│   └── utils.ts                 # Utility functions
├── pages/
│   ├── Index.tsx                # Landing page
│   ├── IndependentLearning.tsx  # Canvas classes view
│   ├── IndependentClassAssignments.tsx  # Canvas assignments
│   ├── GroupLearning.tsx        # Major selection
│   ├── MajorClasses.tsx         # Classes within major
│   ├── ClassAssignments.tsx     # Assignments within class
│   ├── AssignmentDetail.tsx     # Assignment details
│   ├── StudyRoom.tsx            # Collaborative study room
│   └── NotFound.tsx             # 404 page
├── App.tsx                      # Main application component with routing
├── main.tsx                     # Application entry point
└── index.css                    # Global styles, design tokens, and animations
```

## Key Features Implementation

### Liquid Pull-to-Refresh
Custom-built pull-to-refresh animation inspired by Flutter's liquid_pull_to_refresh package, featuring:
- Smooth liquid wave animations
- Works on both mobile (touch) and desktop (mouse)
- Programmatic trigger via sync button
- Threshold-based activation

### Collaborative Whiteboard
Real-time whiteboard powered by Fabric.js with:
- Multiple drawing tools (pencil, shapes, text)
- LaTeX equation rendering via KaTeX
- **Image insertion with dual input methods**:
  - File upload from local device
  - Direct URL insertion
  - Images are loaded using Fabric.js's `FabricImage.fromURL()` method
  - Supports all standard web image formats (JPG, PNG, GIF, WEBP, SVG)
  - Images can be scaled, rotated, and repositioned like any canvas object
- Shape library (rectangle, circle, triangle, star, hexagon)
- Object selection and manipulation
- Context menu for duplication and deletion
- Export/import functionality

### Code Editor with Execution
Collaborative code editor featuring:
- Multi-file support with file tree navigation
- Real-time code sharing across study room participants
- **JavaScript execution in browser** - Run code directly using `eval()`
- Console output display with error handling
- Code download functionality
- Syntax highlighting with dark mode theme
- **Note**: Currently only JavaScript is supported. Python, Java, C++, and TypeScript execution coming soon!

### Video Meetings
Integrated video conferencing using Daily.co:
- HD video and audio
- Screen sharing capabilities
- Meeting notifications
- Real-time participant tracking

### Data Management
LocalStorage-based data persistence for:
- Study groups organized by major/class/assignment
- Assignment tracking
- User preferences (theme, font size)

## Future Enhancements

- [ ] Full Canvas LMS API integration
- [ ] Real-time Firebase synchronization
- [ ] User authentication system
- [ ] Assignment submission to Canvas
- [ ] Multi-language code execution (Python, Java, C++, TypeScript) via code execution API
- [ ] Enhanced code editor with live collaboration cursors
- [ ] Mobile app with Capacitor
- [ ] AI-powered study tools

## Technical Notes

### Code Execution Security
The code editor currently uses JavaScript's `eval()` function for in-browser code execution. This approach:
- ✅ Works instantly without external dependencies
- ✅ Perfect for learning and collaboration
- ⚠️ Runs in the browser's sandbox environment
- ⚠️ Should not be used for executing untrusted code
- 🔜 Will be replaced with a secure code execution API for multi-language support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
-Anthony

## License

This project is open source and available under the MIT License.

