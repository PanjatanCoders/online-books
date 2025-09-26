// Toggle question expansion
function toggleQuestion(element) {
    const card = element.closest('.question-card');
    card.classList.toggle('expanded');
    updateProgress();
}

// Copy code functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block');
    const code = codeBlock.querySelector('code').textContent;

    navigator.clipboard.writeText(code).then(() => {
        button.textContent = 'Copied!';
        button.style.background = '#4CAF50';

        setTimeout(() => {
            button.textContent = 'Copy';
            button.style.background = '#667eea';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code:', err);
        button.textContent = 'Failed!';
        setTimeout(() => {
            button.textContent = 'Copy';
        }, 2000);
    });
}

// Search functionality
const searchBox = document.getElementById('searchBox');
if (searchBox) {
    searchBox.addEventListener('input', function (e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.question-card');

        cards.forEach(card => {
            const keywords = card.getAttribute('data-keywords') || '';
            const questionText = card.querySelector('.question-text').textContent.toLowerCase();

            if (questionText.includes(searchTerm) || keywords.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Progress bar update
function updateProgress() {
    const totalQuestions = document.querySelectorAll('.question-card').length;
    const expandedQuestions = document.querySelectorAll('.question-card.expanded').length;
    const progress = (expandedQuestions / totalQuestions) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function () {
    // Add smooth scrolling to anchor links
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

    // Initialize animations on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.question-card').forEach(card => {
        observer.observe(card);
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', function (e) {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchBox = document.getElementById('searchBox');
        if (searchBox) {
            searchBox.focus();
        }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
        const searchBox = document.getElementById('searchBox');
        if (document.activeElement === searchBox && searchBox) {
            searchBox.value = '';
            searchBox.dispatchEvent(new Event('input'));
        }
    }
});

// Track reading progress with scroll
window.addEventListener('scroll', function () {
    const scrolled = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (scrolled / height) * 100 : 0;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

function expandAll() {
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.add('expanded');
    });
}

// Print welcome message to console
console.log('%cWelcome to the Comprehensive Interview Guide!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cUse Ctrl/Cmd + K to search questions quickly', 'color: #764ba2; font-size: 14px;');
console.log('%cClick on any question to expand and see the answer', 'color: #666; font-size: 12px;');

// Initialize progress bar on page load
updateProgress();