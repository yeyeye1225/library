import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxROA4SG2gA2qoax0FcQzs4K5rJSpp5oE",
  authDomain: "nwitter-fafc3.firebaseapp.com",
  projectId: "nwitter-fafc3",
  storageBucket: "nwitter-fafc3.appspot.com",
  messagingSenderId: "1036225945422",
  appId: "1:1036225945422:web:fb45cc6647c2a16655881f"
};

const firebase = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebase);

export  { fireStore };