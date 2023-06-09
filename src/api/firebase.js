// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, child, get, set, remove } from 'firebase/database';
import { v4 as uuid } from 'uuid';
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

export const addNewProduct = async (product, imageUrl) => {
  const id = uuid();

  return await set(child(dbRef, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageUrl,
    options: product.options.split(',')
  });
};

export const getProducts = async () => {
  return await get(child(dbRef, 'products')).then((snapshot) => {
    if (snapshot.exists()) {
      return Object.values(snapshot.val());
    }

    return [];
  });
};

export const getCart = async (userId) => {
  console.log('getCart:', userId);
  return await get(child(dbRef, `carts/${userId}`)).then((snapshot) => {
    const items = snapshot.val() || {};
    return Object.values(items);
  });
};

export const addOrUpdateToCart = async (userId, product) => {
  return await set(child(dbRef, `carts/${userId}/${product.id}`), product);
};

export const removeFromCart = async (userId, productId) => {
  return await remove(child(dbRef, `carts/${userId}/${productId}`));
};
