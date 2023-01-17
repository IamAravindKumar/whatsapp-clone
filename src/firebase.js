import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyAWGSTNNmTFm6QI_Ja9mZtzyzdGX7vUrT0",
  authDomain: "whatsapp-clone-a27f5.firebaseapp.com",
  projectId: "whatsapp-clone-a27f5",
  storageBucket: "whatsapp-clone-a27f5.appspot.com",
  messagingSenderId: "950511191882",
  appId: "1:950511191882:web:886e82a778f776dc8ca3b3",
  measurementId: "G-VQ2YXML2ZG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export {auth, provider};
export default db;