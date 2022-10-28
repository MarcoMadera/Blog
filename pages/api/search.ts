import { NextApiRequest, NextApiResponse } from "next";
import { siteMetadata } from "site.config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { q: query } = req.query;

  if (!query) {
    res.status(400).json({ message: "Missing query" });
    return;
  }
  const { siteUrl } = siteMetadata;
  const data = await fetch(`${siteUrl}/search.json`);
  const json = await data.json();
  const results = json.filter(
    (item: { title: string; description: string; url: string }) => {
      return (
        item.title.toLowerCase() +
        " " +
        item.description.toLowerCase()
      ).includes((query as string).toLowerCase());
    }
  );
  res.status(200).json({ results });
}
