const CACHE='bdflow-v3';
self.addEventListener('install',e=>{self.skipWaiting();});
self.addEventListener('activate',e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>{if(k!==CACHE)return caches.delete(k);})))
    .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',e=>{
  if(e.request.url.includes('generativelanguage.googleapis.com'))return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
