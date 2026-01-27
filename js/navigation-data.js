/**
 * GyanCode - Navigation Data Structure
 * This file contains the complete site navigation configuration
 */

const SITE_NAVIGATION = {
    brand: {
        name: 'GyanCode',
        logo: '/assets/images/logo.png',
        tagline: 'QA Learning Hub - Test Automation Tutorials & Interview Prep'
    },

    domains: [
        {
            id: 'java',
            name: 'Java',
            icon: 'fab fa-java',
            enabled: true,
            description: 'Master Java programming from fundamentals to advanced concepts',
            indexUrl: '/java/index.html',
            categories: [
                {
                    id: 'core-fundamentals',
                    name: 'Core Java Fundamentals',
                    icon: 'fas fa-play-circle',
                    tutorials: [
                        {
                            title: 'Java Basics',
                            url: '/java/core/java-basic.html',
                            icon: 'fas fa-play-circle',
                            description: 'Installation, variables, operators, and basic syntax',
                            readTime: '15 min'
                        },
                        {
                            title: 'Conditional Statements',
                            url: '/java/core/conditional-statement.html',
                            icon: 'fas fa-code-branch',
                            description: 'if-else, switch-case, and decision making',
                            readTime: '12 min'
                        },
                        {
                            title: 'Java Loops',
                            url: '/java/core/java-loops.html',
                            icon: 'fas fa-sync',
                            description: 'for, while, do-while loops and iterations',
                            readTime: '10 min'
                        },
                        {
                            title: 'Arrays Guide',
                            url: '/java/core/array.html',
                            icon: 'fas fa-th-list',
                            description: 'Single and multi-dimensional arrays',
                            readTime: '15 min'
                        },
                        {
                            title: 'Methods & Functions',
                            url: '/java/core/java-methods.html',
                            icon: 'fas fa-code',
                            description: 'Method declaration, parameters, and return types',
                            readTime: '12 min'
                        },
                        {
                            title: 'Exception Handling',
                            url: '/java/core/java-exceptions.html',
                            icon: 'fas fa-exclamation-triangle',
                            description: 'try-catch, throws, and custom exceptions',
                            readTime: '15 min'
                        }
                    ]
                },
                {
                    id: 'oop',
                    name: 'Object-Oriented Programming',
                    icon: 'fas fa-cubes',
                    tutorials: [
                        {
                            title: 'OOP Concepts',
                            url: '/java/core/java-oops.html',
                            icon: 'fas fa-cubes',
                            description: 'Classes, objects, and OOP principles',
                            readTime: '20 min'
                        },
                        {
                            title: 'Abstract Classes & Interfaces',
                            url: '/java/core/oops/abstract-interface.html',
                            icon: 'fas fa-sitemap',
                            description: 'Abstraction and interface implementation',
                            readTime: '18 min'
                        },
                        {
                            title: 'Inheritance & Polymorphism',
                            url: '/java/core/oops/inheritance-polymorphism.html',
                            icon: 'fas fa-project-diagram',
                            description: 'Class inheritance and method overriding',
                            readTime: '20 min'
                        },
                        {
                            title: 'Generics',
                            url: '/java/misc/java-generics.html',
                            icon: 'fas fa-layer-group',
                            description: 'Type parameters and generic programming',
                            readTime: '15 min'
                        }
                    ]
                },
                {
                    id: 'strings',
                    name: 'String Handling',
                    icon: 'fas fa-text-height',
                    tutorials: [
                        {
                            title: 'Part 1A - Fundamentals & Creation',
                            url: '/java/core/string/java-string-1.html',
                            icon: 'fas fa-circle-dot',
                            description: 'String basics and creation methods',
                            readTime: '15 min'
                        },
                        {
                            title: 'Part 1B - Methods & Comparison',
                            url: '/java/core/string/java-string-2.html',
                            icon: 'fas fa-circle-dot',
                            description: 'String methods and comparison techniques',
                            readTime: '15 min'
                        },
                        {
                            title: 'Part 1C - Best Practices & Pitfalls',
                            url: '/java/core/string/java-string-3.html',
                            icon: 'fas fa-circle-dot',
                            description: 'Common mistakes and best practices',
                            readTime: '12 min'
                        },
                        {
                            title: 'Part 2 - StringBuilder & StringBuffer',
                            url: '/java/core/string/java-string-4.html',
                            icon: 'fas fa-circle-dot',
                            description: 'Mutable string handling',
                            readTime: '12 min'
                        },
                        {
                            title: 'Part 3 - Regular Expressions',
                            url: '/java/core/string/java-regular-expresions.html',
                            icon: 'fas fa-circle-dot',
                            description: 'Pattern matching and regex',
                            readTime: '20 min'
                        }
                    ]
                },
                {
                    id: 'advanced',
                    name: 'Advanced Java Concepts',
                    icon: 'fas fa-rocket',
                    tutorials: [
                        {
                            title: 'Collections Framework',
                            url: '/java/advanced/java_collections_book.html',
                            icon: 'fas fa-database',
                            description: 'List, Set, Map and more',
                            readTime: '30 min'
                        },
                        {
                            title: 'Multithreading',
                            url: '/java/advanced/thread.html',
                            icon: 'fas fa-cogs',
                            description: 'Threads, synchronization, and concurrency',
                            readTime: '25 min'
                        },
                        {
                            title: 'File I/O Part 1',
                            url: '/java/core/file/file-io.html',
                            icon: 'fas fa-file-alt',
                            description: 'Reading and writing files',
                            readTime: '15 min'
                        },
                        {
                            title: 'File I/O Part 2',
                            url: '/java/core/file/file-io-2.html',
                            icon: 'fas fa-file-code',
                            description: 'Advanced file operations',
                            readTime: '15 min'
                        }
                    ]
                }
            ]
        },
        {
            id: 'interview-qna',
            name: 'Interview Q&A',
            icon: 'fas fa-book',
            enabled: true,
            description: 'Prepare for technical interviews with curated Q&A sets',
            indexUrl: '/interview-qna/index.html',
            categories: [
                {
                    id: 'automation',
                    name: 'Test Automation',
                    icon: 'fas fa-robot',
                    tutorials: [
                        {
                            title: 'Automation - Q&A Set 1',
                            url: '/interview-qna/automation/automations-set-1.html',
                            icon: 'fas fa-robot',
                            description: 'Core automation concepts and frameworks',
                            readTime: '25 min'
                        },
                        {
                            title: 'Automation - Q&A Set 2',
                            url: '/interview-qna/automation/automations-set-2.html',
                            icon: 'fas fa-robot',
                            description: 'Advanced automation scenarios',
                            readTime: '25 min'
                        },
                        {
                            title: 'Automation - Q&A Set 3',
                            url: '/interview-qna/automation/automations-set-3.html',
                            icon: 'fas fa-robot',
                            description: 'Expert level automation questions',
                            readTime: '30 min'
                        }
                    ]
                },
                {
                    id: 'testing',
                    name: 'Manual Testing',
                    icon: 'fas fa-vial',
                    tutorials: [
                        {
                            title: 'Testing Q&A',
                            url: '/interview-qna/testing/qa-qna.html',
                            icon: 'fas fa-cogs',
                            description: 'Manual QA testing concepts',
                            readTime: '20 min'
                        }
                    ]
                }
            ]
        },
        {
            id: 'selenium',
            name: 'Selenium',
            icon: 'fas fa-globe',
            enabled: true,
            description: 'Master browser automation with Selenium WebDriver',
            indexUrl: '/selenium/index.html',
            categories: [
                {
                    id: 'getting-started',
                    name: 'Getting Started',
                    icon: 'fas fa-rocket',
                    tutorials: [
                        {
                            title: 'Selenium WebDriver Guide',
                            url: '/selenium/selenium-webdriver-guide.html',
                            icon: 'fas fa-book-open',
                            description: 'Setup, Locators, Waits & Examples',
                            readTime: '20 min'
                        },
                        {
                            title: 'Selenium Advanced Topics',
                            url: '/selenium/selenium-advanced-concepts.html',
                            icon: 'fas fa-book-open',
                            description: 'Alerts, iFrames, JavaScript, File Upload/Download',
                            readTime: '25 min'
                        },
                        {
                            title: 'Selenium with TestNG',
                            url: '/selenium/selenium-testng-integration.html',
                            icon: 'fas fa-vial',
                            description: 'Annotations, Assertions, DataProvider & XML',
                            readTime: '30 min'
                        },
                        {
                            title: 'Page Object Model',
                            url: '/selenium/selenium-page-object-model.html',
                            icon: 'fas fa-sitemap',
                            description: 'Design patterns for test automation',
                            readTime: '35 min'
                        },
                        {
                            title: 'Data-Driven Testing',
                            url: '/selenium/selenium-data-driven-testing.html',
                            icon: 'fas fa-file-excel',
                            description: 'Excel, CSV, JSON & Database integration',
                            readTime: '35 min'
                        },
                        {
                            title: 'Selenium Grid',
                            url: '/selenium/selenium-grid.html',
                            icon: 'fas fa-server',
                            description: 'Parallel execution across browsers',
                            readTime: '40 min'
                        },
                        {
                            title: 'Cucumber BDD',
                            url: '/selenium/selenium-cucumber-bdd.html',
                            icon: 'fas fa-leaf',
                            description: 'Behavior-Driven Development with Gherkin',
                            readTime: '35 min'
                        },
                        {
                            title: 'Hybrid Framework Architecture',
                            url: '/selenium/selenium-framework-architecture.html',
                            icon: 'fas fa-cubes',
                            description: 'Enterprise-grade framework from scratch',
                            readTime: '45 min'
                        }
                    ]
                }
            ]
        },
        {
            id: 'api-testing',
            name: 'API Testing',
            icon: 'fas fa-exchange-alt',
            enabled: true,
            description: 'Master REST API testing with Rest Assured and Java',
            indexUrl: '/api-testing/index.html',
            categories: [
                {
                    id: 'rest-assured',
                    name: 'Rest Assured',
                    icon: 'fas fa-vial',
                    tutorials: [
                        {
                            title: 'Rest Assured Basics',
                            url: '/api-testing/rest-assured-basics.html',
                            icon: 'fas fa-play-circle',
                            description: 'Setup, GET/POST requests, JSON parsing',
                            readTime: '25 min'
                        },
                        {
                            title: 'Request & Response',
                            url: '/api-testing/rest-assured-request-response.html',
                            icon: 'fas fa-arrows-alt-h',
                            description: 'HTTP methods, headers, validation, JsonPath',
                            readTime: '30 min'
                        },
                        {
                            title: 'Authentication',
                            url: '/api-testing/rest-assured-authentication.html',
                            icon: 'fas fa-lock',
                            description: 'Basic Auth, OAuth2, API Keys, Bearer tokens',
                            readTime: '25 min'
                        },
                        {
                            title: 'API Framework Design',
                            url: '/api-testing/rest-assured-framework.html',
                            icon: 'fas fa-cubes',
                            description: 'Building scalable API automation framework',
                            readTime: '35 min'
                        }
                    ]
                }
            ]
        },
        {
            id: 'python',
            name: 'Python',
            icon: 'fab fa-python',
            enabled: false,
            description: 'Python programming tutorials coming soon',
            indexUrl: '/python/index.html',
            categories: []
        },
        {
            id: 'webdev',
            name: 'Web Dev',
            icon: 'fas fa-code',
            enabled: false,
            description: 'Web development tutorials coming soon',
            indexUrl: '/webdev/index.html',
            categories: []
        },
        {
            id: 'datascience',
            name: 'Data Science',
            icon: 'fas fa-chart-bar',
            enabled: false,
            description: 'Data science tutorials coming soon',
            indexUrl: '/datascience/index.html',
            categories: []
        }
    ],

    quickLinks: [
        { name: 'Home', url: '/index.html', icon: 'fas fa-home' },
        { name: 'About', url: '/index.html#about', icon: 'fas fa-user' }
    ],

    social: [
        { name: 'YouTube', url: 'https://www.youtube.com/@TechTok-Cafe', icon: 'fab fa-youtube' },
        { name: 'Medium', url: 'https://medium.com/@sddmhossain786', icon: 'fab fa-medium' },
        { name: 'GitHub', url: 'https://shossain786.github.io', icon: 'fab fa-github' },
        { name: 'Portfolio', url: 'https://saddam-techspace.netlify.app', icon: 'fas fa-globe' }
    ],

    footer: {
        copyright: '2024 GyanCode. All rights reserved.',
        madeWith: 'Made with love and lots of coffee',
        quote: '"Code is like humor. When you have to explain it, it\'s bad." - Cory House'
    }
};

