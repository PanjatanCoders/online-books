// File I/O Guide JavaScript

// Highlight current section in TOC
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.chapter');
    const tocLinks = document.querySelectorAll('.toc a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu functionality
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && mobileToggle &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href && href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Code copy functionality
document.querySelectorAll('.code-block').forEach(codeBlock => {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyButton.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        background: #667eea;
        color: white;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        display: none;
    `;
    
    codeBlock.style.position = 'relative';
    codeBlock.appendChild(copyButton);
    
    codeBlock.addEventListener('mouseenter', () => {
        copyButton.style.display = 'block';
    });
    
    codeBlock.addEventListener('mouseleave', () => {
        copyButton.style.display = 'none';
    });
    
    copyButton.addEventListener('click', () => {
        const code = codeBlock.querySelector('pre').textContent;
        navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyButton.style.background = '#4CAF50';
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyButton.style.background = '#667eea';
            }, 2000);
        });
    });
});

// Add animation on scroll for chapter elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all chapters
document.querySelectorAll('.chapter').forEach(chapter => {
    chapter.style.opacity = '0';
    chapter.style.transform = 'translateY(20px)';
    chapter.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(chapter);
});

// Performance metrics hover effect
document.querySelectorAll('.performance-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 30px rgba(102, 126, 234, 0.2)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Add keyboard navigation for TOC
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        const tocLinks = Array.from(document.querySelectorAll('.toc a'));
        const activeLink = document.querySelector('.toc a.active');
        
        if (activeLink) {
            const currentIndex = tocLinks.indexOf(activeLink);
            let newIndex;
            
            if (e.key === 'ArrowUp') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : tocLinks.length - 1;
            } else {
                newIndex = currentIndex < tocLinks.length - 1 ? currentIndex + 1 : 0;
            }
            
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                tocLinks[newIndex].click();
            }
        }
    }
});

// Print-friendly preparation
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.chapter').forEach(chapter => {
        chapter.style.opacity = '1';
        chapter.style.transform = 'none';
    });
});

// Back to top button functionality (if exists)
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add reading time estimator
function estimateReadingTime() {
    const text = document.querySelector('.guide-container').textContent;
    const wordsPerMinute = 200;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wordsPerMinute);
    
    const header = document.querySelector('.guide-subtitle');
    if (header) {
        const readingTime = document.createElement('div');
        readingTime.style.cssText = `
            margin-top: 10px;
            color: #667eea;
            font-weight: 600;
            font-size: 0.9rem;
        `;
        readingTime.innerHTML = `<i class="fas fa-clock"></i> ${time} min read`;
        header.appendChild(readingTime);
    }
}

// Initialize reading time on load
document.addEventListener('DOMContentLoaded', estimateReadingTime);

// Table of contents sticky behavior
let toc = document.querySelector('.toc');
if (toc) {
    let tocOffset = toc.offsetTop;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > tocOffset - 20) {
            toc.style.position = 'sticky';
            toc.style.top = '80px';
        } else {
            toc.style.position = 'relative';
            toc.style.top = 'auto';
        }
    });
}

// Enhanced code block interaction
document.querySelectorAll('.code-block pre').forEach(pre => {
    pre.addEventListener('dblclick', function() {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(this);
        selection.removeAllRanges();
        selection.addRange(range);
    });
});

// Add progress indicator for each section
function updateSectionProgress() {
    const chapters = document.querySelectorAll('.chapter');
    const viewportHeight = window.innerHeight;
    
    chapters.forEach(chapter => {
        const rect = chapter.getBoundingClientRect();
        const isVisible = rect.top < viewportHeight && rect.bottom > 0;
        
        if (isVisible) {
            const progress = Math.min(100, Math.max(0, 
                ((viewportHeight - rect.top) / (viewportHeight + rect.height)) * 100
            ));
            
            // Could add visual indicator here if needed
            chapter.dataset.progress = Math.round(progress);
        }
    });
}

window.addEventListener('scroll', updateSectionProgress);
window.addEventListener('resize', updateSectionProgress);

console.log('Java File I/O Guide loaded successfully!');