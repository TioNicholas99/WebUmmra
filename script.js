                    // Mobile Menu Toggle
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    const navMenu = document.querySelector('.nav-menu');
                    
                    mobileMenuBtn.addEventListener('click', () => {
                        navMenu.classList.toggle('active');
                    });
                    
                    // Smooth Scrolling
                    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                        anchor.addEventListener('click', function(e) {
                            e.preventDefault();
                            
                            const targetId = this.getAttribute('href');
                            const targetElement = document.querySelector(targetId);
                            
                            if (targetElement) {
                                window.scrollTo({
                                    top: targetElement.offsetTop - 70,
                                    behavior: 'smooth'
                                });
                                
                                // Close mobile menu if open
                                if (navMenu.classList.contains('active')) {
                                    navMenu.classList.remove('active');
                                }
                            }
                        });
                    });
                    
                    // Testimonial Slider
                    const testimonialContainer = document.querySelector('.testimonial-container');
                    const sliderDots = document.querySelectorAll('.slider-dot');
                    let currentSlide = 0;
                    
                    function showSlide(index) {
                        testimonialContainer.style.transform = `translateX(-${index * 100}%)`;
                        
                        sliderDots.forEach((dot, i) => {
                            dot.classList.toggle('active', i === index);
                        });
                        
                        currentSlide = index;
                    }
                    
                    sliderDots.forEach((dot, index) => {
                        dot.addEventListener('click', () => {
                            showSlide(index);
                        });
                    });
                    
                    // Auto rotate testimonials
                    setInterval(() => {
                        const nextSlide = (currentSlide + 1) % sliderDots.length;
                        showSlide(nextSlide);
                    }, 5000);
                    
                    // Form Submission
                    const contactForm = document.getElementById('contactForm');
                    
                    contactForm.addEventListener('submit', (e) => {
                        e.preventDefault();
                        
                        const formData = {
                            name: document.getElementById('name').value,
                            email: document.getElementById('email').value,
                            subject: document.getElementById('subject').value,
                            message: document.getElementById('message').value
                        };
                        
                        // Here you would normally send the form data to your server
                        // For demonstration purposes, we'll just show an alert
                        alert('Thank you for your message! We will contact you soon.');
                        contactForm.reset();
                    });
                    
                    // Sticky Header
                    window.addEventListener('scroll', () => {
                        const header = document.querySelector('header');
                        header.classList.toggle('sticky', window.scrollY > 0);
                    });
                    
                    // Scroll Reveal Animation (simple version)
                    window.addEventListener('scroll', revealElements);
                    
                    function revealElements() {
                        const elements = document.querySelectorAll('.service-card, .package-card, .gallery-item, .about-content, .contact-container');
                        
                        elements.forEach(element => {
                            const elementTop = element.getBoundingClientRect().top;
                            const windowHeight = window.innerHeight;
                            
                            if (elementTop < windowHeight - 100) {
                                element.style.opacity = '1';
                                element.style.transform = 'translateY(0)';
                            }
                        });
                    }
                    
                    // Initialize all elements with fade-in effect
                    document.addEventListener('DOMContentLoaded', () => {
                        const elements = document.querySelectorAll('.service-card, .package-card, .gallery-item, .about-content, .contact-container');
                        
                        elements.forEach(element => {
                            element.style.opacity = '0';
                            element.style.transform = 'translateY(30px)';
                            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                        });
                        
                        // Trigger initial reveal
                        revealElements();
                    });

                    document.addEventListener('DOMContentLoaded', function() {
    const mainVideoIframe = document.getElementById('main-video-iframe');
    const currentVideoTitle = document.getElementById('current-video-title');
    const currentVideoDesc = document.getElementById('current-video-desc');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const videoThumbnailsContainer = document.getElementById('video-thumbnails');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const sliderDots = document.querySelectorAll('.slider-dot');
    
    // Select a video when clicking on a thumbnail
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main video
            const videoId = this.getAttribute('data-video-id');
            const videoTitle = this.getAttribute('data-title');
            const videoDesc = this.getAttribute('data-desc');
            
            mainVideoIframe.src = `https://www.youtube.com/embed/${videoId}?rel=0`;
            currentVideoTitle.textContent = videoTitle;
            currentVideoDesc.textContent = videoDesc;
            
            // Update active dot
            sliderDots.forEach(dot => dot.classList.remove('active'));
            sliderDots[index].classList.add('active');
        });
    });
    
    // Handle slider dots
    sliderDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            thumbnails[index].click();
        });
    });
    
    // Navigate thumbnails with arrow buttons
    let scrollAmount = 0;
    const scrollStep = 290; // Thumbnail width + gap
    
    prevBtn.addEventListener('click', function() {
        scrollAmount = Math.max(scrollAmount - scrollStep, 0);
        videoThumbnailsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', function() {
        const maxScroll = videoThumbnailsContainer.scrollWidth - videoThumbnailsContainer.clientWidth;
        scrollAmount = Math.min(scrollAmount + scrollStep, maxScroll);
        videoThumbnailsContainer.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Prevent scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Sticky header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Handle touch events for gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        item.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
    
    // Improve slider performance on mobile
    const sliders = document.querySelectorAll('.testimonial-slider, .video-thumbnails');
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('touchend', () => {
            isDown = false;
        });
        
        slider.addEventListener('touchmove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            slider.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Adjust video container height on mobile
    function adjustVideoContainerHeight() {
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer && window.innerWidth <= 768) {
            const mainVideo = document.querySelector('.main-video');
            const thumbnails = document.querySelector('.video-thumbnails');
            const controls = document.querySelector('.video-controls');
            const title = document.querySelector('.video-title');
            const description = document.querySelector('.video-description');
            
            if (mainVideo && thumbnails) {
                let totalHeight = 0;
                
                if (mainVideo) totalHeight += mainVideo.offsetHeight;
                if (thumbnails) totalHeight += thumbnails.offsetHeight;
                if (controls) totalHeight += controls.offsetHeight;
                if (title) totalHeight += title.offsetHeight;
                if (description) totalHeight += description.offsetHeight;
                
                // Add some padding
                totalHeight += 80;
                
                videoContainer.style.minHeight = totalHeight + 'px';
            }
        }
    }
    
    // Run on load and resize
    window.addEventListener('load', adjustVideoContainerHeight);
    window.addEventListener('resize', adjustVideoContainerHeight);
});

 document.addEventListener('contextmenu', event => event.preventDefault());

  // Nonaktifkan tombol F12, Ctrl+Shift+I, Ctrl+U
  document.addEventListener('keydown', function(e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
    }
  });

  document.getElementById("konten").innerHTML = atob("SGFsbzogSmlrYSBhZGFsYWggdGFtcGlsIGxpaGF0Lg==");

  document.querySelector('.carousel-next').addEventListener('click', function() {
    document.querySelector('.artikel-carousel').scrollBy({
        left: 320,  // Geser sejauh 320px ke kanan
        behavior: 'smooth'
    });
});

document.querySelector('.carousel-prev').addEventListener('click', function() {
    document.querySelector('.artikel-carousel').scrollBy({
        left: -320, // Geser sejauh 320px ke kiri
        behavior: 'smooth'
    });
});
