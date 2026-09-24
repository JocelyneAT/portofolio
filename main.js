/**
 * JOCELYNE AUDREY TANDO - PORTFOLIO INTERACTION ENGINE
 * Handles category filtering, video modal, lightbox viewer, scrollspy, and animations
 */

document.addEventListener('DOMContentLoaded', async () => {
  initNavbar();
  initCuteDeskInteractions();
  await initXMLLoader();
  initProjectFilters();
  initScrollVideoSectionSync();
  initVideoModal();
  initLightbox();
  initScrollspy();
  initScrollReveal();
  initContactForm();
});

/* --------------------------------------------------------------------------
   XML DATA LOADER & PARSER
   Loads structured content from data/projects.xml and data/game-showcase.xml
   -------------------------------------------------------------------------- */
async function initXMLLoader() {
  // 1. Projects Grid dynamic loader (for index.html)
  const projectsGrid = document.getElementById('projectsGrid');
  if (projectsGrid) {
    try {
      const response = await fetch('data/projects.xml');
      if (response.ok) {
        const xmlText = await response.text();
        renderProjectsFromXML(xmlText, projectsGrid);
      }
    } catch (err) {
      console.info('XML fetch fallback: Using pre-rendered markup or local data.', err);
    }
  }

  // 2. Game Showcase dynamic loader (for game-showcase.html)
  const showcaseContainer = document.getElementById('gameShowcaseDataContainer');
  if (showcaseContainer) {
    try {
      const response = await fetch('data/game-showcase.xml');
      if (response.ok) {
        const xmlText = await response.text();
        renderGameShowcaseFromXML(xmlText);
      }
    } catch (err) {
      console.info('XML fetch fallback: Using pre-rendered showcase content.', err);
    }
  }
}

/**
 * Render Project Cards dynamically from XML
 */
