const staticCacheName = 'restaurant-static-v1';
//install primes sw cache with resources that should be available offline
self.addEventListener('install', function(event) {
	//waits for installation to finish
	console.log('Worker: install event in progress.')
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/data/restaurants.json',
				'/js/dbhelper.js',
				'/js/sw_register.js',
				'/js/main.js',
				'/js/restaurant_info.js',
				'/img/1.jpg',
				'/img/2.jpg',
				'/img/3.jpg',
				'/img/4.jpg',
				'/img/5.jpg',
				'/img/6.jpg',
				'/img/7.jpg',
				'/img/8.jpg',
				'/img/9.jpg',
				'/img/10.jpg'
				]).then(function() {
					console.log('Worker: install completed')
				}).catch(function(error){
					console.log('caches open failed')
				});
		})
	);
})


self.addEventListener('fetch', function(event) {
	//tells sw we are going to handle event 
	console.log('Worker: fetch event in progress')
	event.respondWith(
		new Response('hello world')
		);
});