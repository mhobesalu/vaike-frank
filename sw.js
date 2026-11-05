const C='vaikefrank-8fcb53265a';const F=["./", "index.html", "manifest.webmanifest", "icon-180.png", "icon-192.png", "icon-512.png"];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'reload'})))))});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 if(new URL(e.request.url).pathname.endsWith('version.json'))return;
 if(e.request.mode==='navigate'){e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put('./',cp));return r}).catch(()=>caches.match('./')))}
 else e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});