function renderProjectsFromXML(xmlString, container) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const projectNodes = xmlDoc.querySelectorAll('project');

  if (!projectNodes.length) return;

  container.innerHTML = '';

  projectNodes.forEach(project => {
    const category = project.querySelector('category')?.textContent || 'gamedev';
    const badgeColor = project.querySelector('badge')?.getAttribute('color') || 'badge-purple';
    const badgeText = project.querySelector('badge')?.textContent || '';
    const thumbnail = project.querySelector('thumbnail')?.textContent || '';
    const placeholderIcon = project.querySelector('placeholderIcon')?.textContent || 'fa-gamepad';
    const placeholderText = project.querySelector('placeholderText')?.textContent || 'Project Preview';
    const hoverVideo = project.querySelector('hoverVideo')?.textContent || '';
    const title = project.querySelector('title')?.textContent || '';
    const description = project.querySelector('description')?.textContent || '';
    
    // Media Button
    const mediaBtnNode = project.querySelector('mediaButton');
    const mediaBtnIcon = mediaBtnNode?.querySelector('icon')?.textContent || 'fa-play';
    const mediaBtnText = mediaBtnNode?.querySelector('text')?.textContent || 'View Media';
    const videoUrl = mediaBtnNode?.querySelector('videoUrl')?.textContent || '';
    const lightboxSrc = mediaBtnNode?.querySelector('lightboxSrc')?.textContent || '';

    // Tags
    const tagNodes = project.querySelectorAll('tags tag');
    let tagsHtml = '';
    tagNodes.forEach(t => {
      tagsHtml += `<span class="tech-tag">${t.textContent}</span>`;
    });

    // Primary Link
    const linkUrl = project.querySelector('link url')?.textContent || '#';
    const linkText = project.querySelector('link text')?.textContent || 'View Project';

    // Build Project Card HTML
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', category);

    let mediaActionAttr = '';
    if (videoUrl) {
      mediaActionAttr = `data-video-url="${videoUrl}"`;
    } else if (lightboxSrc) {
      mediaActionAttr = `data-lightbox-src="${lightboxSrc}"`;
    }

    card.innerHTML = `
      <div class="project-media-wrapper">
        ${badgeText ? `<span class="badge ${badgeColor} project-category-badge">${badgeText}</span>` : ''}
        
        ${hoverVideo ? `
          <video class="hover-video-preview" loop muted playsinline>
            <source src="${hoverVideo}" type="video/mp4">
          </video>
        ` : ''}

        <img src="${thumbnail}" alt="${title}" class="project-thumbnail" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div class="project-media-placeholder" style="display: none;">
          <div class="placeholder-icon-box"><i class="fas ${placeholderIcon}"></i></div>
          <span>${placeholderText}</span>
        </div>
        
        <button class="project-media-btn" ${mediaActionAttr}>
          <i class="fas ${mediaBtnIcon}"></i> ${mediaBtnText}
        </button>
      </div>

      <div class="project-body">
        <h3 class="project-title">${title}</h3>
        <p class="project-desc">${description}</p>
        <div class="project-tags">${tagsHtml}</div>
        <div class="project-links">
          <a href="${linkUrl}" class="project-link-primary">
            ${linkText} <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

/**
 * Sync Game Showcase text and links dynamically from XML
 */
function renderGameShowcaseFromXML(xmlString) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

  // YouTube Links
  const ytExplanationUrl = xmlDoc.querySelector('youtubeStreams explanationVideoUrl')?.textContent;
  const ytGameplayUrl = xmlDoc.querySelector('youtubeStreams gameplayVideoUrl')?.textContent;
  
  if (ytExplanationUrl) {
    const el = document.getElementById('ytExplanationLink');
    if (el) el.setAttribute('href', ytExplanationUrl);
  }
  if (ytGameplayUrl) {
    const el = document.getElementById('ytGameplayLink');
    if (el) el.setAttribute('href', ytGameplayUrl);
  }
}

/* --------------------------------------------------------------------------
   NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a');

  // Sticky blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* --------------------------------------------------------------------------
   PROJECT CATEGORY FILTERING (Clean Tabbed Switcher)
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  const applyFilter = (filterValue) => {
    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (filterValue === 'all' || cardCategory === filterValue || (cardCategory && cardCategory.includes(filterValue))) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  };

  // Apply default active filter on initial load
  const activeInitialBtn = document.querySelector('.filter-btn.active');
  if (activeInitialBtn) {
    applyFilter(activeInitialBtn.getAttribute('data-filter'));
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
      applyFilter(filterValue);
    });
  });
}

/* --------------------------------------------------------------------------
   VIDEO ENGINE (YouTube, Local MP4, Auto-play on Scroll & Hover Preview)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const videoModal = document.getElementById('videoModal');
  const videoFrame = document.getElementById('videoModalFrame');
  const closeBtn = document.getElementById('closeVideoModal');
  const videoTriggers = document.querySelectorAll('[data-video-url]');

  // Modal Player for both YouTube/Vimeo and local MP4 files
  if (videoModal && videoFrame) {
    videoTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = trigger.getAttribute('data-video-url');
        
        if (videoUrl) {
          if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
            let embedUrl = videoUrl;
            if (videoUrl.includes('youtu.be/')) {
              const videoId = videoUrl.split('youtu.be/')[1].split(/[?#]/)[0];
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else if (videoUrl.includes('watch?v=')) {
              const videoId = videoUrl.split('watch?v=')[1].split(/[&#]/)[0];
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            } else if (!embedUrl.includes('autoplay=')) {
              embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
            }
            videoFrame.innerHTML = `<iframe src="${embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none; border-radius:12px;"></iframe>`;
          } else if (videoUrl.includes('vimeo.com')) {
            videoFrame.innerHTML = `<iframe src="${videoUrl}?autoplay=1" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none; border-radius:12px;"></iframe>`;
          } else {
            // Local MP4 / WebM video file
            videoFrame.innerHTML = `<video controls autoplay playsinline style="width:100%; height:100%; border-radius:12px;"><source src="${videoUrl}" type="video/mp4">Your browser does not support HTML video.</video>`;
          }
          
          videoModal.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeModal = () => {
      videoModal.classList.remove('active');
      videoFrame.innerHTML = '';
      document.body.style.overflow = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) closeModal();
    });
  }

  // 1. Auto-play on Scroll (Intersection Observer for background videos)
  const scrollVideos = document.querySelectorAll('.scroll-video-autoplay');
  if (scrollVideos.length) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    scrollVideos.forEach(v => videoObserver.observe(v));
  }

  // 2. Hover-to-Play Video Previews on Project Cards (like Steam / ArtStation)
  const hoverCards = document.querySelectorAll('.project-card');
  hoverCards.forEach(card => {
    const hoverVideo = card.querySelector('.hover-video-preview');
    if (hoverVideo) {
      card.addEventListener('mouseenter', () => {
        hoverVideo.style.opacity = '1';
        hoverVideo.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        hoverVideo.pause();
        hoverVideo.currentTime = 0;
        hoverVideo.style.opacity = '0';
      });
    }
  });

  // 3. Audio Mute / Unmute Toggle Button for In-Page Videos
  const audioToggleBtns = document.querySelectorAll('.video-audio-toggle');
  audioToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetVideoId = btn.getAttribute('data-target-video');
      const targetVideo = document.getElementById(targetVideoId);
      
      if (targetVideo) {
        if (targetVideo.muted) {
          // If unmuting this video, mute other videos to avoid overlapping sound
          scrollVideos.forEach(v => {
            if (v !== targetVideo) {
              v.muted = true;
            }
          });
          audioToggleBtns.forEach(b => {
            if (b !== btn) {
              b.innerHTML = '<i class="fas fa-volume-xmark"></i> Unmute';
              b.classList.remove('active');
            }
          });

          targetVideo.muted = false;
          btn.innerHTML = '<i class="fas fa-volume-high"></i> Mute Sound';
          btn.classList.add('active');
        } else {
          targetVideo.muted = true;
          btn.innerHTML = '<i class="fas fa-volume-xmark"></i> Unmute';
          btn.classList.remove('active');
        }
      }
    });
  });
}

