const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let currentIndex = 0;

function showImage(index) {
    if (index >= galleryItems.length) currentIndex = 0;
    else if (index < 0) currentIndex = galleryItems.length - 1;
    else currentIndex = index;
    lightboxImg.src = galleryItems[currentIndex].src;
}

galleryItems.forEach((item, index) => {
    item.onclick = () => {
        lightbox.style.display = 'flex';
        showImage(index);
    };
});

closeBtn.onclick = () => lightbox.style.display = 'none';
nextBtn.onclick = () => showImage(currentIndex + 1);
prevBtn.onclick = () => showImage(currentIndex - 1);

// Close lightbox on outside click
lightbox.onclick = (e) => { if (e.target === lightbox) lightbox.style.display = 'none'; };