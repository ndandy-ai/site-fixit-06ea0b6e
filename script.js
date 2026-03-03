document.addEventListener('DOMContentLoaded', () => {

    // --- Header Scroll Effect ---
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Navigation ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // --- SPA Page Navigation ---
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            
            // Hide all pages and remove active classes
            pages.forEach(page => page.classList.remove('active'));
            navLinks.forEach(navLink => navLink.classList.remove('active'));

            // Show target page and set active link
            const targetPage = document.getElementById(targetId);
            if (targetPage) {
                targetPage.classList.add('active');
                link.classList.add('active');
                window.scrollTo(0, 0);
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                hamburgerBtn.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // --- Scroll-triggered Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: stop observing once visible
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach(el => observer.observe(el));

    // --- Testimonial Carousel ---
    const slidesContainer = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentIndex = 0;

    function updateCarousel() {
        slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex === 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = (currentIndex - 1) % slides.length;
        }
        updateCarousel();
    });
    
    // Auto-play carousel
    setInterval(() => {
        nextBtn.click();
    }, 5000);

    // --- Contact Form Validation ---
    const form = document.getElementById('booking-form');
    const successMessage = document.getElementById('form-success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateForm()) {
            // In a real app, you would send the data to a server here.
            successMessage.textContent = 'Thank you! Your booking request has been sent.';
            successMessage.style.opacity = '1';
            form.reset();
            setTimeout(() => { successMessage.style.opacity = '0'; }, 5000);
        }
    });

    function validateForm() {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            const formGroup = input.parentElement;
            const errorMsg = formGroup.querySelector('.error-message');
            formGroup.classList.remove('error');
            input.classList.remove('invalid');

            if (input.type === 'email') {
                const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(input.value.trim())) {
                    isValid = false;
                    formGroup.classList.add('error');
                    input.classList.add('invalid');
                    errorMsg.textContent = 'Please enter a valid email address.';
                }
            } else if (input.value.trim() === '') {
                isValid = false;
                formGroup.classList.add('error');
                input.classList.add('invalid');
                errorMsg.textContent = 'This field is required.';
            }
        });

        return isValid;
    }
});