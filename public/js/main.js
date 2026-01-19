document.addEventListener('DOMContentLoaded', () => {
    const yearSpan = document.querySelector('#copyright');
    if (yearSpan) {
        yearSpan.innerHTML = `&copy; ${new Date().getFullYear()} Gutters Hawaii LLC. All rights reserved.`;
    }
});