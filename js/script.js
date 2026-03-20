// Function to close the video modal
function closeVideo() {
    const modal = document.getElementById('videoModal');
    const video = modal.querySelector('video');
    modal.classList.remove('show');
    video.pause();
    video.currentTime = 0;
    // Don't clear the source - just pause it so it can be played again
}

// Stop all videos
function stopAllVideos() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
        video.src = '';
        video.load();
    });
}

// Function to play the video in a modal
function playVideo() {
    const modal = document.getElementById('videoModal');
    const video = modal.querySelector('video');
    modal.classList.add('show');
    // Play the video
    video.play();
}

// Stop video when user leaves the page
window.addEventListener('beforeunload', function() {
    stopAllVideos();
});

// Stop video when navigating away (using pagehide)
window.addEventListener('pagehide', function() {
    stopAllVideos();
});

// Stop video when page is hidden (tab switch, minimize, etc)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAllVideos();
    }
});

// Close video modal when clicking outside the video
window.addEventListener('click', function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeVideo();
    }
});

// Close video with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('videoModal');
        if (modal && modal.classList.contains('show')) {
            closeVideo();
        }
        const lightbox = document.getElementById('lightboxModal');
        if (lightbox && lightbox.classList.contains('show')) {
            closeLightbox();
        }
    }
});

// Lightbox functions for images
function openLightbox(imageSrc) {
    const modal = document.getElementById('lightboxModal');
    const img = document.getElementById('lightboxImage');
    if (modal) {
        img.src = imageSrc;
        modal.classList.add('show');
    }
}

function closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Handle contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Netlify will handle the submission, but we can add visual feedback
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
        });
    }
});
