// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = header.offsetHeight;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('header');
let lastScroll = 0;
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll <= 0) {
                header.classList.remove('scrolled');
                return;
            }
            
            if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
                // Scroll Down
                header.classList.remove('scrolled');
                header.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
                // Scroll Up
                header.classList.remove('scroll-down');
                header.classList.add('scrolled');
            }
            
            lastScroll = currentScroll;
            ticking = false;
        });
        
        ticking = true;
    }
});

// Add animation to skill cards when they come into view
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card').forEach(card => {
    observer.observe(card);
});

// Typing Effect
const typingText = document.querySelector('.typing-text');
const phrases = [
    'Estudante de Análise e Desenvolvimento de Sistemas',
    'Desenvolvedor Web',
    'Apaixonado por Tecnologia',
    'Sempre em busca de novos desafios'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingDelay = 500; // Pause before typing next phrase
    }

    setTimeout(type, typingDelay);
}

// Start typing effect
type();

// Code Highlighting
function highlightCode() {
    const codeBlocks = document.querySelectorAll('.code-animation code');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // HTML highlighting
        html = html.replace(/&lt;(\/?[a-z][a-z0-9]*)\b/g, '<span class="tag">&lt;$1</span>');
        html = html.replace(/([a-z-]+)=/g, '<span class="attr">$1</span>=');
        html = html.replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
        
        // JavaScript/React highlighting
        html = html.replace(/\b(function|return|const|let|var|class|public)\b/g, '<span class="keyword">$1</span>');
        html = html.replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(');
        
        // PHP highlighting
        html = html.replace(/&lt;\?php/g, '<span class="php-tag">&lt;?php</span>');
        html = html.replace(/\b(class|public|function|return)\b/g, '<span class="php-keyword">$1</span>');
        
        block.innerHTML = html;
    });
}

// Apply code highlighting
highlightCode();

// Slide functionality
function initSlide() {
    const slideContainer = document.querySelector('.slide-container');
    if (!slideContainer) return;

    const wrapper = slideContainer.querySelector('.slide-wrapper');
    const slides = slideContainer.querySelectorAll('.slide');
    const prevBtn = slideContainer.querySelector('.prev');
    const nextBtn = slideContainer.querySelector('.next');
    let currentIndex = 0;
    let isAnimating = false;
    let interval;

    function updateSlide() {
        const offset = -currentIndex * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
    }

    function nextSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match transition duration
    }

    function prevSlide() {
        if (isAnimating) return;
        isAnimating = true;
        
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide();
        
        setTimeout(() => {
            isAnimating = false;
        }, 500); // Match transition duration
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slideContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slideContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // Start auto slide
    startAutoSlide();

    // Pause on hover
    slideContainer.addEventListener('mouseenter', stopAutoSlide);
    slideContainer.addEventListener('mouseleave', startAutoSlide);
}

// Initialize slide when DOM is loaded
document.addEventListener('DOMContentLoaded', initSlide);

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project-card, .about-text, .contact-content').forEach(el => {
    observer.observe(el);
});

// Add hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(-10px)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        requestAnimationFrame(() => {
            card.style.transform = 'translateY(0)';
        });
    });
});

// Add active state to navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

let scrollTimeout;

window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = header.offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 50) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Animate skill progress bars when in view
const skillItems = document.querySelectorAll('.skill-item');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

skillItems.forEach(item => {
    skillObserver.observe(item);
}); 