/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
// const CACHE_NAME = 'V_3'
self.workbox.precaching.precache(self.__precacheManifest)

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    })
  )
})
// workbox.routing.registerRoute(new RegExp('/'), workbox.strategies.cacheFirst())
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
