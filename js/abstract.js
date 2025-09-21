// Progress Bar
function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-menu a, .toc a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('active');
        });
    });
}

// Active Navigation Highlighting
function updateActiveNavigation() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a, .toc a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;
        
        if (sectionTop <= 150 && sectionTop + sectionHeight > 150) {
            currentSection = section.id;
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Close mobile menu when clicking outside
function initClickOutside() {
    document.addEventListener('click', function(e) {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navMenu && mobileToggle) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
}

// Animate cards on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards
    const cards = document.querySelectorAll('.info-card, .practice-card, .guide-card, .concept-box');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Code block copy functionality
function initCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre');
    
    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerHTML = '<i class="fas fa-copy"></i>';
        button.title = 'Copy code';
        
        button.addEventListener('click', function() {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.color = '#28a745';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.color = '';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
            });
        });
        
        // Position the button
        block.style.position = 'relative';
        block.appendChild(button);
    });
}

// Search functionality
function initSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search content...';
    searchInput.className = 'search-input';
    searchInput.id = 'searchInput';
    
    // Add search input to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.appendChild(searchInput);
        hero.appendChild(searchContainer);
    }
    
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(this.value);
        }, 300);
    });
}

function performSearch(query) {
    const sections = document.querySelectorAll('.section');
    const searchResults = [];
    
    if (!query.trim()) {
        clearHighlights();
        return;
    }
    
    sections.forEach(section => {
        const content = section.textContent.toLowerCase();
        const queryLower = query.toLowerCase();
        
        if (content.includes(queryLower)) {
            searchResults.push(section);
            highlightSearchTerm(section, query);
        }
    });
    
    // Scroll to first result
    if (searchResults.length > 0) {
        searchResults[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function highlightSearchTerm(section, query) {
    clearHighlights(section);
    
    const walker = document.createTreeWalker(
        section,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    
    while (node = walker.nextNode()) {
        if (node.parentNode.tagName !== 'SCRIPT' && node.parentNode.tagName !== 'STYLE') {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const content = textNode.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        
        if (regex.test(content)) {
            const highlightedContent = content.replace(regex, '<mark class="search-highlight">$1</mark>');
            const wrapper = document.createElement('span');
            wrapper.innerHTML = highlightedContent;
            textNode.parentNode.replaceChild(wrapper, textNode);
        }
    });
}

function clearHighlights(container = document) {
    const highlights = container.querySelectorAll('.search-highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// Theme toggle functionality
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.title = 'Toggle dark mode';
    
    // Add to navigation
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(themeToggle);
    }
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            this.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'dark');
        } else {
            this.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'light');
        }
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.title = 'Scroll to top';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Print functionality
function initPrintPage() {
    const printBtn = document.createElement('button');
    printBtn.className = 'print-btn';
    printBtn.innerHTML = '<i class="fas fa-print"></i> Print';
    printBtn.title = 'Print this page';
    
    // Add to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(printBtn);
    }
    
    printBtn.addEventListener('click', function() {
        window.print();
    });
}

// Table of contents auto-generation
function generateTableOfContents() {
    const toc = document.querySelector('.toc ul');
    const sections = document.querySelectorAll('.section');
    
    if (toc && sections.length > 0) {
        // Clear existing TOC
        toc.innerHTML = '';
        
        sections.forEach((section, index) => {
            const heading = section.querySelector('h2');
            if (heading) {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.href = `#${section.id}`;
                a.textContent = `${index + 1}. ${heading.textContent}`;
                li.appendChild(a);
                toc.appendChild(li);
            }
        });
    }
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu and search
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const searchInput = document.getElementById('searchInput');
            
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            
            if (searchInput) {
                searchInput.value = '';
                clearHighlights();
            }
        }
        
        // Ctrl+F focuses search
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateProgressBar();
    initSmoothScrolling();
    initMobileMenu();
    initClickOutside();
    initScrollAnimations();
    initCodeCopy();
    initSearch();
    initThemeToggle();
    initScrollToTop();
    initPrintPage();
    generateTableOfContents();
    initKeyboardNavigation();
    
    // Update progress bar and active navigation on scroll
    window.addEventListener('scroll', function() {
        updateProgressBar();
        updateActiveNavigation();
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('navMenu');
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
window.addEventListener('scroll', debounce(function() {
    updateProgressBar();
    updateActiveNavigation();
}, 10));

// Service Worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}