const staticCacheName = 'restaurant-static-v1';
//install primes sw cache with resources that should be available offline
self.addEventListener('install', function(event) {
	//waits for installation to finish
	console.log('Worker: install event in progress.')
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'/index.html',
				'/restaurant.html',
				'/css/styles.css',
				'/responsive_index_styles.css',
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
				'/img/10.jpg',
				'/restaurant.html?id=1',
	            '/restaurant.html?id=2',
	            '/restaurant.html?id=3',
	            '/restaurant.html?id=4',
	            '/restaurant.html?id=5',
	            '/restaurant.html?id=6',
	            '/restaurant.html?id=7',
	            '/restaurant.html?id=8',
	            '/restaurant.html?id=9',
	            '/restaurant.html?id=10'
				]).then(function() {
					console.log('Worker: install completed')
				}).catch(function(error){
					console.log('caches open failed')
				});
		})
	);
})


//Gets rid of the old cache
self.addEventListener('activate', function(event) {
    event.waitUntil(
    	//caches.keys gets the name of all of the caches
        caches.keys().then(function(cacheNames) {
            //waits for the completion of all the promises
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('restaurant-') &&
                        //makes sure current cache isn't included in the delete
                        cacheName != staticCacheName;
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});


//this will respond to the event by checking to see if there is already
//a match in the cache and returning it if there is
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) return response;
			return fetch(event.request);
        })
    );
});
