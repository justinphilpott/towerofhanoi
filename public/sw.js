if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return t[e]||(a=new Promise((async a=>{if("document"in self){const t=document.createElement("script");t.src=e,document.head.appendChild(t),t.onload=a}else importScripts(e),a()}))),a.then((()=>{if(!t[e])throw new Error(`Module ${e} didn’t register its module`);return t[e]}))},a=(a,t)=>{Promise.all(a.map(e)).then((e=>t(1===e.length?e[0]:e)))},t={require:Promise.resolve(a)};self.define=(a,n,s)=>{t[a]||(t[a]=Promise.resolve().then((()=>{let t={};const r={uri:location.origin+a.slice(1)};return Promise.all(n.map((a=>{switch(a){case"exports":return t;case"module":return r;default:return e(a)}}))).then((e=>{const a=s(...e);return t.default||(t.default=a),t}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/178.1aba922baeb03d0bc61a.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/377-626cdb5c4fc9ed600997.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/framework-92300432a1172ef1338b.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/main-a4aa824f7125b539dcc2.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/pages/_app-f02f8353f0c92b37e2a6.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/pages/_error-9faf4177fb4e528b4124.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/pages/index-2e03d3e872c0f006a34f.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/polyfills-a54b4f32bdc1ef890ddd.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/chunks/webpack-8e00e835018fe4d6ea10.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/css/14635f48e0c6e919a50b.css",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/image/public/crane_bg.cd471dc1c09e3a02adb40a0bcc77ca6c.webp",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-all-400-normal.c4897894616a059f49f0c21347ebbf09.woff",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-cyrillic-400-normal.9f7377801ca8dd27cd9bac2a089ee003.woff2",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-latin-400-normal.ce91b991775d960d936155c0d62f9688.woff2",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-latin-ext-400-normal.ebf894c190f6fe014806a843e544c822.woff2",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-thai-400-normal.74f152784a1692ee957badc9bbbcec09.woff2",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/media/pattaya-vietnamese-400-normal.f1349a481c7507e07768eb86ce6ac51b.woff2",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/thMypUcbx4jD8naCt8EYT/_buildManifest.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/_next/static/thMypUcbx4jD8naCt8EYT/_ssgManifest.js",revision:"thMypUcbx4jD8naCt8EYT"},{url:"/browserconfig.xml",revision:"f3bb78c061c97a24310dda0eeffb1cae"},{url:"/crane_bg.webp",revision:"a008412a848dbe50c21df19f7f34e6ae"},{url:"/favicon.ico",revision:"77684aa4c764a75f0a2f413175e9b9fb"},{url:"/favicon_16x16.png",revision:"78586be94344c2285365b758cac609e2"},{url:"/favicon_32x32.png",revision:"1be9e7fba90000098b17d9a3b611a8fd"},{url:"/icons/icon-192x192.png",revision:"1c2a81ffe71b9ce898007409f4a7f00a"},{url:"/icons/icon-256x256.png",revision:"426461221685d59f9b24b7c0364a5120"},{url:"/icons/icon-384x384.png",revision:"4cce0046d3c33d045a7082a5e56fd886"},{url:"/icons/icon-512x512.png",revision:"b131c932fc75a61102660427136b5e44"},{url:"/manifest.json",revision:"42c83ff26ec357ef89d57dca80c88175"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:t,state:n})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));
