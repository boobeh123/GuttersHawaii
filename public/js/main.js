document.addEventListener('DOMContentLoaded', () => {
    validateForms();
    initGallery();
});

async function validateForms() {
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
        
        setAriaAttributes(form);
        
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
            
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            
            if (firstInvalid) {
                firstInvalid.focus();
            }
        }
        
        form.classList.add('was-validated');
    };

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

    async function initGallery() {
    // Create modal elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const modalImage = document.createElement('img');
    const modalCaption = document.createElement('div');
    const modalCloseBtn = document.createElement('button');

    // Set Modal classes & attributes 
    modal.className = 'gallery-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Image gallery modal');
    modalContent.className = 'modal-content';
    modalImage.alt = '';
    modalCaption.className = 'modal-caption';
    modalCloseBtn.className = 'close-modal';
    modalCloseBtn.setAttribute('aria-label', 'Close gallery');
    modalCloseBtn.innerHTML = '&times;';

    // Build the Modal structure
    modalContent.appendChild(modalCloseBtn);
    modalContent.appendChild(modalImage);
    modalContent.appendChild(modalCaption);
    modal.appendChild(modalContent);
    document.body.appendChild(modal)
    
    // Iterate through every element with the class of 'gallery-item'
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const caption = item.querySelector('figcaption').textContent;

        // Set attributes for accessibility
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', 'View image ' + (index + 1) + ': ' + caption);

        // Listen for clicks on images with the class of gallery-item
        item.addEventListener('click', () => openModal(img.src, caption));
        // Listen for keypresses (ENTER/SPACE) on images with the class of gallery-item
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openModal(img.src, caption);
            }
        });

        // Listen for clicks & keypresses (ESC) to close modal - Close button or clicking outside of modal/image
        modalCloseBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (event) => {
            if (event.target === modalContent || event.target === modal) {
                closeModal();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    })

    async function openModal(src, caption) {
        modalImage.src = src;
        modalImage.alt = caption;
        modalCaption.textContent = caption;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        modalCloseBtn.focus();
    }
    
    async function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Return focus to the last focused gallery item
        const lastFocused = document.activeElement;
        if (lastFocused && lastFocused.classList.contains('gallery-item')) {
            lastFocused.focus();
        }
        
    }

}

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const style = document.createElement('style');
    style.textContent = `
        .gallery-item,
        .gallery-item img {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}
