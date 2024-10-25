import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDtgbKuAAPKtPeOz27vJcH0JqIPtbxH6G0",
  authDomain: "pennywise-50c4b.firebaseapp.com",
  databaseURL: "https://pennywise-50c4b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pennywise-50c4b",
  storageBucket: "pennywise-50c4b.appspot.com",
  messagingSenderId: "677718301346",
  appId: "1:677718301346:web:b44b38f03919122d0355fb",
  measurementId: "G-YS2SG2378P"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);