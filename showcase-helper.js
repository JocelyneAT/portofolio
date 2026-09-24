/**
 * Celyne's Portfolio — Showcase Helper Engine
 * Lightbox viewer, clean audio toggle, and video controls
 */
document.addEventListener('DOMContentLoaded', () => {
  // 1. Audio toggle for in-page videos
  const audioToggleBtns = document.querySelectorAll('.audio-toggle-floating, .audio-toggle-btn');
  audioToggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target-video');
      const video = document.getElementById(targetId);
      if (!video) return;

      if (video.muted) {
        video.muted = false;
        video.play().catch(() => {});
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-volume-high"></i>';
        btn.setAttribute('title', 'Mute Sound');
      } else {
        video.muted = true;
        btn.classList.remove('active');
        btn.innerHTML = '<i class="fas fa-volume-xmark"></i>';
        btn.setAttribute('title', 'Unmute Sound');
      }
    });
  });

  // 2. Lightbox Zoom
  const lightbox = document.getElementById('cleanLightbox');
  const lightboxImg = document.getElementById('cleanLightboxImg');
  const closeBtn = document.getElementById('cleanLightboxClose');
  const zoomTriggers = document.querySelectorAll('[data-zoom-src]');

  if (lightbox && lightboxImg) {
    zoomTriggers.forEach(el => {
      el.addEventListener('click', () => {
        const src = el.getAttribute('data-zoom-src');
        if (src) {
          lightboxImg.src = src;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
      lightboxImg.src = '';
    };

    closeBtn?.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});
