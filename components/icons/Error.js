import useDarkMode from "hooks/useDarkMode";
import { colors } from "styles/theme";

export function Error(props) {
  const darkMode = useDarkMode();
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <title>Error</title>
      <circle
        cx={25}
        cy={25}
        r={25}
        fill={darkMode ? colors.dark_secondary : colors.tertiary}
      />
      <path
        fill="transparent"
        stroke={colors.white}
        strokeWidth={2}
        strokeLinecap="round"
        strokeMiterlimit={10}
        d="M16 34l9-9 9-9m-18 0l9 9 9 9"
      />
    </svg>
  );
}
