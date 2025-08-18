importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFlzdYVhs0OorBHfL4aBvxVzU6EeQuOy4",
  authDomain: "legal-app-40d4b.firebaseapp.com",
  projectId: "legal-app-40d4b",
  storageBucket: "legal-app-40d4b.firebasestorage.app",
  messagingSenderId: "802830033561",
  appId: "1:802830033561:web:4bae78d45d7ce2cbf6ce08",
};

firebase.initializeApp(firebaseConfig);

// Now initialize messaging after Firebase is set up
const messaging = firebase.messaging();

// Broadcast Channel setup
const broadcast = new BroadcastChannel("firebase-notification-channel");

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  // Show notification
  self.registration.showNotification(notificationTitle, notificationOptions);

  // Send message to React app
  broadcast.postMessage({
    type: "NEW_NOTIFICATION",
    data: payload.notification,
  });
});
