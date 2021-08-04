import type { NextApiRequest, NextApiResponse } from "next";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Se requiere un email" });
  }

  try {
    const API_KEY = process.env.BUTTONDOWN_API_KEY;
    const response = await fetch(
      "https://api.buttondown.email/v1/subscribers",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      }
    );

    if (response.status >= 400) {
      const text = await response.text();

      if (text.includes("already subscribed")) {
        return res.status(400).json({
          error: "Ya estás suscrito a este newsletter",
        });
      }

      return res.status(400).json({
        error: "Ha ocurrido un error",
      });
    }

    return res.status(201).json({ error: "" });
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
}
