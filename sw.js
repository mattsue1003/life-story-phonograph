/* 時光留聲機：離線也能開。頁面本身「先連網、連不上才用存檔」，所以更新會自動生效。 */
const CACHE='phono-v7';
const SHELL=['./','manifest.webmanifest','vendor/mp4-muxer.js','vendor/lame.min.js','icon-192.png','icon-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET') return;
  const u=new URL(r.url); if(u.protocol!=='http:'&&u.protocol!=='https:') return;
  const same=u.origin===location.origin;
  const put=res=>{ if(res&&(res.ok||res.type==='opaque')){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(r,copy)); } return res; };
  if(same&&(r.mode==='navigate'||u.pathname.endsWith('/')||u.pathname.endsWith('index.html'))){
    e.respondWith(fetch(r).then(put).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))));
  } else if(same||/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)||u.pathname.endsWith('/oth-report-button/report.js')){
    e.respondWith(caches.match(r).then(m=>{ const net=fetch(r).then(put).catch(()=>m); return m||net; }));
  }
});
