# Asset Folder Structure & Replacement Guide

Welcome to your portfolio asset directory! Here is where you can easily drop your photos, videos, and project screenshots.

## 📁 Folder Directory

```
assets/
├── images/
│   ├── profile.jpg          <- Your profile picture for the Hero section
│   ├── reel-cover.jpg       <- Cover thumbnail for your Cinematics Video Reel
│   ├── project1.jpg         <- Thumbnail for Game Development (e.g. PC Game / Cutscene)
│   ├── project2.jpg         <- Thumbnail for Multiplayer / Board Game
│   ├── project3.jpg         <- Thumbnail for UI/UX Mobile App
│   ├── project4.jpg         <- Thumbnail for 3D Environment & Props
│   ├── project5.jpg         <- Thumbnail for 2D/3D Animation Short
│   └── project6.jpg         <- Thumbnail for Frontend Web Experience
│
├── videos/
│   ├── game-reel.mp4        <- (Optional) Local MP4 video file for your reel
│   └── cutscenes.mp4        <- (Optional) Local MP4 video for in-game cutscenes
│
└── documents/
    └── Resume_Jocelyne_Audrey_Tando.pdf <- Your resume PDF for the download button
```

## 🎬 How to embed YouTube / Vimeo videos instead of local files:
In `index.html` or `game-showcase.html`, simply find any element with `data-video-url="..."` and paste your YouTube embed URL (e.g. `https://www.youtube.com/embed/YOUR_VIDEO_ID`). The built-in player modal will automatically load and play it in full screen!
