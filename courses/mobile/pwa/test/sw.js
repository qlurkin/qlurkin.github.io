const version = 2

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v'+version) // use another cache
		.then(cache => cache.addAll([
			'/offline.html'
		]))
	)
	self.skipWaiting() // control page immediately
})

const expectedCaches = [
	'static-v'+version
]

self.addEventListener('activate', event => {
	event.waitUntil(
		// Cleanup old cache
		caches.keys().then(cacheNames =>{
			return Promise.all(
				cacheNames.map(cacheName => {
					if(!expectedCaches.includes(cacheName)) {
						return caches.delete(cacheName)
					}
				})
			)
		})
	)
})

self.addEventListener('fetch', event => {
	event.respondWith(
		fetch(event.request)
		.catch(() => {
			if(event.request.mode == 'navigate') {
				return caches.match('offline.html')
			}
		})
	)
})