importScripts("/precache-manifest.7f55945dcf3bba67b2893a3a97061aa9.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
// const CACHE_NAME = 'V_3'
console.log(self.__precacheManifest)
self.workbox.precaching.precache(self.__precacheManifest)
// workbox.routing.registerRoute(
//   new RegExp('/'),
//   workbox.strategies.staleWhileRevalidate({
//     cacheName: CACHE_NAME,
//   })
// )
// self.addEventListener('message', messageEvent => {
//   if (messageEvent.data === 'skipWaiting') {
//     self.skipWaiting()
//   }
// })
// self.addEventListener('activate', function(event) {
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       let validCacheSet = new Set(Object.values(workbox.core.cacheNames))
//       return Promise.all(
//         cacheNames
//           .filter(cacheName => {
//             return !validCacheSet.has(cacheName)
//           })
//           .map(cacheName => {
//             return caches.delete(cacheName)
//           })
//       )
//     })
//   )
// })

