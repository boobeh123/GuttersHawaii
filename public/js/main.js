// DOM selectors
const copyrightYear = document.querySelector('.copyrightYear');

// Helper functions
// Keeps the footer year current without editing the HTML each January
function setCopyrightYear() {
  copyrightYear.textContent = new Date().getFullYear();
}

// Main logic
if (copyrightYear) {
  setCopyrightYear();
}
