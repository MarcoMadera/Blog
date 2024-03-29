import { database } from "lib/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const ref = database.ref(`views/${req.query.slug}`);
    const { snapshot } = await ref.transaction((currentViews) => {
      if (currentViews === null) {
        return 1;
      }

      return currentViews + 1;
    });

    return res.status(200).json({
      total: snapshot.val(),
    });
  }

  if (req.method === "GET") {
    const snapshot = await database
      .ref(`views/${req.query.slug}`)
      .once("value");
    const views = snapshot.val();

    return res.status(200).json({ total: views });
  }
}
