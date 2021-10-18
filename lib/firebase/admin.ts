import { cert, initializeApp, getApps, getApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const config = {
  credential: cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};
const adminApp = !getApps().find((app) => app?.name === "admin")
  ? initializeApp(config, "admin")
  : getApp("admin");

export const database = getDatabase(adminApp);

export default adminApp;
