import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Gerekli fonksiyonlar import ediliyor
import { getAnalytics } from "firebase/analytics";

// Firebase config bilgilerini buraya ekliyoruz
const firebaseConfig = {
  apiKey: "AIzaSyDGYbKHZfBL88yA83CmxvHFI76weHLwlmM", 
  authDomain: "bnews-5cf93.firebaseapp.com",
  projectId: "bnews-5cf93",
  storageBucket: "bnews-5cf93.appspot.com",
  messagingSenderId: "308188914",
  appId: "1:308188914:android:d4a6857140ee09320d226b",
  measurementId: "G-XXXXXX",
};

// Firebase'i başlatıyoruz
const app = initializeApp(firebaseConfig);

// Firebase Messaging ve Analytics'i başlatıyoruz
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { messaging, analytics, getToken, onMessage }; // getToken ve onMessage fonksiyonlarını dışa aktarıyoruz

