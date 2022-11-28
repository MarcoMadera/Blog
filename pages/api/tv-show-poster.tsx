import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function concertCover(req: NextRequest): ImageResponse | void {
  try {
    const { searchParams } = new URL(req.url);
    const { title, year, width, height } =
      Object.fromEntries(searchParams) || {};

    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: getRandomColor(),
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              color: "white",
              letterSpacing: -2,
              fontWeight: 700,
              background:
                "linear-gradient(180deg,rgba(0,0,0,0), rgba(0,0,0,0.8))",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 30,
                  marginBottom: 10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {title}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                }}
              >
                {year}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: Number(width) || 200,
        height: Number(width) || Number(height) || 300,
      }
    );
  } catch (error) {
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
