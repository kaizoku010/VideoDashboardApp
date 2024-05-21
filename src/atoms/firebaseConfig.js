// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import 'firebase/messaging'
import {getMessaging} from "@firebase/messaging"
import { getToken } from "firebase/messaging";
import { getDatabase, ref, set, push } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3oiPrt1naJmjXtSuLa_nmoW6AKLlc6ts",
  authDomain: "moxiescreen.firebaseapp.com",
  projectId: "moxiescreen",
  storageBucket: "moxiescreen.appspot.com",
  messagingSenderId: "346104076821",
  appId: "1:346104076821:web:dc2bf7cfd1d3504b48cc1c",
  measurementId: "G-8N28VZPLL9"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);


const database = getDatabase(firebaseApp); // Get a reference to the database
const messagesRef = ref(database, 'messages'); // Reference a specific path

// const message = "Hello from React!";
// set(messagesRef, message) // Write the message data to the database
//   .then(() => {
//     console.log("Data written successfully!");
//   })
//   .catch((error) => {
//     console.error("Error writing data:", error);
//   });

  const messaging = getMessaging(firebaseApp)
//GlYvCU7UoX4dMHwHKWL91No4utxr8y651MPq_jcu3JA
// messages  = firebaseApp.messaging();
export {database, messagesRef, ref, set, messaging, push}