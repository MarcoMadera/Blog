import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";
import { nanoid } from "nanoid";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !firebase.apps.length
  ? firebase.initializeApp(config)
  : firebase.app();

export const database = app.database();

export function mapUserFromFirebaseAuth(user) {
  const { displayName, email, photoURL, uid } = user;

  return { avatar: photoURL, username: displayName, email: email, uid };
}

export function onAuthStateChanged(setUser) {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null;
    setUser(normalizeUser);
  });
}

export function loginWithGithub() {
  const gitHubProvider = new firebase.auth.GithubAuthProvider();
  return firebase.auth().signInWithPopup(gitHubProvider);
}
export function loginWithTwitter() {
  const twitterProvider = new firebase.auth.TwitterAuthProvider();
  return firebase.auth().signInWithPopup(twitterProvider);
}
export async function loginAnonymously() {
  return await firebase.auth().signInAnonymously();
}
export function logOut() {
  return firebase.auth().signOut();
}

export const uploadImage = (file, userId, isSendingMoreFiles) => {
  const ref = firebase.storage().ref(`user/${userId}/${nanoid()}-${file.name}`);
  const task = ref.put(file);
  return { task, isSendingMoreFiles };
};

export default app;