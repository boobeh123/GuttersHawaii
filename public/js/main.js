async function validateForms() {
    'use strict'

    const forms = document.querySelectorAll('.needs-validation')

    // Dynamically set ARIA attributes
    const setAriaAttributes = (form) => {
        const fields = form.querySelectorAll('input, textarea, select');
        fields.forEach(element => {
            element.removeAttribute('aria-invalid');
            
            if (element.required && !element.value.trim()) {
                element.setAttribute('aria-invalid', 'true');
            } 

            else if (!element.checkValidity()) {
                element.setAttribute('aria-invalid', 'true');
            }
        });
    };

    // Form functionality
    const handleFormSubmit = (form, event) => {
        // Call for dynamic ARIA update
        setAriaAttributes(form);
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            // Focus on first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        
        form.classList.add('was-validated');
    };

    // Initialize form validation
    Array.from(forms).forEach(form => {
        form.addEventListener('input', (event) => {
            const input = event.target;
            if (input.matches('input, textarea, select')) {
                if (input.checkValidity()) {
                    input.removeAttribute('aria-invalid');
                } else {
                    input.setAttribute('aria-invalid', 'true');
                }
            }
        });
        
        form.addEventListener('submit', (event) => {
            handleFormSubmit(form, event);
        }, false);
    });
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', validateForms);