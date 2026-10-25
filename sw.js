const C='kaye-cache-v1';
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['./','./index.html'])).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const tf=r=>new Promise((res,rej)=>{const t=setTimeout(()=>rej(new Error('timeout')),3500);fetch(r).then(x=>{clearTimeout(t);res(x)},err=>{clearTimeout(t);rej(err)})});
self.addEventListener('fetch',e=>{
 const r=e.request;
 if(r.method!=='GET')return;
 if(new URL(r.url).origin!==location.origin)return;
 e.respondWith(tf(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||caches.match('./index.html'))));
});
