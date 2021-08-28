import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  UploadTask,
} from "firebase/storage";
import { getDatabase } from "firebase/database";
import {
  getAuth,
  signInWithPopup,
  signOut,
  signInAnonymously,
  TwitterAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged as onAuthStateChangedFirebase,
  Unsubscribe,
  User as firebaseUser,
  UserCredential,
} from "firebase/auth";
import { nanoid } from "nanoid";
import { User, UserContextTypes } from "types/user";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(config);

export const database = getDatabase(app);

const storage = getStorage(app);

const auth = getAuth(app);
auth.languageCode = "es";

export function mapUserFromFirebaseAuth(user: firebaseUser): User {
  const { displayName, email, photoURL, uid } = user;

  return { avatar: photoURL, username: displayName, email: email, uid };
}

export function onAuthStateChanged(
  setUser: UserContextTypes["setUser"]
): Unsubscribe {
  return onAuthStateChangedFirebase(auth, (user) => {
    const normalizeUser = user ? mapUserFromFirebaseAuth(user) : null;
    setUser(normalizeUser || undefined);
  });
}

export function loginWithGithub(): Promise<UserCredential> {
  const gitHubProvider = new GithubAuthProvider();
  return signInWithPopup(auth, gitHubProvider);
}
export function loginWithTwitter(): Promise<UserCredential> {
  const twitterProvider = new TwitterAuthProvider();
  return signInWithPopup(auth, twitterProvider);
}
export async function loginAnonymously(): Promise<UserCredential> {
  return await signInAnonymously(auth);
}
export function logOut(): Promise<void> {
  return signOut(auth);
}

export function uploadImage(
  file: File,
  userId: User["uid"],
  isSendingMoreFiles: boolean
): {
  task: UploadTask;
  isSendingMoreFiles: boolean;
} {
  const storageRef = ref(storage, `user/${userId}/${nanoid()}-${file.name}`);
  const task = uploadBytesResumable(storageRef, file);
  return { task, isSendingMoreFiles };
}

export default app;
