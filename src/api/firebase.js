// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
console.log(provider);

// database
const dbRef = ref(getDatabase());

export const login = async () => {
  await signInWithPopup(auth, provider);
};

export const logout = async () => {
  await signOut(auth);
};

export const onUserStateChange = (callback) => {
  onAuthStateChanged(auth, async (user) => {
    const updateUser = user ? await checkAdminUser(user) : undefined;
    callback(updateUser);
  });
};

const checkAdminUser = async (user) => {
  return await get(child(dbRef, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        console.log('No data available');
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
