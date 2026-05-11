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

    // 6. Header scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar-custom').addClass('scrolled');
        } else {
            $('.navbar-custom').removeClass('scrolled');
        }
    });

    // Active link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $(`.nav-link-custom[href="${currentPath}"]`).addClass('active');
});
