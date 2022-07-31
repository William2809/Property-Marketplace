// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAY0mmjqQsGnWZv6xA_E_zt2WteE4AAUJI",
    authDomain: "property-marketplace-app-31632.firebaseapp.com",
    projectId: "property-marketplace-app-31632",
    storageBucket: "property-marketplace-app-31632.appspot.com",
    messagingSenderId: "1039811723423",
    appId: "1:1039811723423:web:b5590f0146c94c175c62aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();