// Helper function to get current domain from URL
function getCurrentDomain() {
    const path = window.location.pathname;
    for (const domain of SITE_NAVIGATION.domains) {
        if (path.startsWith('/' + domain.id + '/')) {
            return domain;
        }
    }
    return null;
}

// Helper function to get current page info
function getCurrentPageInfo() {
    const path = window.location.pathname;
    const domain = getCurrentDomain();

    if (!domain) return null;

    for (const category of domain.categories) {
        for (const tutorial of category.tutorials) {
            if (path === tutorial.url || path.endsWith(tutorial.url)) {
                return {
                    domain: domain,
                    category: category,
                    tutorial: tutorial
                };
            }
        }
    }

    return { domain: domain, category: null, tutorial: null };
}

// Helper function to generate breadcrumb data
function getBreadcrumbData() {
    const pageInfo = getCurrentPageInfo();
    const breadcrumbs = [
        { name: 'Home', url: '/index.html', icon: 'fas fa-home' }
    ];

    if (pageInfo) {
        breadcrumbs.push({
            name: pageInfo.domain.name,
            url: pageInfo.domain.indexUrl,
            icon: pageInfo.domain.icon
        });

        if (pageInfo.category) {
            const categoryUrl = pageInfo.domain.indexUrl.replace('.html', '') + '#' + pageInfo.category.id;
            breadcrumbs.push({
                name: pageInfo.category.name,
                url: categoryUrl
            });
        }

        if (pageInfo.tutorial) {
            breadcrumbs.push({
                name: pageInfo.tutorial.title,
                url: pageInfo.tutorial.url,
                active: true
            });
        }
    }

    return breadcrumbs;
}

// Helper function to get previous/next tutorial links
function getNavLinks() {
    const pageInfo = getCurrentPageInfo();
    if (!pageInfo || !pageInfo.tutorial) return { prev: null, next: null };

    const domain = pageInfo.domain;
    const allTutorials = [];

    for (const category of domain.categories) {
        for (const tutorial of category.tutorials) {
            allTutorials.push(tutorial);
        }
    }

    const currentIndex = allTutorials.findIndex(t => t.url === pageInfo.tutorial.url);

    return {
        prev: currentIndex > 0 ? allTutorials[currentIndex - 1] : null,
        next: currentIndex < allTutorials.length - 1 ? allTutorials[currentIndex + 1] : null
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SITE_NAVIGATION, getCurrentDomain, getCurrentPageInfo, getBreadcrumbData, getNavLinks };
}
