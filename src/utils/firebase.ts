import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { collection, doc, getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDYjGq1mw4uWBgw9euTp9ITp1pq1jZqvw4',
  authDomain: 'pikaoku-tools.firebaseapp.com',
  databaseURL: 'https://pikaoku-tools.firebaseio.com',
  projectId: 'pikaoku-tools',
  storageBucket: 'pikaoku-tools.appspot.com',
  messagingSenderId: '946348039508',
  appId: '1:946348039508:web:93cb3dd6833e38d5673cc1'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const getUserDoc = (userId) => doc(db, 'users', userId);

export { auth, db, getUserDoc };
