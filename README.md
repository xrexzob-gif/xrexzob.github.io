# xrexzob - Official Website & Store

Website resmi **xrexzob** (Developer, Custom 3D Game Maps & Jasa Suntik Sosmed).

- **WhatsApp:** 083135445588
- **Instagram:** [@xrexzob](https://www.instagram.com/xrexzob?srtk=cTV1ODZxcHM5dGVl)
- **Live Demo / Web:** `https://xrexzob.github.io`

---

## 🚀 Cara Pasang / Deploy ke GitHub Pages

Proyek ini sudah dilengkapi dengan file otomatisasi `.github/workflows/deploy.yml` dan konfigurasi Vite `base: './'`.

### Langkah-langkah:

1. **Buka GitHub dan Buat Repositori Baru**:
   - Nama repo: `xrexzob.github.io` (atau nama lain pilihan Anda).
   - Pilih opsi **Public**.

2. **Jalankan Perintah di Terminal Komputer Anda**:
   ```bash
   # Inisialisasi Git
   git init

   # Tambahkan semua file
   git add .

   # Buat commit
   git commit -m "feat: website resmi xrexzob"

   # Pindah ke branch main
   git branch -M main

   # Hubungkan ke repository GitHub Anda
   git remote add origin https://github.com/xrexzob/xrexzob.github.io.git

   # Push ke GitHub
   git push -u origin main
   ```

3. **Aktifkan GitHub Pages**:
   - Buka tab **Settings** di repository GitHub Anda.
   - Klik menu **Pages** di bilah kiri.
   - Di bagian **Build and deployment > Source**, pilih **GitHub Actions**.

4. **Selesai!**
   Website Anda otomatis aktif di alamat `https://xrexzob.github.io` dalam 1-2 menit.