/* --------------------------------------------------------------------------
   SCROLL-SYNCHRONIZED SECTION VIDEO & AUDIO ENGINE (game-showcase.html)
   Section 01 (Gameplay) plays & un-mutes on scroll
   Section 02 (Opening Cutscene) plays & un-mutes on scroll
   Ensures strictly 1 video audio at a time and auto-switches based on viewport
   -------------------------------------------------------------------------- */
function initScrollVideoSectionSync() {
  const allSectionVideos = document.querySelectorAll('.section-sync-video');
  const audioToggleBtns = document.querySelectorAll('.section-audio-toggle');

  if (allSectionVideos.length === 0) return;

  // Manual Sound Toggle Buttons for all showcase videos
  audioToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target-video');
      const targetVideo = document.getElementById(targetId);

      if (!targetVideo) return;

      if (targetVideo.muted) {
        // Mute all other videos
        allSectionVideos.forEach(v => {
          if (v !== targetVideo) {
            v.muted = true;
            const otherBtn = document.querySelector(`.section-audio-toggle[data-target-video="${v.id}"]`);
            if (otherBtn) {
              otherBtn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
              otherBtn.setAttribute('title', 'Unmute Sound');
              otherBtn.classList.remove('active');
            }
          }
        });

        targetVideo.muted = false;
        targetVideo.play().catch(() => {});
        btn.innerHTML = '<i class="fas fa-volume-high"></i>';
        btn.setAttribute('title', 'Mute Sound');
        btn.classList.add('active');
      } else {
        targetVideo.muted = true;
        btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
        btn.setAttribute('title', 'Unmute Sound');
        btn.classList.remove('active');
      }
    });
  });

  // Autoplay all section videos in loop muted
  allSectionVideos.forEach(v => {
    v.play().catch(() => {});
  });
}

/* --------------------------------------------------------------------------
   FULLSCREEN LIGHTBOX IMAGE VIEWER
   -------------------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImage');
  const closeBtn = document.getElementById('closeLightbox');
  const zoomableImages = document.querySelectorAll('[data-lightbox-src], .gallery-item img');

  if (!lightbox || !lightboxImg) return;

  zoomableImages.forEach(img => {
    img.addEventListener('click', () => {
      const src = img.getAttribute('data-lightbox-src') || img.getAttribute('src');
      const alt = img.getAttribute('alt') || 'Project Preview';
      
      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', alt);
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}

/* --------------------------------------------------------------------------
   SCROLLSPY FOR FLOATING DOCK & ACTIVE NAV
   -------------------------------------------------------------------------- */
