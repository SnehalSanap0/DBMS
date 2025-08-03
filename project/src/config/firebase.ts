
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
   apiKey: "AIzaSyCwcFzWTJJ1S_oc9pIuLSnnqKKNcXmW7Dk",
  authDomain: "timetable-management-sys-689c9.firebaseapp.com",
  projectId: "timetable-management-sys-689c9",
  storageBucket: "timetable-management-sys-689c9.firebasestorage.app",
  messagingSenderId: "505970821858",
  appId: "1:505970821858:web:508ff4078dce6096a7ecbb",
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;