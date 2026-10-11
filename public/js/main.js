// DOM selectors
const copyrightYear = document.querySelector('.copyrightYear');
const workLinks = [...document.querySelectorAll('.workLink')];
const photoViewer = document.querySelector('.photoViewer');
const photoViewerImage = document.querySelector('.photoViewerImage');
const photoViewerCaption = document.querySelector('.photoViewerCaption');
const photoViewerCount = document.querySelector('.photoViewerCount');
const photoViewerClose = document.querySelector('.photoViewerClose');
const photoViewerPrev = document.querySelector('.photoViewerPrev');
const photoViewerNext = document.querySelector('.photoViewerNext');

// Which gallery photo the viewer shows, and the link that opened it
let currentPhoto = 0;
let openedFrom = null;

// Helper functions
// Keeps the footer year current without editing the HTML each January
function setCopyrightYear() {
  copyrightYear.textContent = new Date().getFullYear();
}

// Shows one gallery photo in the viewer, wrapping around at either end
function showPhoto(index) {
  currentPhoto = (index + workLinks.length) % workLinks.length;
  const link = workLinks[currentPhoto];
  const thumbnail = link.querySelector('.workPhoto');
  const caption = link.closest('.workItem').querySelector('.workCaption');

  photoViewerImage.src = link.href;
  photoViewerImage.alt = thumbnail.alt;
  photoViewerCaption.textContent = caption.textContent;
  photoViewerCount.textContent = `${currentPhoto + 1} of ${workLinks.length}`;
}

// Main logic / handler functions
function openPhotoViewer(event) {
  event.preventDefault();
  openedFrom = event.currentTarget;
  showPhoto(workLinks.indexOf(openedFrom));
  photoViewer.showModal();
}

function closePhotoViewer() {
  photoViewer.close();
}

function showPreviousPhoto() {
  showPhoto(currentPhoto - 1);
}

function showNextPhoto() {
  showPhoto(currentPhoto + 1);
}

// Left and right arrow keys move through the photos; Esc closing is built into the dialog
function handleViewerKeydown(event) {
  if (event.key === 'ArrowLeft') {
    showPreviousPhoto();
  } else if (event.key === 'ArrowRight') {
    showNextPhoto();
  }
}

// A click on the dark area around the photo lands on the dialog itself
function handleViewerClick(event) {
  if (event.target === photoViewer) {
    closePhotoViewer();
  }
}

// Puts keyboard focus back on the photo the visitor opened
function returnFocus() {
  if (openedFrom) {
    openedFrom.focus();
  }
}

if (copyrightYear) {
  setCopyrightYear();
}

// Event listeners
if (photoViewer) {
  workLinks.forEach((link) => link.addEventListener('click', openPhotoViewer));
  photoViewerClose.addEventListener('click', closePhotoViewer);
  photoViewerPrev.addEventListener('click', showPreviousPhoto);
  photoViewerNext.addEventListener('click', showNextPhoto);
  photoViewer.addEventListener('keydown', handleViewerKeydown);
  photoViewer.addEventListener('click', handleViewerClick);
  photoViewer.addEventListener('close', returnFocus);
}
