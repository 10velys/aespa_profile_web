// Fungsi untuk membuat slider sederhana untuk konten
document.addEventListener('DOMContentLoaded', function() {
    // Mendapatkan semua section dalam #content
    const sections = document.querySelectorAll('#content section');
    
    if (sections.length === 0) return;
    
    // Tambahkan CSS untuk slider
    const sliderStyles = document.createElement('style');
    sliderStyles.textContent = `
      .slider-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
        margin-bottom: 5px;
        background-color: #f6f0ff;
        padding: 8px;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      
      .slider-btn {
        background-color: #4a1164;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
      }
      
      .slider-btn:hover {
        background-color: #6e30a3;
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      
      .slider-btn:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;
      }
      
      #slide-counter {
        font-weight: bold;
        color: #4a1164;
      }
      
      #content section {
        animation: fadeEffect 0.5s;
      }
      
      @keyframes fadeEffect {
        from {opacity: 0;}
        to {opacity: 1;}
      }
      
      .section-container {
        display: none;
      }
      
      .section-container.active {
        display: block;
      }
    `;
    document.head.appendChild(sliderStyles);
    
    // Variabel untuk melacak slide saat ini
    let currentSlide = 0;
    
    // Buat wadah untuk setiap section dan tambahkan kontrol
    sections.forEach((section, index) => {
      // Buat container untuk section
      const sectionContainer = document.createElement('div');
      sectionContainer.className = 'section-container';
      sectionContainer.id = `section-container-${index}`;
      
      // Pindahkan section ke dalam container baru
      section.parentNode.insertBefore(sectionContainer, section);
      sectionContainer.appendChild(section);
      
      // Buat kontrol slider untuk setiap section
      const sliderControls = document.createElement('div');
      sliderControls.className = 'slider-controls';
      sliderControls.innerHTML = `
        <button class="slider-btn prev-slide" ${index === 0 ? 'disabled' : ''}>&laquo; Prev</button>
        <span class="slide-counter">${index + 1}/${sections.length}</span>
        <button class="slider-btn next-slide" ${index === sections.length - 1 ? 'disabled' : ''}>Next &raquo;</button>
      `;
      
      // Tambahkan kontrol ke container
      sectionContainer.appendChild(sliderControls);
    });
    
    // Fungsi untuk menampilkan slide
    function showSlide(index) {
      // Sembunyikan semua section container
      document.querySelectorAll('.section-container').forEach(container => {
        container.classList.remove('active');
      });
      
      // Tampilkan section container yang aktif
      const activeContainer = document.getElementById(`section-container-${index}`);
      activeContainer.classList.add('active');
      
      // Scroll ke atas section jika perlu
      activeContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      // Update current slide
      currentSlide = index;
    }
    
    // Event listener untuk tombol navigasi
    document.querySelectorAll('.prev-slide').forEach(button => {
      button.addEventListener('click', function() {
        if (currentSlide > 0) {
          showSlide(currentSlide - 1);
        }
      });
    });
    
    document.querySelectorAll('.next-slide').forEach(button => {
      button.addEventListener('click', function() {
        if (currentSlide < sections.length - 1) {
          showSlide(currentSlide + 1);
        }
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowLeft' && currentSlide > 0) {
        showSlide(currentSlide - 1);
      } else if (event.key === 'ArrowRight' && currentSlide < sections.length - 1) {
        showSlide(currentSlide + 1);
      }
    });
    
    // Inisialisasi tampilan pertama
    showSlide(0);
});