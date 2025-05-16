// Wait for the DOM to fully load before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Get the form element
    const form = document.getElementById('registrationForm');
    
    // Add event listener for form submission
    form.addEventListener('submit', function(event) {
        // Prevent the default form submission
        event.preventDefault();
        
        // Get form field values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        // Track validation status
        let isValid = true;
        
        // Validate Full Name
        if (fullName === '') {
            showError('fullName', 'Full Name is required.');
            isValid = false;
        } else {
            hideError('fullName');
        }
        
        // Validate Email Address
        // First check if it's a valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address.');
            isValid = false;
        } else {
            // Then check if it's from an allowed domain
            const allowedDomains = ['gmail.com', 'research.iiit.ac.in', 'students.iiit.ac.in'];
            const domain = email.split('@')[1];
            
            if (!allowedDomains.includes(domain)) {
                showError('email', 'Email must end with @gmail.com, @research.iiit.ac.in, or @students.iiit.ac.in');
                isValid = false;
            } else {
                hideError('email');
            }
        }
        
        // Validate Password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            showError('password', 'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, and one number.');
            isValid = false;
        } else {
            hideError('password');
        }
        
        // Validate Confirm Password
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Passwords do not match.');
            isValid = false;
        } else {
            hideError('confirmPassword');
        }
        
        // If all validations pass, show success message and reset form
        if (isValid) {
            alert('Registration successful!');
            form.reset();
        }
    });
    
    // Add input event listeners to clear error messages when user corrects input
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            hideError(this.id);
        });
    });
    
    // Function to show error message
    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    // Function to hide error message
    function hideError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.style.display = 'none';
    }
});