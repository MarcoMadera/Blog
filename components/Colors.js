import { useContext } from "react";
import { ThemeContext } from "./Layout";
import { colors } from "../styles/code/colors";
import Head from "next/head";
const Colors = ({ ...allColors }) => {
  const { darkMode } = useContext(ThemeContext);
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
};

export default Colors;
