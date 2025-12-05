// Tunggu sampai DOM sepenuhnya dimuat
document.addEventListener('DOMContentLoaded', function() {
  
  // Inisialisasi modal
  const motorModal = new bootstrap.Modal(document.getElementById('motorModal'));
  const detailModal = new bootstrap.Modal(document.getElementById('exampleModal'));
  
  // Event listener untuk tombol Produk Kami
  document.getElementById('btnProdukKami').addEventListener('click', function(e) {
    e.preventDefault();
    motorModal.show();
  });
  
  // Event listener untuk setiap card motor di modal
  document.querySelectorAll('.motor-card').forEach(card => {
    card.addEventListener('click', function() {
      const motor = this.getAttribute('data-motor');
      filterMotor(motor);
    });
  });
  
  // Function untuk filter motor
  function filterMotor(motor) {
    // Tutup modal
    motorModal.hide();
    
    // Tunggu sebentar agar modal tertutup dengan smooth
    setTimeout(function() {
      // Scroll ke bagian koleksi
      document.getElementById('koleksi').scrollIntoView({ behavior: 'smooth' });
    }, 300);
    
    // Filter produk
    const products = document.querySelectorAll('.product-item');
    const filterBadge = document.getElementById('filterBadge');
    const resetBtn = document.getElementById('resetBtn');
    
    if (motor === 'Semua') {
      products.forEach(product => {
        product.style.display = 'block';
      });
      filterBadge.textContent = 'Menampilkan: Semua Produk';
      filterBadge.className = 'badge bg-secondary fs-6';
      resetBtn.style.display = 'none';
    } else {
      let count = 0;
      products.forEach(product => {
        if (product.getAttribute('data-motor') === motor) {
          product.style.display = 'block';
          count++;
        } else {
          product.style.display = 'none';
        }
      });
      filterBadge.textContent = 'Menampilkan: ' + motor + ' (' + count + ' produk)';
      filterBadge.className = 'badge bg-primary fs-6';
      resetBtn.style.display = 'inline-block';
    }
  }
  
  // Event listener untuk tombol reset
  document.getElementById('resetBtn').addEventListener('click', function() {
    filterMotor('Semua');
  });
  
  // Event listener untuk tombol detail produk
  document.querySelectorAll('.btnDetail').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      let parent = this.closest('.card');
      
      let gambar = parent.querySelector('.card-img-top').src;
      let harga = parent.querySelector('.harga').innerHTML;
      let judul = parent.querySelector('.card-text').innerHTML;
      let deskripsiElement = parent.querySelector('.deskripsi');
      let deskripsi = deskripsiElement ? deskripsiElement.innerHTML : '<i>tidak ada informasi yang tersedia</i>';
      
      document.querySelector('.modalTitle').innerHTML = judul;
      document.querySelector('.modalDeskripsi').innerHTML = deskripsi;
      document.querySelector('.modalImage').innerHTML = '<img src="' + gambar + '" class="img-fluid rounded" alt="' + judul + '">';
      document.querySelector('.modalHarga').innerHTML = harga;
      
      // Tampilkan modal
      detailModal.show();
    });
  });
  
});