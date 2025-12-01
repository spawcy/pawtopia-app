// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCboMzZVhR86zl9t0EebGs8XCT8ba_X9ds",
  authDomain: "pawtopia-app.firebaseapp.com",
  databaseURL: "https://pawtopia-app-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pawtopia-app",
  storageBucket: "pawtopia-app.firebasestorage.app",
  messagingSenderId: "796486803716",
  appId: "1:796486803716:web:d36141319b6c3c81107051",
  measurementId: "G-D2R4VGPT33"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth };

