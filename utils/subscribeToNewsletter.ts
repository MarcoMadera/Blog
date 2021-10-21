import { isValidEmail } from "./isValidEmail";

export async function subscribeToNewsletter(email: string): Promise<{
  type: "error" | "success";
  message: string;
}> {
  if (!isValidEmail(email)) {
    return {
      type: "error",
      message: "Por favor inserta un correo electrónico válido",
    };
  }

  try {
    const response = await fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (response.status > 400) {
      throw new Error("Ha ocurrido un error inesperado");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return {
      type: "success",
      message: data.message,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        type: "error",
        message: error.message,
      };
    }

    return {
      type: "error",
      message: "Ha ocurrido un error inesperado",
    };
  }
}
