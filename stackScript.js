// DOM Elements
const barChartContainer = document.getElementById('barChart');
const funnelChartContainer = document.getElementById('funnelChart');

// Sample data for charts
const barChartData = [
    { month: 'JAN', value: 45000 },
    { month: 'FEB', value: 52000 },
    { month: 'MAR', value: 48000 },
    { month: 'APR', value: 61000 },
    { month: 'MAY', value: 55000 },
    { month: 'JUN', value: 67000 },
    { month: 'JUL', value: 71000 },
    { month: 'AUG', value: 59000 },
    { month: 'SEP', value: 63000 },
    { month: 'OCT', value: 58000 },
    { month: 'NOV', value: 65000 },
    { month: 'DEC', value: 69000 }
];

// Initialize charts
function initializeCharts() {
    createBarChart();
    createFunnelChart();
    animateCounters();
}

// Create bar chart
function createBarChart() {
    const maxValue = Math.max(...barChartData.map(item => item.value));
    
    barChartData.forEach((item, index) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        
        const height = (item.value / maxValue) * 180; // Max height 180px
        bar.style.height = `${height}px`;
        bar.style.animationDelay = `${index * 0.1}s`;
        
        // Add hover effect with value display
        bar.title = `${item.month}: $${item.value.toLocaleString()}`;
        
        barChartContainer.appendChild(bar);
    });
}

// Create funnel chart (visual representation)
function createFunnelChart() {
    const levels = [
        { label: '$37K', position: '10%' },
        { label: '$20K', position: '35%' },
        { label: '$28K', position: '65%' },
        { label: '$31K', position: '85%' }
    ];
    
    levels.forEach(level => {
        const label = document.createElement('div');
        label.textContent = level.label;
        label.style.position = 'absolute';
        label.style.right = '10px';
        label.style.top = level.position;
        label.style.color = '#ffffff';
        label.style.fontSize = '12px';
        label.style.fontWeight = 'bold';
        label.style.background = 'rgba(0, 0, 0, 0.3)';
        label.style.padding = '2px 6px';
        label.style.borderRadius = '4px';
        
        funnelChartContainer.appendChild(label);
    });
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.stat-value');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.textContent.includes('$')) {
                counter.textContent = `$${Math.floor(current).toLocaleString()}`;
            } else {
                counter.textContent = Math.floor(current).toLocaleString();
            }
        }, 20);
    });
}

// Filter functionality
function setupFilters() {
    const filterSelects = document.querySelectorAll('.filter-group select');
    const filterInputs = document.querySelectorAll('.filter-group input');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilterChange);
    });
    
    filterInputs.forEach(input => {
        input.addEventListener('change', handleFilterChange);
    });
}

function handleFilterChange(event) {
    console.log('Filter changed:', event.target.name, event.target.value);
    // Add your filter logic here
    updateTableData();
}

// Table functionality
function updateTableData() {
    // Sample function to update table based on filters
    // In a real application, this would fetch data from an API
    console.log('Updating table data based on current filters...');
}

// Search functionality
function setupSearch() {
    const searchInput = document.querySelector('.search-bar input');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        console.log('Searching for:', searchTerm);
        // Add your search logic here
    });
}

// Navigation functionality
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-menu li');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all items
            navItems.forEach(navItem => navItem.classList.remove('active'));
            // Add active class to clicked item
            item.classList.add('active');
            
            console.log('Navigated to:', item.textContent.trim());
        });
    });
}

// Time filter functionality for charts
function setupTimeFilters() {
    const timeFilters = document.querySelectorAll('.time-filter');
    
    timeFilters.forEach(filter => {
        filter.addEventListener('change', (e) => {
            console.log('Time filter changed:', e.target.value);
            // Add logic to update charts based on time filter
            updateCharts(e.target.value);
        });
    });
}

function updateCharts(timeFilter) {
    // Clear existing charts
    barChartContainer.innerHTML = '';
    
    // Recreate charts with new data based on time filter
    // This is where you would typically fetch new data from an API
    createBarChart();
    
    console.log(`Charts updated for ${timeFilter} view`);
}

// Responsive sidebar toggle
function setupResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    let isCollapsed = window.innerWidth <= 768;
    
    if (isCollapsed) {
        sidebar.classList.add('collapsed');
    }
    
    window.addEventListener('resize', () => {
        const newIsCollapsed = window.innerWidth <= 768;
        if (newIsCollapsed !== isCollapsed) {
            isCollapsed = newIsCollapsed;
            if (isCollapsed) {
                sidebar.classList.add('collapsed');
            } else {
                sidebar.classList.remove('collapsed');
            }
        }
    });
}

// Theme toggle functionality (bonus feature)
function setupThemeToggle() {
    // This could be extended to support light/dark theme switching
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize dashboard
function initializeDashboard() {
    console.log('Initializing Stack Logix Dashboard...');
    
    // Initialize all components
    initializeCharts();
    setupFilters();
    setupSearch();
    setupNavigation();
    setupTimeFilters();
    setupResponsiveSidebar();
    setupThemeToggle();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Dashboard loaded successfully!', 'success');
    }, 1000);
    
    console.log('Dashboard initialization complete!');
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializeDashboard);

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    .bar {
        opacity: 0;
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .stat-card {
        opacity: 0;
        animation: fadeIn 0.8s ease forwards;
    }
    
    .stat-card:nth-child(1) { animation-delay: 0.1s; }
    .stat-card:nth-child(2) { animation-delay: 0.2s; }
    .stat-card:nth-child(3) { animation-delay: 0.3s; }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .sidebar.collapsed {
        width: 70px;
    }
    
    .sidebar.collapsed .nav-menu li span,
    .sidebar.collapsed .logo h2,
    .sidebar.collapsed .nav-title {
        display: none;
    }
`;
document.head.appendChild(style);