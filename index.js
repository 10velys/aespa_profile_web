// Variabel untuk bagian hero banner
let currentBannerIndex = 0;
const hero_slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

// Variabel untuk carousel di aside
let currentCarouselIndex = 0;
const carousel_slides = document.querySelectorAll(".carousel-card");
const totalSlides = carousel_slides.length;
const carousel = document.getElementById("carousel");
const caption = document.getElementById("carousel-caption");
const captions = ["Produk 1", "Produk 2", "Produk 3"];

// Fungsi untuk slider hero banner
function changeSlide(index) {
    hero_slides[currentBannerIndex].classList.remove("active");
    dots[currentBannerIndex].classList.remove("active");
    currentBannerIndex = index;
    hero_slides[currentBannerIndex].classList.add("active");
    dots[currentBannerIndex].classList.add("active");
}

function autoSlide() {
    let nextIndex = (currentBannerIndex + 1) % hero_slides.length;
    changeSlide(nextIndex);
}

// Auto slider untuk hero banner
setInterval(autoSlide, 4000); // Ganti gambar setiap 4 detik

// Fungsi untuk carousel di aside
function moveSlide(n) {
    currentCarouselIndex = (currentCarouselIndex + n + totalSlides) % totalSlides;
    updateCarousel();
}

function setSlide(n) {
    currentCarouselIndex = n;
    updateCarousel();
}

function updateCarousel() {
    let cardWidth = document.querySelector('.carousel-card').offsetWidth; // Ambil lebar penuh kartu
    carousel.style.transform = `translateX(-${currentCarouselIndex * cardWidth}px)`; // Perbaikan di sini - menggunakan backticks
    caption.innerText = captions[currentCarouselIndex];
}

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set caption pertama
    caption.innerText = captions[0];
    
    // Resize handler untuk memastikan carousel tetap responsif
    window.addEventListener('resize', function() {
        updateCarousel();
    });
    
    // Initial update
    updateCarousel();
});