import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function Code(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill={darkMode ? colors.deepCarminPink : colors.guardsmanRed}
        d="M0 260.908l174.648-81.136v38.568l-132.08 57.848v.728l132.08 57.848v38.568L0 292.212v-31.304z"
      ></path>
      <path
        fill={darkMode ? colors.lavaRed : colors.redBerry}
        d="M201.6 387.9l77.864-263.8h36.752L238.4 387.9h-36.8z"
      ></path>
      <path
        fill={darkMode ? colors.deepCarminPink : colors.guardsmanRed}
        d="M512 293.284L337.352 373.34v-38.568l134.992-57.848v-.728L337.352 218.34v-38.568L512 259.828v33.456z"
      ></path>
    </svg>
  );
}
