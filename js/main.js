document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation elements
    const homeLink = document.querySelector('.home-link');
    const skillsLink = document.querySelector('.skills-link');
    const educationLink = document.querySelector('.education-link');
    const contactLink = document.querySelector('.contact-link');
    const projectsLink = document.querySelector('.projects-link');
    const skillPageBtn = document.querySelector('#skill_page');

    // Get all page elements
    const pages = {
        home: document.getElementById('home-page'),
        skills: document.getElementById('skills-page'),
        education: document.getElementById('education-page'),
        contact: document.getElementById('contact-page'),
        projects: document.getElementById('projects-page')
    };

    // Get navbar elements
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');
    const profileNavLinks = document.querySelectorAll('.profile-nav-link');

    const navbar = document.querySelector('.navbar');

    function updateNavbarStyle() {
        if (document.getElementById('home-page').classList.contains('active')) {
            navbar.classList.add('home-page-nav');
            navbarCollapse.classList.add('justify-content-center');
        } else {
            navbar.classList.remove('home-page-nav');
            navbarCollapse.classList.remove('justify-content-center');
        }
    }

    // Initial check
    updateNavbarStyle();

    // Function to switch pages
    function switchPage(page) {
        // Hide all pages
        Object.values(pages).forEach(p => p.classList.remove('active'));
        
        // Show selected page
        pages[page].classList.add('active');

        // Update navbar visibility
        if (page === 'home') {
            navbarCollapse.classList.add('hide-nav-links');
            navbarCollapse.classList.remove('show-nav-links');
        } else {
            navbarCollapse.classList.remove('hide-nav-links');
            navbarCollapse.classList.add('show-nav-links');
        }

        // Update active state for all navigation links
        const allLinks = [...navLinks, ...profileNavLinks];
        allLinks.forEach(link => {
            link.classList.remove('active');
            if (link.classList.contains(`${page}-link`)) {
                link.classList.add('active');
            }
        });
    updateNavbarStyle();

    }

    // Set initial state
    if (pages.home.classList.contains('active')) {
        navbarCollapse.classList.add('hide-nav-links');
    } else {
        navbarCollapse.classList.add('show-nav-links');
    }

    // Event listeners for navigation
    homeLink?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('home');
    });

    skillsLink?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('skills');
    });

    educationLink?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('education');
    });

    contactLink?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('contact');
    });

    projectsLink?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('projects');
    });

    skillPageBtn?.addEventListener('click', function (e) {
        e.preventDefault();
        switchPage('skills');
    });

    // Profile navigation links
    document.querySelectorAll('.profile-nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.dataset.page || 'home';
            switchPage(page);
        });
    });

    // Animation for skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.classList.add('animate__animated', 'animate__pulse');
        });

        card.addEventListener('mouseleave', function () {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    });

    // Animation for timeline items
    const timelineItems = document.querySelectorAll('.timeline-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__fadeIn');
            }
        });
    }, { threshold: 0.1 });

    timelineItems.forEach(item => observer.observe(item));

    // Project filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            projectItems.forEach(item => {
                item.style.display = item.dataset.category.includes(filterValue) || 
                                    filterValue === 'all' ? 'block' : 'none';
            });
        });
    });
});