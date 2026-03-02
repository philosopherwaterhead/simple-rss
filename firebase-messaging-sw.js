importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyDugibpG1Rl6BeTCXtqfLnAgGDiCBaPqBI",
  authDomain: "rss-pwa-6b614.firebaseapp.com",
  projectId: "rss-pwa-6b614",
  messagingSenderId: "496343158181",
  appId: "1:496343158181:web:ad21844ddbb4f16cfdec4c"
});

const messaging = firebase.messaging();
