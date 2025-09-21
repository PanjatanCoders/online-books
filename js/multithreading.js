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
    const cards = document.querySelectorAll('.info-card, .practice-card, .guide-card, .concept-box, .summary-card, .question-card');
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
        
        // Add styles for the copy button
        button.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: #4a5568;
            color: #e2e8f0;
            border: none;
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            transition: background-color 0.3s ease;
        `;
        
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#1e3c72';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#4a5568';
        });
        
        button.addEventListener('click', function() {
            const code = block.querySelector('code');
            const text = code ? code.textContent : block.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.backgroundColor = '#4a5568';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy code: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.backgroundColor = '#28a745';
                
                setTimeout(() => {
                    button.innerHTML = '<i class="fas fa-copy"></i>';
                    button.style.backgroundColor = '#4a5568';
                }, 2000);
            });
        });
        
        // Position the button
        block.style.position = 'relative';
        block.appendChild(button);
    });
}

// Search functionality
function initSearch() {
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.style.cssText = `
        margin-top: 2rem;
        text-align: center;
    `;
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search multithreading content...';
    searchInput.className = 'search-input';
    searchInput.id = 'searchInput';
    searchInput.style.cssText = `
        padding: 0.75rem 1rem;
        border: 2px solid #e2e8f0;
        border-radius: 25px;
        width: 300px;
        max-width: 90%;
        font-size: 1rem;
        outline: none;
        transition: border-color 0.3s ease;
    `;
    
    searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#1e3c72';
    });
    
    searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#e2e8f0';
    });
    
    searchContainer.appendChild(searchInput);
    
    // Add search input to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
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
        const headerOffset = 100;
        const elementPosition = searchResults[0].getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
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
        if (node.parentNode.tagName !== 'SCRIPT' && 
            node.parentNode.tagName !== 'STYLE' &&
            node.parentNode.tagName !== 'CODE') {
            textNodes.push(node);
        }
    }
    
    textNodes.forEach(textNode => {
        const content = textNode.textContent;
        const regex = new RegExp(`(${query})`, 'gi');
        
        if (regex.test(content)) {
            const highlightedContent = content.replace(regex, '<mark class="search-highlight" style="background: #ff6b35; color: white; padding: 2px 4px; border-radius: 3px;">$1</mark>');
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

// Enhanced code syntax highlighting for multithreading concepts
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        let html = block.innerHTML;
        
        // Highlight Java keywords
        const keywords = [
            'public', 'private', 'protected', 'class', 'interface', 'extends', 'implements',
            'abstract', 'static', 'final', 'void', 'return', 'if', 'else', 'for', 'while',
            'try', 'catch', 'finally', 'new', 'this', 'super', 'import', 'package',
            'synchronized', 'volatile', 'transient'
        ];
        
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b${keyword}\\b`, 'g');
            html = html.replace(regex, `<span style="color: #1e3c72; font-weight: bold;">${keyword}</span>`);
        });
        
        // Highlight multithreading specific classes and methods
        const threadingTerms = [
            'Thread', 'Runnable', 'ExecutorService', 'Executors', 'Future', 'CompletableFuture',
            'CountDownLatch', 'CyclicBarrier', 'Semaphore', 'ReentrantLock', 'Condition',
            'ConcurrentHashMap', 'BlockingQueue', 'ArrayBlockingQueue', 'LinkedBlockingQueue',
            'CopyOnWriteArrayList', 'AtomicInteger', 'AtomicBoolean', 'ThreadLocal',
            'start', 'run', 'join', 'wait', 'notify', 'notifyAll', 'sleep', 'interrupt'
        ];
        
        threadingTerms.forEach(term => {
            const regex = new RegExp(`\\b${term}\\b`, 'g');
            html = html.replace(regex, `<span style="color: #ff6b35; font-weight: bold;">${term}</span>`);
        });
        
        // Highlight strings
        html = html.replace(/"([^"]*)"/g, '<span style="color: #74b9ff;">"$1"</span>');
        
        // Highlight comments
        html = html.replace(/\/\/ (.+)/g, '<span style="color: #636e72; font-style: italic;">// $1</span>');
        html = html.replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #636e72; font-style: italic;">// Mobile Menu</span>');
        
        block.innerHTML = html;
    });
}

// Add tooltips to concept tags
function addConceptTooltips() {
    const conceptTags = document.querySelectorAll('.concept-tag');
    
    const tooltips = {
        'Thread Creation': 'Different ways to create and start threads in Java',
        'Synchronization': 'Mechanisms to coordinate access to shared resources',
        'Race Conditions': 'When multiple threads access shared data simultaneously without proper synchronization',
        'Deadlock Prevention': 'Techniques to avoid circular waiting for resources',
        'Thread Pools': 'Managed collections of worker threads for efficient task execution',
        'Concurrent Collections': 'Thread-safe data structures designed for concurrent access'
    };
    
    conceptTags.forEach(tag => {
        const text = tag.textContent;
        if (tooltips[text]) {
            tag.title = tooltips[text];
            tag.style.cursor = 'help';
        }
    });
}

// Scroll to top functionality
function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.title = 'Scroll to top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(45deg, #1e3c72, #2a5298);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add reading time estimation
function addReadingTime() {
    const content = document.querySelector('.container');
    const text = content.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
    
    const readingTimeElement = document.createElement('div');
    readingTimeElement.className = 'reading-time';
    readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
    readingTimeElement.style.cssText = `
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.9rem;
        margin-top: 1rem;
    `;
    
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.appendChild(readingTimeElement);
    }
}

// Keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu and clears search
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            const searchInput = document.getElementById('searchInput');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const mobileToggle = document.getElementById('mobileToggle');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
            
            if (searchInput && searchInput.value) {
                searchInput.value = '';
                clearHighlights();
                searchInput.blur();
            }
        }
        
        // Ctrl+F focuses search
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
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
    initScrollToTop();
    addReadingTime();
    enhanceCodeBlocks();
    addConceptTooltips();
    initKeyboardNavigation();
    
    // Update progress bar and active navigation on scroll
    const debouncedScroll = debounce(function() {
        updateProgressBar();
        updateActiveNavigation();
    }, 10);
    
    window.addEventListener('scroll', debouncedScroll);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const navMenu = document.getElementById('navMenu');
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('active');
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) {
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        }
    });
    
    // Add loading animation completion
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Performance optimization - debounce function
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