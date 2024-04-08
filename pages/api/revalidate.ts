import { NextApiRequest, NextApiResponse } from "next";

export default async function revalidate(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.query.secret !== process.env.SECRET_KEY) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    console.error("error", err);
    return res.status(500).send("Error revalidating");
  }
}
