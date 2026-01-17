/**
 * TechTok Cafe - Component Loader System
 * Handles dynamic loading of navigation, sidebar, footer, and other components
 */

const TechTokComponents = {
    // Initialization
    init() {
        this.loadTopNav();
        this.loadSidebar();
        this.loadFooter();
        this.initThemeToggle();
        this.initMobileMenu();
        this.initBackToTop();
        this.initReadingProgress();
        this.generateBreadcrumbs();
        this.generateTOC();
        this.highlightCurrentNav();
    },

    // ===== Top Navigation =====
    loadTopNav() {
        const topNav = document.getElementById('top-nav');
        if (!topNav) return;

        const isHomepage = document.body.classList.contains('homepage');

        topNav.innerHTML = `
            <div class="top-nav-left">
                <button class="mobile-menu-toggle" id="mobile-menu-toggle" aria-label="Toggle menu">
                    <i class="fas fa-bars"></i>
                </button>
                <a href="/index.html" class="top-nav-brand">
                    <img src="${SITE_NAVIGATION.brand.logo}" alt="${SITE_NAVIGATION.brand.name}" class="top-nav-brand-logo">
                    <span class="top-nav-brand-text">${SITE_NAVIGATION.brand.name}</span>
                </a>
            </div>
            <div class="top-nav-right">
                <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                    <i class="fas fa-sun"></i>
                </button>
            </div>
        `;
    },

    // ===== Sidebar Navigation =====
    loadSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const currentDomain = getCurrentDomain();
        let sidebarContent = '';

        // Sidebar Header
        sidebarContent += `
            <div class="sidebar-header">
                <a href="/index.html" class="sidebar-brand">
                    <img src="${SITE_NAVIGATION.brand.logo}" alt="${SITE_NAVIGATION.brand.name}" class="sidebar-brand-logo">
                    <span class="sidebar-brand-text">${SITE_NAVIGATION.brand.name}</span>
                </a>
                <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Toggle sidebar">
                    <i class="fas fa-chevron-left"></i>
                </button>
            </div>
        `;

        // Sidebar Navigation
        sidebarContent += '<nav class="sidebar-nav">';

        // Domain selector
        sidebarContent += '<div class="sidebar-category">';
        sidebarContent += '<div class="sidebar-category-title">Domains</div>';

        for (const domain of SITE_NAVIGATION.domains) {
            const isActive = currentDomain && currentDomain.id === domain.id;
            const disabledClass = domain.enabled ? '' : 'disabled';
            const activeClass = isActive ? 'active' : '';
            const badge = domain.enabled ? '' : '<span class="sidebar-nav-badge coming-soon">Soon</span>';

            sidebarContent += `
                <a href="${domain.enabled ? domain.indexUrl : '#'}"
                   class="sidebar-nav-item ${disabledClass} ${activeClass}"
                   ${!domain.enabled ? 'aria-disabled="true"' : ''}>
                    <i class="sidebar-nav-icon ${domain.icon}"></i>
                    <span class="sidebar-nav-text">${domain.name}</span>
                    ${badge}
                </a>
            `;
        }
        sidebarContent += '</div>';

        // Current domain categories (if on a domain page)
        if (currentDomain && currentDomain.enabled && currentDomain.categories.length > 0) {
            const pageInfo = getCurrentPageInfo();

            sidebarContent += '<div class="sidebar-category">';
            sidebarContent += `<div class="sidebar-category-title">${currentDomain.name} Tutorials</div>`;

            for (const category of currentDomain.categories) {
                const categoryId = `sidebar-cat-${category.id}`;
                const hasActiveTutorial = pageInfo && pageInfo.category && pageInfo.category.id === category.id;

                sidebarContent += `
                    <div class="sidebar-nav-item sidebar-collapsible ${hasActiveTutorial ? 'open' : ''}"
                         data-target="${categoryId}">
                        <i class="sidebar-nav-icon ${category.icon}"></i>
                        <span class="sidebar-nav-text">${category.name}</span>
                        <i class="sidebar-collapsible-icon fas fa-chevron-right"></i>
                    </div>
                    <div class="sidebar-submenu" id="${categoryId}">
                `;

                for (const tutorial of category.tutorials) {
                    const isCurrentPage = pageInfo && pageInfo.tutorial && pageInfo.tutorial.url === tutorial.url;
                    sidebarContent += `
                        <a href="${tutorial.url}" class="sidebar-nav-item ${isCurrentPage ? 'active' : ''}">
                            <i class="sidebar-nav-icon ${tutorial.icon}"></i>
                            <span class="sidebar-nav-text">${tutorial.title}</span>
                        </a>
                    `;
                }

                sidebarContent += '</div>';
            }
            sidebarContent += '</div>';
        }

        // Quick Links
        sidebarContent += '<div class="sidebar-category">';
        sidebarContent += '<div class="sidebar-category-title">Quick Links</div>';
        for (const link of SITE_NAVIGATION.quickLinks) {
            sidebarContent += `
                <a href="${link.url}" class="sidebar-nav-item">
                    <i class="sidebar-nav-icon ${link.icon}"></i>
                    <span class="sidebar-nav-text">${link.name}</span>
                </a>
            `;
        }
        sidebarContent += '</div>';

        sidebarContent += '</nav>';

        // Sidebar Footer
        sidebarContent += `
            <div class="sidebar-footer">
                <a href="/index.html" class="sidebar-footer-link">
                    <i class="fas fa-home"></i>
                    <span class="sidebar-footer-text">Back to Home</span>
                </a>
            </div>
        `;

        sidebar.innerHTML = sidebarContent;
        this.initCollapsibleCategories();
    },

    // ===== Footer =====
    loadFooter() {
        const footer = document.getElementById('site-footer');
        if (!footer) return;

        let socialLinks = '';
        for (const social of SITE_NAVIGATION.social) {
            socialLinks += `
                <a href="${social.url}" target="_blank" rel="noopener noreferrer"
                   class="footer-social-link" aria-label="${social.name}">
                    <i class="${social.icon}"></i>
                </a>
            `;
        }

        // Generate domain links
        let domainLinks = '';
        for (const domain of SITE_NAVIGATION.domains) {
            if (domain.enabled) {
                domainLinks += `
                    <li>
                        <a href="${domain.indexUrl}">
                            <i class="${domain.icon}"></i> ${domain.name}
                        </a>
                    </li>
                `;
            }
        }

        footer.innerHTML = `
            <div class="footer-container">
                <div class="footer-top">
                    <div class="footer-brand">
                        <div class="footer-brand-title">${SITE_NAVIGATION.brand.name}</div>
                        <p class="footer-brand-description">${SITE_NAVIGATION.brand.tagline}</p>
                        <div class="footer-social">
                            ${socialLinks}
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>Tutorials</h4>
                        <ul class="footer-links">
                            ${domainLinks}
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul class="footer-links">
                            <li><a href="/index.html"><i class="fas fa-home"></i> Home</a></li>
                            <li><a href="/index.html#about"><i class="fas fa-user"></i> About</a></li>
                            <li><a href="/index.html#contact"><i class="fas fa-envelope"></i> Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>Connect</h4>
                        <ul class="footer-links">
                            ${SITE_NAVIGATION.social.map(s => `
                                <li><a href="${s.url}" target="_blank"><i class="${s.icon}"></i> ${s.name}</a></li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p class="footer-copyright">
                        &copy; ${SITE_NAVIGATION.footer.copyright}
                    </p>
                    <p class="footer-made-with">
                        ${SITE_NAVIGATION.footer.madeWith} <i class="fas fa-heart"></i>
                    </p>
                </div>
            </div>
        `;
    },

    // ===== Theme Toggle =====
    initThemeToggle() {
        const STORAGE_KEY = 'techtok-theme';
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        // Get saved or system preference
        const savedTheme = localStorage.getItem(STORAGE_KEY);
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');

        // Apply theme
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);

        // Toggle handler
        toggle.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const newTheme = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(STORAGE_KEY, newTheme);
            this.updateThemeIcon(newTheme);
        });
    },

    updateThemeIcon(theme) {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    },

    // ===== Mobile Menu =====
    initMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const sidebar = document.getElementById('sidebar');

        if (!toggle || !sidebar) return;

        // Create overlay
        let overlay = document.querySelector('.sidebar-overlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'sidebar-overlay';
            document.body.appendChild(overlay);
        }

        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
            document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
        });

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    },

    // ===== Collapsible Categories =====
    initCollapsibleCategories() {
        const collapsibles = document.querySelectorAll('.sidebar-collapsible');

        collapsibles.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = item.getAttribute('data-target');
                const submenu = document.getElementById(targetId);

                item.classList.toggle('open');

                if (submenu) {
                    if (item.classList.contains('open')) {
                        submenu.style.maxHeight = submenu.scrollHeight + 'px';
                    } else {
                        submenu.style.maxHeight = '0';
                    }
                }
            });
        });

        // Initialize open states
        document.querySelectorAll('.sidebar-collapsible.open').forEach(item => {
            const targetId = item.getAttribute('data-target');
            const submenu = document.getElementById(targetId);
            if (submenu) {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            }
        });
    },

    // ===== Back to Top Button =====
    initBackToTop() {
        let btn = document.getElementById('back-to-top');

        if (!btn) {
            btn = document.createElement('button');
            btn.id = 'back-to-top';
            btn.className = 'back-to-top';
            btn.setAttribute('aria-label', 'Back to top');
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            document.body.appendChild(btn);
        }

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    // ===== Reading Progress Bar =====
    initReadingProgress() {
        const progressContainer = document.getElementById('reading-progress');
        if (!progressContainer) return;

        let progressBar = progressContainer.querySelector('.reading-progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'reading-progress-bar';
            progressContainer.appendChild(progressBar);
        }

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    },

    // ===== Breadcrumbs =====
    generateBreadcrumbs() {
        const container = document.getElementById('breadcrumb');
        if (!container) return;

        const breadcrumbs = getBreadcrumbData();
        if (breadcrumbs.length <= 1) {
            container.style.display = 'none';
            return;
        }

        let html = '<ol class="breadcrumb-list">';

        breadcrumbs.forEach((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            const activeClass = isLast ? 'active' : '';

            if (isLast) {
                html += `
                    <li class="breadcrumb-item ${activeClass}" aria-current="page">
                        ${item.name}
                    </li>
                `;
            } else {
                html += `
                    <li class="breadcrumb-item">
                        <a href="${item.url}">
                            ${item.icon ? `<i class="${item.icon}"></i>` : ''}
                            ${item.name}
                        </a>
                    </li>
                `;
            }
        });

        html += '</ol>';
        container.innerHTML = html;
    },

    // ===== Table of Contents =====
    generateTOC() {
        const tocContainer = document.getElementById('toc');
        const articleBody = document.querySelector('.article-body');

        if (!tocContainer || !articleBody) return;

        const headings = articleBody.querySelectorAll('h2.chapter-title, .chapter-title');

        if (headings.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        let html = '<h3 class="toc-title"><i class="fas fa-list"></i> Table of Contents</h3>';
        html += '<ul class="toc-list">';

        headings.forEach((heading, index) => {
            const id = heading.id || `section-${index + 1}`;
            heading.id = id;
            const text = heading.textContent.trim();

            html += `
                <li class="toc-item">
                    <a href="#${id}" class="toc-link">${text}</a>
                </li>
            `;
        });

        html += '</ul>';
        tocContainer.innerHTML = html;

        // Smooth scroll for TOC links
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Highlight active section
        this.initTOCHighlight(headings);
    },

    initTOCHighlight(headings) {
        if (!headings || headings.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const id = entry.target.id;
                const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);

                if (tocLink) {
                    if (entry.isIntersecting) {
                        document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                        tocLink.classList.add('active');
                    }
                }
            });
        }, { rootMargin: '-20% 0px -80% 0px' });

        headings.forEach(heading => observer.observe(heading));
    },

    // ===== Highlight Current Navigation =====
    highlightCurrentNav() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.sidebar-nav-item').forEach(item => {
            const href = item.getAttribute('href');
            if (href && currentPath.endsWith(href)) {
                item.classList.add('active');
            }
        });
    },

    // ===== Article Navigation (Previous/Next) =====
    generateArticleNav() {
        const container = document.querySelector('.article-nav');
        if (!container) return;

        const navLinks = getNavLinks();
        let html = '';

        if (navLinks.prev) {
            html += `
                <a href="${navLinks.prev.url}" class="article-nav-link prev">
                    <span class="article-nav-label">
                        <i class="fas fa-arrow-left"></i> Previous
                    </span>
                    <span class="article-nav-title">${navLinks.prev.title}</span>
                </a>
            `;
        } else {
            html += '<div></div>';
        }

        if (navLinks.next) {
            html += `
                <a href="${navLinks.next.url}" class="article-nav-link next">
                    <span class="article-nav-label">
                        Next <i class="fas fa-arrow-right"></i>
                    </span>
                    <span class="article-nav-title">${navLinks.next.title}</span>
                </a>
            `;
        } else {
            html += '<div></div>';
        }

        container.innerHTML = html;
    }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    TechTokComponents.init();
    TechTokComponents.generateArticleNav();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TechTokComponents;
}
