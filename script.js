// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Testimonials Slider
let slideIndex = 1;
showSlide(slideIndex);

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].classList.add('active');
    }
    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].classList.add('active');
    }
}

// Auto-advance testimonials
setInterval(() => {
    slideIndex++;
    showSlide(slideIndex);
}, 5000);

// Course Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const courseCards = document.querySelectorAll('.course-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        courseCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Portfolio Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        button.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Simple validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Simulate form submission
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.service-card, .course-card, .team-member, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for statistics (if you want to add stats)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Course registration button handling
document.querySelectorAll('.course-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const courseCard = e.target.closest('.course-card');
        const courseName = courseCard.querySelector('h3').textContent;
        const courseDescription = courseCard.querySelector('p').textContent;
        const courseDuration = courseCard.querySelector('.duration').textContent;
        const courseLevel = courseCard.querySelector('.level').textContent;
        const courseInstructor = courseCard.querySelector('.course-instructor span').textContent;
        
        openRegistrationModal(courseName, courseDescription, courseDuration, courseLevel, courseInstructor);
    });
});

// Registration Modal Functions
function openRegistrationModal(courseName, courseDescription, courseDuration, courseLevel, courseInstructor) {
    const modal = document.getElementById('registrationModal');
    const selectedCourseName = document.getElementById('selectedCourseName');
    const selectedCourseDetails = document.getElementById('selectedCourseDetails');
    
    selectedCourseName.textContent = courseName;
    selectedCourseDetails.textContent = `${courseDescription} | ${courseDuration} | ${courseLevel} | Instructor: ${courseInstructor}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Set minimum date to today
    const startDateInput = document.getElementById('startDate');
    const today = new Date().toISOString().split('T')[0];
    startDateInput.min = today;
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset form
    document.getElementById('registrationForm').reset();
    hideFormMessage();
}

// Modal Event Listeners
document.getElementById('closeModal').addEventListener('click', closeRegistrationModal);
document.getElementById('cancelRegistration').addEventListener('click', closeRegistrationModal);

// Close modal when clicking outside
document.getElementById('registrationModal').addEventListener('click', (e) => {
    if (e.target.id === 'registrationModal') {
        closeRegistrationModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('registrationModal');
        if (modal.classList.contains('active')) {
            closeRegistrationModal();
        }
    }
});

// Registration Form Handling
document.getElementById('registrationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    try {
        // Get form data
        const formData = new FormData(e.target);
        const registrationData = {
            course: document.getElementById('selectedCourseName').textContent,
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            age: formData.get('age'),
            education: formData.get('education'),
            field: formData.get('field'),
            experience: formData.get('experience'),
            currentRole: formData.get('currentRole'),
            motivation: formData.get('motivation'),
            schedule: formData.get('schedule'),
            startDate: formData.get('startDate'),
            questions: formData.get('questions'),
            newsletter: formData.get('newsletter') === 'on',
            consultation: formData.get('consultation') === 'on'
        };
        
        // Validate required fields
        if (!registrationData.fullName || !registrationData.phone || !registrationData.email || !registrationData.motivation) {
            throw new Error('Please fill in all required fields.');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(registrationData.email)) {
            throw new Error('Please enter a valid email address.');
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\+]?[0-9\-\(\)\s]{10,}$/;
        if (!phoneRegex.test(registrationData.phone)) {
            throw new Error('Please enter a valid phone number.');
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Here you would typically send the data to your server
        console.log('Registration Data:', registrationData);
        
        // Show success message
        showFormMessage('success', `Thank you, ${registrationData.fullName}! Your registration for "${registrationData.course}" has been submitted successfully. We will contact you within 24 hours at ${registrationData.phone} or ${registrationData.email}.`);
        
        // Reset form after success
        setTimeout(() => {
            closeRegistrationModal();
        }, 3000);
        
    } catch (error) {
        console.error('Registration error:', error);
        showFormMessage('error', error.message);
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Form Message Functions
function showFormMessage(type, message) {
    hideFormMessage(); // Hide any existing message
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    
    const formElement = document.getElementById('registrationForm');
    formElement.insertBefore(messageDiv, formElement.firstChild);
    
    // Auto-hide error messages after 5 seconds
    if (type === 'error') {
        setTimeout(() => {
            hideFormMessage();
        }, 5000);
    }
}

function hideFormMessage() {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
}

// Form Enhancement: Auto-format phone number
document.getElementById('phone').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-digits
    if (value.length > 0) {
        // Format Pakistani phone numbers
        if (value.startsWith('92')) {
            value = '+' + value;
        } else if (value.startsWith('0')) {
            value = '+92' + value.substring(1);
        }
    }
    e.target.value = value;
});

// Form Enhancement: Dynamic field updates
document.getElementById('experience').addEventListener('change', (e) => {
    const currentRoleField = document.getElementById('currentRole');
    const value = e.target.value;
    
    if (value === 'beginner') {
        currentRoleField.placeholder = 'Student, Fresh Graduate, Career Changer, etc.';
    } else if (value === 'intermediate') {
        currentRoleField.placeholder = 'Junior Developer, Designer, etc.';
    } else if (value === 'advanced') {
        currentRoleField.placeholder = 'Senior Developer, Team Lead, Freelancer, etc.';
    }
});

// Podcast episode play button handling
document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
        alert('Podcast player would open here. This is a demo version.');
    });
});

// Community link handling
document.querySelectorAll('.community-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = e.currentTarget.querySelector('span').textContent;
        alert(`Join our ${platform} community! Link would redirect to the actual platform.`);
    });
});

// Job application handling
document.querySelectorAll('.job-item .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const jobTitle = e.target.closest('.job-item').querySelector('h4').textContent;
        alert(`Thank you for your interest in the "${jobTitle}" position! Please send your resume to labdigix@gmail.com with the job title in the subject line.`);
    });
});

// Career buttons handling
document.querySelectorAll('.career-category .btn').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const buttonText = e.target.textContent;
        if (buttonText.includes('Internship')) {
            alert('Thank you for your interest in our internship program! Please send your resume and cover letter to labdigix@gmail.com with "Internship Application" in the subject line.');
        } else if (buttonText.includes('Volunteer')) {
            alert('Thank you for your interest in volunteering! Please contact us at labdigix@gmail.com with "Volunteer Application" in the subject line.');
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-background');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add hover effects to cards
document.querySelectorAll('.service-card, .course-card, .team-member').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Add search functionality (if needed)
function searchCourses(query) {
    const courses = document.querySelectorAll('.course-card');
    const searchTerm = query.toLowerCase();
    
    courses.forEach(course => {
        const title = course.querySelector('h3').textContent.toLowerCase();
        const description = course.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            course.style.display = 'block';
        } else {
            course.style.display = 'none';
        }
    });
}

// Add newsletter subscription (if needed)
function subscribeNewsletter(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    
    alert('Thank you for subscribing to our newsletter!');
    return true;
}

// Performance optimization: Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Partnership functionality
document.addEventListener('DOMContentLoaded', () => {
    // Partnership opportunity buttons
    const partnershipButtons = document.querySelectorAll('.partnership-cta .btn');
    
    partnershipButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const buttonText = e.target.textContent;
            
            if (buttonText.includes('Explore Partnership')) {
                // Show partnership inquiry form or redirect
                alert('Thank you for your interest in partnering with DIGIX Lab! Please contact us at labdigix@gmail.com or call +92-335-5500771 to discuss partnership opportunities.');
            } else if (buttonText.includes('Download Partnership Brochure')) {
                // Simulate brochure download
                alert('Partnership brochure download will be available soon. For detailed information, please contact us at labdigix@gmail.com');
            }
        });
    });
    
    // Animate statistics on scroll
    const stats = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                const suffix = finalValue.replace(/[\d]/g, '');
                
                animateCounter(target, numericValue, suffix, 2000);
                statsObserver.unobserve(target);
            }
        });
    });
    
    stats.forEach(stat => statsObserver.observe(stat));
});

// Counter animation for statistics
function animateCounter(element, target, suffix = '', duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + suffix;
        }
    }, 16);
}