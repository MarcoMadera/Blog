import type { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "next/dist/server/api-utils";
import { isValidEmail } from "utils/isValidEmail";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { email, name } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Se requiere un email" });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "Email invalido" });
  }

  try {
    const API_KEY = process.env.MAILCHIMP_API_KEY as string;
    const LIST_ID = process.env.MAILCHIMP_LIST_ID;
    const DATACENTER = API_KEY.split("-")[1];
    const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`;

    const data = {
      email_address: email,
      status: "pending",
      merge_fields: {
        FNAME: name,
      },
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `auth ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status >= 400) {
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.title === "Member Exists") {
        return res.status(400).json({ error: "Ya estás suscrito" });
      }
      if (responseData.title === "Invalid Resource") {
        return res.status(400).json({ error: "Email invalido" });
      }
      return res.status(400).json({ error: "Error al suscribirse" });
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
