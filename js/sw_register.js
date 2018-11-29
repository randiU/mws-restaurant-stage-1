if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').then(function(reg) {
		console.log('Service worker registered.');
	}).catch(function(err) {
		console.log('Error. Service Worker did not register.')
	});
}