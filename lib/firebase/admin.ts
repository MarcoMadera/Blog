import admin from "firebase-admin";

const config = {
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  }),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};
const app = !admin.apps.find((u) => u?.name === "admin")
  ? admin.initializeApp(config, "admin")
  : admin.app("admin");

export const database = app.database();

export default app;
