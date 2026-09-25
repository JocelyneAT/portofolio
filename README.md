# Jocelyne Audrey Tando — Digital Media Technology & Game Dev Portfolio

Welcome to your custom portfolio website! Built with modern Vanilla HTML5, CSS3, and JavaScript, designed with an exquisite **"Cosmic Aurora & Cyber-Editorial"** aesthetic (Dark Velvet, Electric Violet, and Aurora Cyan).

---

## 🌟 What's Included

1. **`index.html` (Main Hub)**
   - **Fixed Glassmorphism Header**: Brand mark (`JAT.`), interactive category dropdown, and quick contact action.
   - **Hero Section**: Personalized for **Jocelyne Audrey Tando**, Bachelor of Engineering in Digital Media Technology (Xiamen University Malaysia, 2027), animated specialty badges, resume download trigger, and floating status cards.
   - **About Section & Live Stats**: Academic journey at XMUM, multi-disciplinary mindset, and key stats.
   - **Cinematics & Animation Reel Spotlight**: Full-width interactive cinematic banner with a modal video player for cutscenes and trailers.
   - **Interactive Filterable Projects Showcase**: Categorized filter tabs:
     - 🎮 *Game Dev & Cutscenes* (PC Games, Mobile Games, Multiplayer, Board Games, Cutscenes)
     - 📱 *UI/UX & Frontend* (Mobile App Design, Web Apps, Interactive Prototypes)
     - 🧊 *3D Modeling & Environment* (Assets, Props, Atmospheric Levels)
     - ✨ *2D & 3D Animation* (Motion Graphics, Narrative Shorts, Storyboards)
   - **Skills & Toolset Matrix**: Categorized tech stacks (Unity, Unreal, C++, JavaScript, React, Figma, Blender, Maya, Premiere, After Effects).
   - **Education & Experience Timeline**: Academic milestones at Xiamen University Malaysia.
   - **Direct Contact & Social Footer**: Inquiry form and social links.

2. **`game-showcase.html` (Game Dev & Cutscene Case Study Template)**
   - Tailored specifically for 3D Game Development and in-game cinematics.
   - Includes floating 5-step quick dock (`01 Overview`, `02 Gameplay Trailer`, `03 Cutscenes & Story`, `04 C++ Mechanics`, `05 3D Environment`).
   - Integrated full-screen lightbox image zoom and video player modal.

3. **`project-detail.html` (UI/UX & Mobile App Case Study Template)**
   - Tailored for Mobile App Design and Frontend Systems.
   - Includes floating 5-step quick dock (`01 Problem Statement`, `02 User Research`, `03 Wireframes`, `04 Design System & High-Fi UI`, `05 Interactive Prototype`).
   - Integrated full-screen lightbox image zoom.

4. **`style.css` & `main.js`**
   - Full responsive design system with CSS custom properties.
   - Filter logic with smooth animations.
   - Built-in video player modal (supports YouTube, Vimeo, and local MP4 videos).
   - Built-in lightbox for full-resolution screenshots.
   - Scrollspy for floating side navigation docks.

---

## 🚀 How to Run Locally

You can simply double-click `index.html` to open it in any web browser, or serve it with any live server (e.g. VS Code Live Server extension or Python `python -m http.server 3000`).

---

## 🎨 How to Customize & Edit Writings

All writings, project descriptions, introductions, and video links are organized into structured **XML data files** in the `data/` folder for quick, tidy editing without digging through HTML:

1. **`data/projects.xml`**: Edit all project cards (titles, descriptions, tags, video URLs, and badges).
2. **`data/game-showcase.xml`**: Edit *Runaway Timmy* writings (Hero title, introduction, story synopsis, video captions, and YouTube links).
3. **`data/site-content.xml`**: Edit profile tagline, About bio, statistics, and skill lists.
4. **Colors & Styles**: Edit `:root` variables in [style.css](file:///d:/PORTOFOLIO%20WEBSITTE/style.css).
5. **Media Files**: Place videos and pictures in `assets/videos_showcase/` and `assets/images/`.