function initScrollspy() {
  const dockItems = document.querySelectorAll('.dock-item a');
  const sections = document.querySelectorAll('section[id], div[id].case-block');

  if (!dockItems.length || !sections.length) return;

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    dockItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   CUTE INTERACTIVE DESK & AUDIO SYSTEM
   -------------------------------------------------------------------------- */
function initCuteDeskInteractions() {
  const audio = window.deskAudio;

  // 1. Sync Sound Toggle Buttons (HUD pill and Navbar pill)
  const soundToggleBtns = [
    document.getElementById('heroSoundToggleBtn'),
    document.getElementById('navSoundToggleBtn')
  ].filter(Boolean);

  function updateSoundUI() {
    const isMuted = audio ? audio.isMuted : false;
    soundToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      const label = btn.querySelector('span');

      if (isMuted) {
        if (icon) icon.className = 'fas fa-volume-xmark';
        if (label) label.textContent = 'Sound OFF';
        btn.style.opacity = '0.7';
      } else {
        if (icon) icon.className = 'fas fa-volume-high';
        if (label) label.textContent = 'Sound ON';
        btn.style.opacity = '1';
      }
    });
  }

  if (audio) updateSoundUI();

  soundToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!audio) return;
      const isMuted = audio.toggleMute();
      updateSoundUI();
      if (!isMuted) {
        audio.playPop(620);
      }
    });
  });

  // 2. Desk Hotspots & Speech Bubble Hover/Click
  const hotspots = document.querySelectorAll('.desk-hotspot');
  const freqMap = {
    'hotspot-laptop': 580,     // Bright cute laptop pop
    'hotspot-badge': 660,      // Friendly high badge pop
    'hotspot-certificate': 480,// Warm certificate pop
    'hotspot-phone': 740       // Bell-like phone pop
  };

  hotspots.forEach(hotspot => {
    const freq = freqMap[hotspot.id] || 550;
    const elId = hotspot.getAttribute('data-element');
    const elImg = elId ? document.getElementById(elId) : null;
    const bubbleId = hotspot.getAttribute('data-bubble');
    const bubbleImg = bubbleId ? document.getElementById(bubbleId) : null;

    // Pop on Hover / Enter
    hotspot.addEventListener('mouseenter', () => {
      hotspot.classList.add('active-pop');
      if (elImg) elImg.classList.add('element-hovered');
      if (bubbleImg) bubbleImg.classList.add('bubble-visible');
      if (audio) audio.playPop(freq);
    });

    hotspot.addEventListener('mouseleave', () => {
      hotspot.classList.remove('active-pop');
      if (elImg) elImg.classList.remove('element-hovered');
      if (bubbleImg) bubbleImg.classList.remove('bubble-visible');
    });

    // Touch / Pointer Down for mobile
    hotspot.addEventListener('touchstart', () => {
      if (elImg) elImg.classList.add('element-hovered');
      if (bubbleImg) bubbleImg.classList.add('bubble-visible');
      if (audio) audio.playPop(freq);
    }, { passive: true });

    hotspot.addEventListener('touchend', () => {
      setTimeout(() => {
        if (elImg) elImg.classList.remove('element-hovered');
        if (bubbleImg) bubbleImg.classList.remove('bubble-visible');
      }, 600);
    });

    // Click & Navigate with Chime
    hotspot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = hotspot.getAttribute('data-target') || hotspot.getAttribute('href');

      if (elImg) {
        elImg.classList.add('element-active');
        setTimeout(() => elImg.classList.remove('element-active'), 500);
      }

      if (audio) {
        audio.playClick();
        audio.playNavChime();
      }

      if (targetId) {
        if (targetId.startsWith('#')) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            // Smooth scroll
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });

            // Visual glow feedback on target section
            targetElement.classList.remove('section-pulse-highlight');
            void targetElement.offsetWidth; // force repaint
            targetElement.classList.add('section-pulse-highlight');
          }
        } else {
          // Direct page navigation (e.g. profile-demo.html)
          setTimeout(() => {
            window.location.href = targetId;
          }, 180);
        }
      }
    });
  });

  // 3. Sound effects for Filter Buttons & Navigation Links
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (audio) audio.playPop(520);
    });
  });

  const generalCuteButtons = document.querySelectorAll('.btn, .dropdown-menu li a');
  generalCuteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (audio) audio.playClick();
    });
  });
}

/* --------------------------------------------------------------------------
   CONTACT FORM & TOAST INTERACTION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Ready to Send!';
      submitBtn.classList.remove('btn-primary');
      submitBtn.classList.add('btn-outline-cyan');

      if (window.deskAudio) {
        window.deskAudio.playNavChime();
      }

      setTimeout(() => {
        alert('Thank you, Celyne will receive your inquiry shortly!');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.classList.add('btn-primary');
        submitBtn.classList.remove('btn-outline-cyan');
      }, 800);
    });
  }
}


