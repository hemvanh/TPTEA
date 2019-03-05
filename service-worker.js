importScripts("precache-manifest.c8d82e6ba49cb5e5228de99b5a4b046a.js", "https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js");

/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.conf > pwa > workboxPluginMode is set to "InjectManifest"
 */
workbox.core.setCacheNameDetails({prefix: 'tptea'})
self.workbox.precaching.precache(self.__precacheManifest)
workbox.routing.registerRoute(({url}) => {
  return url.search.indexOf('listCategories') > -1
}, workbox.strategies.staleWhileRevalidate())

workbox.routing.registerRoute(({url}) => {
  return url.search.indexOf('getCustomer') > -1
}, workbox.strategies.networkFirst())

workbox.precaching.precache([{url: '/CHANGELOGS.md', revision: new Date().getTime().toString()}])

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})
self.addEventListener('push', event => {
  var options = {
    body: event.data.text(),
    icon: 'statics/icons/apple-icon-152x152.png',
  }
  event.waitUntil(self.registration.showNotification('TPTEA', options))
})
self.addEventListener('notificationclick', event => {
  self.notification.close()
  event.waitUntil(clients.openWindow('/'))
})
workbox.skipWaiting()
workbox.clientsClaim()
