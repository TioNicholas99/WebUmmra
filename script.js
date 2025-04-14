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