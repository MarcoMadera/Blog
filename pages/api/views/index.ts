import { database } from "lib/firebase/admin";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function views(
  _: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const snapshot = await database.ref("views").once("value");
  const views = snapshot.val();
  const allViews = Object.values(views).reduce((total, value) => {
    const tot = total as number;
    const val = value as number;
    return tot + val;
  });

  return res.status(200).json({ total: allViews });
}
