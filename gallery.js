// Gallery page script: fading slideshow effect for images in the 'image' folder
const slideshowImage = document.getElementById('slideshowImage');

// List your image filenames here. Add more as you upload them to the 'image' folder below.
// Example: 'background.jpg', 'logo.jpg', 'event1.jpg', 'classroom.png', ...
const imageFiles = [
  'background.jpg',
  'logo.jpg',
  // Add your new image filenames below this line:
  // 'yourphoto1.jpg',
  // 'yourphoto2.png',
];

let currentIndex = 0;

function showImage(index) {
  if (!slideshowImage) return;
  slideshowImage.style.opacity = 0;
  setTimeout(() => {
    const filename = imageFiles[index];
    slideshowImage.src = `image/${filename}`;
    slideshowImage.alt = filename.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    slideshowImage.style.opacity = 1;
  }, 400);
}

function startSlideshow() {
  if (imageFiles.length === 0 || !slideshowImage) return;
  showImage(currentIndex);
  setInterval(() => {
    currentIndex = (currentIndex + 1) % imageFiles.length;
    showImage(currentIndex);
  }, 2500); // Change image every 2.5 seconds
}

startSlideshow();
