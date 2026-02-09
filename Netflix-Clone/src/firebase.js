import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBUD97WxgEsX5iYJ7E33gopfEnumhmO61A",
  authDomain: "netflix-clone-8a729.firebaseapp.com",
  projectId: "netflix-clone-8a729",
  storageBucket: "netflix-clone-8a729.firebasestorage.app",
  messagingSenderId: "272466254504",
  appId: "1:272466254504:web:2d117c6aa83005df44c09d",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split("/")[1].split("-").join(" "));
  } 
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
