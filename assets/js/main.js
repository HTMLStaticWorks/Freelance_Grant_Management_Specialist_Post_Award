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
    const updateRTLIcon = (dir) => {
        const rtlIcon = document.querySelector('#rtl-toggle i');
        if (rtlIcon) {
            rtlIcon.className = dir === 'rtl' ? 'fas fa-align-left' : 'fas fa-align-right';
        }
    };

    $('#rtl-toggle').on('click', function() {
        const html = document.documentElement;
        const currentDir = html.getAttribute('dir');
        const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
        html.setAttribute('dir', newDir);
        localStorage.setItem('grantpro-dir', newDir);
        updateRTLIcon(newDir);
    });

    const savedDir = localStorage.getItem('grantpro-dir') || 'ltr';
    document.documentElement.setAttribute('dir', savedDir);
    updateRTLIcon(savedDir);

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

    // 12. Predictive Burn Rates Interactive Features
    initPredictiveBurnRates();
});

function initPredictiveBurnRates() {
    // Simulate real-time updates
    setInterval(updateBurnRateMetrics, 10000); // Update every 10 seconds
    
    // Button interactions
    $('.predictive-burn-rates .btn-primary').on('click', function() {
        showFullForecast();
    });
    
    $('.predictive-burn-rates .btn-outline-primary').on('click', function() {
        downloadBurnRateReport();
    });
}

function updateBurnRateMetrics() {
    // Simulate real-time data changes
    const currentBurn = (Math.random() * 10 + 40).toFixed(1);
    const runway = Math.floor(Math.random() * 20 + 55);
    const overSpend = (Math.random() * 5 + 6).toFixed(1);
    
    $('.predictive-burn-rates .h4').each(function(index) {
        const $this = $(this);
        $this.addClass('updating');
        
        setTimeout(function() {
            switch(index) {
                case 0:
                    $this.text(`$${currentBurn}K`);
                    break;
                case 1:
                    $this.text(`${runway} days`);
                    break;
                case 2:
                    $this.text(`$${overSpend}K`);
                    break;
            }
            $this.removeClass('updating');
        }, 300);
    });
    
    // Update last updated time
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    $('.predictive-burn-rates .small.text-secondary').last().text(`Last updated: ${timeString}`);
}

function showFullForecast() {
    // Create modal for full forecast
    const modalHtml = `
        <div class="modal fade" id="forecastModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">AI Burn Rate Forecast - 60 Day Outlook</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="alert alert-warning">
                            <i data-lucide="alert-triangle" class="me-2"></i>
                            <strong>Warning:</strong> Current trajectory indicates $8.7K over-spend in 60 days
                        </div>
                        
                        <h6>Key Insights</h6>
                        <ul>
                            <li>Marketing spend trending 23% above budget allocation</li>
                            <li>Personnel costs within acceptable variance (±5%)</li>
                            <li>Operational expenses showing seasonal increase</li>
                        </ul>
                        
                        <h6>Recommended Actions</h6>
                        <ol>
                            <li>Reduce Q4 marketing budget by 15% immediately</li>
                            <li>Delay non-essential operational purchases</li>
                            <li>Consider bridge funding of $10K within 45 days</li>
                        </ol>
                        
                        <div class="progress mt-3">
                            <div class="progress-bar bg-danger" style="width: 75%">75% of budget consumed</div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="downloadBurnRateReport()">Download Full Report</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Remove existing modal if present
    $('#forecastModal').remove();
    
    // Add and show new modal
    $('body').append(modalHtml);
    lucide.createIcons();
    
    const modal = new bootstrap.Modal(document.getElementById('forecastModal'));
    modal.show();
}

function downloadBurnRateReport() {
    // Generate CSV report
    const csvContent = generateBurnRateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `burn-rate-report-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Burn rate report downloaded successfully');
}

function generateBurnRateCSV() {
    const headers = 'Date,Current Burn,Runway Days,Projected Over-spend,Status\n';
    const data = [];
    const today = new Date();
    
    for (let i = 0; i < 60; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const burn = (45.2 + (i * 0.15)).toFixed(2);
        const runway = Math.max(0, 62 - i);
        const overSpend = Math.max(0, (i - 45) * 0.19).toFixed(2);
        const status = runway < 30 ? 'Critical' : runway < 60 ? 'Warning' : 'Normal';
        
        data.push(`${date.toISOString().split('T')[0]},${burn},${runway},${overSpend},${status}`);
    }
    
    return headers + data.join('\n');
}

function showNotification(message) {
    const notification = $(`
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 9999;">
            <div class="toast show" role="alert">
                <div class="toast-header">
                    <i data-lucide="check-circle" class="text-success me-2"></i>
                    <strong class="me-auto">Success</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
                </div>
                <div class="toast-body">
                    ${message}
                </div>
            </div>
        </div>
    `);
    
    $('body').append(notification);
    lucide.createIcons();
    
    setTimeout(function() {
        notification.fadeOut(function() {
            notification.remove();
        });
    }, 3000);
}

// Add CSS for updating animation
const style = document.createElement('style');
style.textContent = `
    .predictive-burn-rates .h4.updating {
        opacity: 0.5;
        transition: opacity 0.3s ease;
    }
`;
document.head.appendChild(style);
