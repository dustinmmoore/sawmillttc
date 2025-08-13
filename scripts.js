// Set current month on page load
document.addEventListener('DOMContentLoaded', () => {
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 
                  'july', 'august', 'september', 'october', 'november', 'december'];
    const currentMonth = months[new Date().getMonth()];
    
    // Remove active class from all buttons and sections
    document.querySelectorAll('.month-navigation .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.timeline-month').forEach(month => {
        month.style.display = 'none';
        month.classList.remove('active');
    });
    
    // Set active month
    const currentButton = document.querySelector(`.month-navigation .btn[data-month="${currentMonth}"]`);
    const currentSection = document.getElementById(`${currentMonth}-events`);
    
    if (currentButton && currentSection) {
        currentButton.classList.add('active');
        currentSection.style.display = 'block';
        currentSection.classList.add('active');
    }
});

// Month Navigation
document.querySelectorAll('.month-navigation .btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.month-navigation .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all month sections
        document.querySelectorAll('.timeline-month').forEach(month => {
            month.style.display = 'none';
            month.classList.remove('active');
        });
        
        // Show selected month section
        const monthId = button.getAttribute('data-month') + '-events';
        const selectedSection = document.getElementById(monthId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
            selectedSection.classList.add('active');
        }
    });
});

// Range Day Tooltips
document.querySelectorAll('.calendar-grid div').forEach(day => {
    if (!day.classList.contains('prev-month') && !day.classList.contains('next-month')) {
        day.addEventListener('mouseover', (e) => {
            const status = day.classList.contains('available') ? 'Available' : 'Unavailable';
            const month = day.closest('.timeline-month').id.split('-')[0];
            const tooltip = document.createElement('div');
            tooltip.className = 'range-tooltip';
            tooltip.textContent = `${month.charAt(0).toUpperCase() + month.slice(1)} ${day.textContent}: ${status}`;
            document.body.appendChild(tooltip);
            
            const rect = day.getBoundingClientRect();
            tooltip.style.top = rect.top - 30 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        });

        day.addEventListener('mouseout', () => {
            document.querySelector('.range-tooltip')?.remove();
        });
    }
});
