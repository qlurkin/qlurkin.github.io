const version = 6

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open('static-v'+version) // use another cache
		.then(cache => cache.addAll([
			'/index.html',
			'/style.css',
			'/app.js',
			'/manifest.json'
		]))
	)
	self.skipWaiting() // control page immediately
})

const expectedCaches = [
	'static-v'+version,
	'dynamic'
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

	self.clients.claim() // control all current clients (tabs)
})

self.addEventListener('fetch', event => {
	const url = new URL(event.request.url)

	if(url.pathname.startsWith('/api/')) {
		staleWhileRevalidate(event)
		return
	}

	cacheFirst(event)
})

function staleWhileRevalidate(event) {
	const networkFetch = fetch(event.request)
	event.waitUntil(
		networkFetch.then(response => {
			const responseClone = response.clone()
			caches.open('dynamic')
				.then(cache => cache.put(event.request, responseClone))
		})
	)

	event.respondWith(
		caches.match(event.request)
			.then(response => response || networkFetch)
	)
}

function cacheFirst(event) {
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request))
	)
}