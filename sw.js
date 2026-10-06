const CACHE_NAME = 'lp-pwa-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/api.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600&display=swap',
  'https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js'
];

// ติดตั้ง Service Worker และบันทึกไฟล์ลง Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .catch(err => console.log('Cache install error:', err))
  );
});

// ดึงข้อมูลจาก Cache ก่อน ถ้าไม่มีค่อยดึงจากเน็ต
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

// ลบ Cache เก่าเมื่อมีการอัปเดตเวอร์ชัน
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});