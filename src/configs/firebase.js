// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDExK3h7QH2v6qfBrwjzoraq7hEgf0uQE0",
  authDomain: "it-sysarch32-store-pareja.firebaseapp.com",
  projectId: "it-sysarch32-store-pareja",
  storageBucket: "it-sysarch32-store-pareja.appspot.com",
  messagingSenderId: "1037199727313",
  appId: "1:1037199727313:web:f856903cbb2bf486ddc3f0",
  measurementId: "G-36ZYNSSJN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app);