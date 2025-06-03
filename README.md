# PWA Iframe Proxy

Progressive Web App untuk menampilkan website lain menggunakan iframe dengan berbagai proxy service.

## Fitur

- ✅ Progressive Web App (PWA) - dapat diinstall
- ✅ Multiple proxy services (AllOrigins, CORS Proxy, ThingProxy, CrossOrigin.me)
- ✅ Responsive design (desktop & mobile)
- ✅ Fullscreen mode
- ✅ Loading states & error handling
- ✅ Keyboard shortcuts
- ✅ Local storage untuk menyimpan pengaturan
- ✅ Service Worker untuk offline functionality

## Instalasi

1. Clone atau download project ini
2. Upload semua file ke web server
3. Akses melalui browser
4. Install sebagai PWA (jika didukung browser)

## Struktur File

```
PWA-IFRAME-PROXY/
├── index.html          # Halaman utama
├── manifest.json       # PWA manifest
├── sw.js              # Service Worker
├── css/
│   ├── styles.css     # Stylesheet utama
│   └── responsive.css # Responsive styles
├── js/
│   ├── app.js         # Logic aplikasi utama
│   ├── proxy.js       # Proxy management
│   └── utils.js       # Utility functions
└── icons/             # Icon PWA (perlu dibuat)
```

## Cara Penggunaan

1. Masukkan URL website target
2. Pilih proxy service yang diinginkan
3. Klik "Muat" untuk memuat website
4. Gunakan tombol kontrol untuk refresh, fullscreen, atau demo

## Keyboard Shortcuts

- `Enter` - Load website
- `F11` - Toggle fullscreen
- `F5` / `Ctrl+R` - Refresh
- `Escape` - Exit fullscreen

## Catatan Penting

⚠️ **Limitasi Teknis:**
- Beberapa website memblokir iframe (X-Frame-Options)
- JavaScript mungkin tidak berfungsi sempurna
- Proxy services memiliki rate limiting
- Authentication/login mungkin bermasalah

⚠️ **Aspek Legal:**
- Gunakan hanya untuk tujuan yang sah
- Hormati terms of service website target
- Jangan gunakan untuk phishing atau aktivitas ilegal

## Requirements

- Web server (Apache, Nginx, atau hosting)
- Browser modern dengan dukungan PWA
- HTTPS (diperlukan untuk PWA dan Service Worker)

## Development

Untuk development lokal, gunakan server seperti:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

## License

MIT License - Gunakan dengan bijak dan bertanggung jawab.
