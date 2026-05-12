$(document).ready(function() {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 3. Theme Toggle Logic
    const toggleTheme = () => {
        const body = document.body;
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('grantpro-theme', newTheme);
        updateIcons(newTheme);
    };

    const updateIcons = (theme) => {
        const icon = document.querySelector('#theme-toggle-icon');
        if (icon) {
            icon.setAttribute('data-lucide', theme === 'dark' ? 'sun' : 'moon');
            lucide.createIcons();
        }
    };

    // Load saved theme
    const savedTheme = localStorage.getItem('grantpro-theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    updateIcons(savedTheme);

    $('#theme-toggle').on('click', toggleTheme);

    // 4. RTL Toggle Logic
    $('#rtl-toggle').on('click', function() {
        const html = document.documentElement;
        const currentDir = html.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', newDir);
        localStorage.setItem('grantpro-dir', newDir);
    });

    const savedDir = localStorage.getItem('grantpro-dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);

    // 5. Reset Reveal Elements (Make them visible immediately)
    $('.reveal-up').css({ 'opacity': 1, 'transform': 'none' });

    // 6. Header scroll effect & Back to Top visibility
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar-custom').addClass('scrolled');
        } else {
            $('.navbar-custom').removeClass('scrolled');
        }

        if ($(window).scrollTop() > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
    });

    // 7. Back to Top Click
    $('body').append('<button id="back-to-top" title="Back to Top"><i data-lucide="arrow-up"></i></button>');
    lucide.createIcons();

    $('#back-to-top').on('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 8. Active link highlighting
    let currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    // Normalize path for comparisons
    if (currentPath === '') currentPath = 'index.html';
    
    console.log('Current Path:', currentPath);

    // Top Nav
    $('.nav-link-custom').removeClass('active');
    $(`.nav-link-custom[href="${currentPath}"], .nav-link-custom[href="./${currentPath}"]`).addClass('active');

    // Dashboard Sidebar
    $('.sidebar-link').removeClass('active');
    $(`.sidebar-link[href="${currentPath}"], .sidebar-link[href="./${currentPath}"]`).addClass('active');
    
    // Special case for dashboard root
    if (currentPath === 'dashboard.html' || currentPath.includes('db-')) {
        $('.nav-link-custom[href="dashboard.html"]').addClass('active');
    }

    // 9. Dashboard Mobile Nav Toggle
    $('#mobile-nav-toggle').on('click', function(e) {
        e.stopPropagation();
        $('.sidebar').addClass('active');
        $('#sidebar-overlay').addClass('active');
    });

    $('#sidebar-overlay, .sidebar-link').on('click', function() {
        $('.sidebar').removeClass('active');
        $('#sidebar-overlay').removeClass('active');
    });

    // 10. Global Search Shortcut (Ctrl+K)
    $(document).on('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            $('.topbar input').focus();
        }
    });

    // 11. Tooltip & Popover Initialization (if any)
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
