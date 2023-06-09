const version = 3

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
	'dynamic-v'+version,
	'data'
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

	if(url.pathname.startsWith('/students')) {
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
			caches.open('data')
				.then(cache => cache.put(event.request, responseClone))
		})
		.catch(()=>{})
	)

	event.respondWith(
		caches.match(event.request)
			.then(response => response || networkFetch)
			.catch(()=>{})
	)
}

function cacheFirst(event) {
	event.respondWith(
		caches.match(event.request)
			.then(response => response || fetch(event.request)
				.then(response => {
					const responseClone = response.clone()
					caches.open('dynamic-v'+version)
						.then(cache => cache.put(event.request, responseClone))
					return response
				})
				.catch(()=>{})
			)
	)
}