import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { isValidEmail } from "utils/isValidEmail";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Se requiere un email" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email invalido" });
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
      if (text.includes("detected this email to be invalid or spammy")) {
        return res.status(400).json({
          error:
            "Este email puede que sea invalido o lo has ingresado muchas veces",
        });
      }

      return res.status(400).json({
        error: "Ha ocurrido un error",
      });
    }

    return res.status(201).json({
      message:
        "Revisa tu bandeja de entrada, recibirás un correo electrónico de confirmación",
    });
  } catch (error: unknown) {
    const response = error as ApiError;

    return res
      .status(500)
      .json({ error: response.message || response.toString() });
  }
}
