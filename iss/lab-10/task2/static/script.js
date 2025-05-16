// Function 1: Theme Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Get theme toggle button
    const themeToggle = document.getElementById('theme-toggle');
    
    // Check if theme toggle button exists (only on home page)
    if (themeToggle) {
        // Check if user has a saved preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
        
        // Add event listener to theme toggle button
        themeToggle.addEventListener('click', function() {
            // Toggle dark theme class on body
            document.body.classList.toggle('dark-theme');
            
            // Save preference to localStorage
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }
    
    // Always check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Function 2: Print Resume functionality
    const printResumeBtn = document.getElementById('print-resume');
    if (printResumeBtn) {
        printResumeBtn.addEventListener('click', function() {
            window.print();
        });
    }
});

// Card highlight effect for hobbies page
function highlightCard(card) {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 15px 20px rgba(0,0,0,0.2)';
}

function resetCard(card) {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
}
