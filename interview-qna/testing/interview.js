/* QA Testing Interview Guide - JavaScript Functionality */

document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveFeatures();
    setupScrollEffects();
    setupCopyFunctionality();
    setupLifecycleInteractions();
    console.log('🚀 Manual QA Testing Interview Guide loaded successfully!');
    console.log('📚 32 comprehensive questions covered');
    console.log('💡 Click code blocks to copy content');
    console.log('🎯 Good luck with your interview preparation!');
});

/**
 * Initialize all interactive features
 */
function initializeInteractiveFeatures() {
    setupSmoothScrolling();
    setupQuestionBlockHovers();
    setupProgressBar();
    setupBackToTopButton();
}

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
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
}

/**
 * Setup hover effects for question blocks
 */
function setupQuestionBlockHovers() {
    document.querySelectorAll('.question-block').forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.15)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        });
    });
}

/**
 * Setup scroll effects and progress bar
 */
function setupScrollEffects() {
    // Create and setup progress bar
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: linear-gradient(90deg, #667eea, #764ba2);
        z-index: 1000;
        transition: width 0.3s;
        width: 0%;
    `;
    document.body.appendChild(progressBar);

    // Update progress on scroll
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Setup progress bar functionality
 */
function setupProgressBar() {
    const progressBar = document.querySelector('[style*="position: fixed"][style*="top: 0"]');
    if (!progressBar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
    });
}

/**
 * Setup back to top button
 */
function setupBackToTopButton() {
    const backToTop = document.createElement('div');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s;
        z-index: 1000;
    `;

    document.body.appendChild(backToTop);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(20px)';
        }
    });

    // Scroll to top when clicked
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup click-to-copy functionality for code blocks
 */
function setupCopyFunctionality() {
    document.querySelectorAll('.code-block').forEach(codeBlock => {
        codeBlock.style.cursor = 'pointer';
        codeBlock.title = 'Click to copy';
        
        // Add copy icon
        const copyIcon = document.createElement('div');
        copyIcon.innerHTML = '📋';
        copyIcon.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255,255,255,0.2);
            padding: 5px;
            border-radius: 3px;
            font-size: 12px;
            opacity: 0.7;
            transition: all 0.3s;
        `;
        
        // Ensure code block is positioned relatively
        codeBlock.style.position = 'relative';
        codeBlock.appendChild(copyIcon);
        
        // Add click event listener
        codeBlock.addEventListener('click', function() {
            copyToClipboard(this, copyIcon);
        });

        // Add hover effect for copy icon
        codeBlock.addEventListener('mouseenter', () => {
            copyIcon.style.opacity = '1';
        });

        codeBlock.addEventListener('mouseleave', () => {
            copyIcon.style.opacity = '0.7';
        });
    });
}

/**
 * Copy text content to clipboard
 * @param {Element} element - The element to copy text from
 * @param {Element} copyIcon - The copy icon element
 */
function copyToClipboard(element, copyIcon) {
    const text = element.textContent.replace('📋', '').trim();
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess(copyIcon);
        }).catch(() => {
            showCopyError(copyIcon);
        });
    } else {
        // Fallback for browsers that don't support clipboard API
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopySuccess(copyIcon);
        } catch (err) {
            showCopyError(copyIcon);
        }
    }
}

/**
 * Show copy success feedback
 * @param {Element} copyIcon - The copy icon element
 */
function showCopySuccess(copyIcon) {
    const original = copyIcon.innerHTML;
    const originalBg = copyIcon.style.background;
    
    copyIcon.innerHTML = '✅';
    copyIcon.style.background = 'rgba(76, 175, 80, 0.8)';
    
    setTimeout(() => {
        copyIcon.innerHTML = original;
        copyIcon.style.background = originalBg;
    }, 1500);
}

/**
 * Show copy error feedback
 * @param {Element} copyIcon - The copy icon element
 */
function showCopyError(copyIcon) {
    const original = copyIcon.innerHTML;
    
    copyIcon.innerHTML = '❌';
    copyIcon.style.background = 'rgba(244, 67, 54, 0.8)';
    
    setTimeout(() => {
        copyIcon.innerHTML = original;
        copyIcon.style.background = 'rgba(255,255,255,0.2)';
    }, 1500);
}

/**
 * Setup enhanced lifecycle stage interactions
 */
function setupLifecycleInteractions() {
    document.querySelectorAll('.lifecycle-stage').forEach(stage => {
        stage.addEventListener('click', function() {
            // Remove active class from all stages
            document.querySelectorAll('.lifecycle-stage').forEach(s => {
                s.classList.remove('active-stage');
            });
            
            // Add active class to clicked stage
            this.classList.add('active-stage');
            
            // Add subtle animation
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });

        // Add keyboard support
        stage.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Make focusable for accessibility
        stage.setAttribute('tabindex', '0');
        stage.setAttribute('role', 'button');
        stage.setAttribute('aria-label', `Select ${this.textContent} stage`);
    });
}

/**
 * Add dynamic styles to enhance the page
 */
function addDynamicStyles() {
    const additionalStyles = `
        .active-stage {
            background: #667eea !important;
            color: white !important;
            transform: scale(1.05);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
        }
        
        .code-block:hover {
            border-left-color: #4CAF50;
            transition: border-left-color 0.3s;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .question-block {
            animation: fadeIn 0.6s ease-out;
        }
        
        .section:nth-child(even) .question-block {
            animation-delay: 0.1s;
        }
        
        .section:nth-child(odd) .question-block {
            animation-delay: 0.2s;
        }

        /* Improved focus styles for accessibility */
        .lifecycle-stage:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }

        .nav-link:focus,
        .toc a:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
            border-radius: 4px;
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = additionalStyles;
    document.head.appendChild(styleSheet);
}

/**
 * Setup intersection observer for animations
 */
function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all question blocks
    document.querySelectorAll('.question-block').forEach(block => {
        observer.observe(block);
    });
}

/**
 * Add print functionality
 */
function setupPrintStyles() {
    const printStyles = `
        @media print {
            .container {
                box-shadow: none;
                margin: 0;
                padding: 10px;
            }
            .header {
                break-after: avoid;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .question-block {
                break-inside: avoid;
                margin-bottom: 15px;
            }
            .section {
                break-after: auto;
            }
            .process-flow {
                break-inside: avoid;
            }
            .code-block, .tip-box, .note-box, .warning-box, .example-box {
                break-inside: avoid;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            .toc {
                break-after: page;
            }
            .footer {
                display: none;
            }
            /* Hide interactive elements */
            [style*="position: fixed"] {
                display: none !important;
            }
        }
    `;
    
    const styleSheet = document.createElement("style");
    styleSheet.innerText = printStyles;
    document.head.appendChild(styleSheet);
}

/**
 * Initialize all functionality when DOM is ready
 */
function init() {
    addDynamicStyles();
    setupIntersectionObserver();
    setupPrintStyles();
}

// Call init after DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}