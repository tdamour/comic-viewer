import {precacheAndRoute} from 'workbox-precaching';

self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings(); 
workbox.precaching.precacheAndRoute(self.__precacheManifest,{}); 
precacheAndRoute(self.__WB_MANIFEST);
