import { colors } from "styles/code/colors";
import Head from "next/head";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement } from "react";

export default function Colors({
  ...allColors
}: Record<string, string>): ReactElement {
  const { darkMode } = useDarkMode();
  const colorsArray = Object.keys(allColors);
  const colorsString = colorsArray.join("");

  return (
    <Head key={colorsString}>
      <style>
        {colorsArray
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
