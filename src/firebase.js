import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Firebase 인증 추가
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJzGKqHWInXt0ysbia-DQ3ISgcsdGN-pY",
  authDomain: "mymood-8c757.firebaseapp.com",
  projectId: "mymood-8c757",
  storageBucket: "mymood-8c757.appspot.com", // `.app`이 아니라 `.com`인지 확인!
  messagingSenderId: "1083992393016",
  appId: "1:1083992393016:web:4476223d446df264eb2dcd",
  measurementId: "G-1EQRJ0C6GL",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Firebase 인증 가져오기
const db = getFirestore(app);

export { auth, db };
