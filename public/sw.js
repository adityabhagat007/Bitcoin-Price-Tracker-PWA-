self.addEventListener('install',(event)=>{
console.log('installing service work',event);
})

self.addEventListener('activate',(event)=>{
    console.log('activating service worker',event);
    return self.clients.claim();
})

self.addEventListener('fetch',(event)=>{
    console.log("fetching service worker",event);
    event.respondWith(fetch(event.request));
})