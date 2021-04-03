importScripts('https://g.alicdn.com/kg/workbox/3.3.0/workbox-sw.js');

if (workbox) {
    workbox.setConfig({ modulePathPrefix: 'https://g.alicdn.com/kg/workbox/3.3.0/' });

    workbox.precaching.precache(['/', '/index.html']);

    workbox.routing.registerRoute(new RegExp('^https?://laoyu.site/?$'), workbox.strategies.networkFirst());

    workbox.routing.registerRoute(new RegExp('.*.html'), workbox.strategies.networkFirst());

    workbox.routing.registerRoute(new RegExp('.*.(?:js|css)'), workbox.strategies.staleWhileRevalidate());

    workbox.routing.registerRoute(new RegExp('https://blog.laoyu.site/?$'), workbox.strategies.networkFirst());
	
	workbox.routing.registerRoute(new RegExp('https://www.laoyu.site/?$'), workbox.strategies.networkFirst());
}