import { colors } from "../../styles/theme";
import useDarkMode from "../../hooks/useDarkMode";

export default function Code(props) {
  const { darkMode } = useDarkMode();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <title>Código</title>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M0 260.908l174.648-81.136v38.568l-132.08 57.848v.728l132.08 57.848v38.568L0 292.212v-31.304z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M201.6 387.9l77.864-263.8h36.752L238.4 387.9h-36.8z"
      ></path>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M512 293.284L337.352 373.34v-38.568l134.992-57.848v-.728L337.352 218.34v-38.568L512 259.828v33.456z"
      ></path>
    </svg>
  );
}
