import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCy8sn0KGBgA9Oy162RCJoHqPkfJQfe0Vk",
  authDomain: "plinko-a4b5b.firebaseapp.com",
  projectId: "plinko-a4b5b",
  storageBucket: "plinko-a4b5b.appspot.com",
  messagingSenderId: "286719578889",
  appId: "1:286719578889:web:e49f8e65b089bd7664b9d8",
  measurementId: "G-29NKF4RKHL",
  databaseURL: "https://plinko-a4b5b-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const database = getDatabase(app)
export const storage = getStorage(app);
