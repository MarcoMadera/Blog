import { ThemeContext } from "../../Layout";
import { useContext } from "react";
import { colors } from "../../../styles/theme";

export function Image(props) {
  const { darkMode } = useContext(ThemeContext);
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58 58" {...props}>
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M31 56h24V32H31v24zm2-22h20v20h-9V41.414l4.293 4.293 1.414-1.414L43 37.586l-6.707 6.707 1.414 1.414L42 41.414V54h-9V34zM21.569 13.569C21.569 10.498 19.071 8 16 8s-5.569 2.498-5.569 5.569c0 3.07 2.498 5.568 5.569 5.568s5.569-2.497 5.569-5.568zm-9.138 0C12.431 11.602 14.032 10 16 10s3.569 1.602 3.569 3.569-1.601 3.569-3.569 3.569-3.569-1.601-3.569-3.569zM6.25 36.661a.997.997 0 001.41.09l16.313-14.362 7.319 7.318a.999.999 0 101.414-1.414l-1.825-1.824 9.181-10.054 11.261 10.323a1 1 0 001.351-1.475l-12-11a1.002 1.002 0 00-1.414.063l-9.794 10.727-4.743-4.743a1.003 1.003 0 00-1.368-.044L6.339 35.249a1 1 0 00-.089 1.412z"
      />
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M57 2H1a1 1 0 00-1 1v44a1 1 0 001 1h24a1 1 0 100-2H2V4h54v23a1 1 0 102 0V3a1 1 0 00-1-1z"
      />
    </svg>
  );
}
