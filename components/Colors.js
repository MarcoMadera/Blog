import { colors } from "../styles/code/colors";
import Head from "next/head";
import useDarkMode from "../hooks/useDarkMode";

export default function Colors({ ...allColors }) {
  const { darkMode } = useDarkMode();

  return (
    <Head>
      <style>
        {Object.keys(allColors)
          .map((color) => {
            return `.${color}{color:${
              colors[`${darkMode ? `dark_${color}` : color}`]
            };}`;
          })
          .join("")}
      </style>
    </Head>
  );
}
