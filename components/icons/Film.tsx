import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function Film(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 494.4 494.4" {...props}>
      <title>Película</title>
      <path
        fill="#576063"
        d="M431.2 479.2c0 8.8-7.2 15.2-15.2 15.2H78.4c-8 0-15.2-7.2-15.2-15.2v-464c0-8 7.2-15.2 15.2-15.2H416c8 0 15.2 7.2 15.2 15.2v464z"
      ></path>
      <path d="M63.2 15.2c0-8 7.2-15.2 15.2-15.2H416c8 0 15.2 7.2 15.2 15.2v464c0 8.8-7.2 15.2-15.2 15.2"></path>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M156.8 0v19.2c0 8.8 7.2 15.2 15.2 15.2h150.4c8.8 0 15.2-7.2 15.2-15.2V0H156.8zm180.8 220.8c0 8.8-7.2 15.2-15.2 15.2H172c-8.8 0-15.2-7.2-15.2-15.2V71.2c0-8.8 7.2-15.2 15.2-15.2h150.4c8.8 0 15.2 7.2 15.2 15.2v149.6z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M156.8 71.2c0-8.8 7.2-15.2 15.2-15.2h150.4c8.8 0 15.2 7.2 15.2 15.2v150.4c0 8.8-7.2 15.2-15.2 15.2"
      ></path>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M337.6 423.2c0 8.8-7.2 15.2-15.2 15.2H172c-8.8 0-15.2-7.2-15.2-15.2V273.6c0-8.8 7.2-15.2 15.2-15.2h150.4c8.8 0 15.2 7.2 15.2 15.2v149.6z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M156.8 273.6c0-8.8 7.2-15.2 15.2-15.2h150.4c8.8 0 15.2 7.2 15.2 15.2v149.6c0 8.8-7.2 15.2-15.2 15.2"
      ></path>
      <g fill={darkMode ? colors.dark_primary : colors.primary}>
        <path d="M322.4 460H172c-8.8 0-15.2 7.2-15.2 15.2v19.2h180.8v-19.2c0-8-7.2-15.2-15.2-15.2z"></path>
        <circle cx="108.8" cy="38.4" r="16.8"></circle>
        <circle cx="108.8" cy="90.4" r="16.8"></circle>
        <circle cx="108.8" cy="143.2" r="16.8"></circle>
        <circle cx="108.8" cy="195.2" r="16.8"></circle>
        <circle cx="108.8" cy="247.2" r="16.8"></circle>
        <circle cx="108.8" cy="299.2" r="16.8"></circle>
        <circle cx="108.8" cy="351.2" r="16.8"></circle>
        <circle cx="108.8" cy="404" r="16.8"></circle>
        <circle cx="108.8" cy="456" r="16.8"></circle>
        <circle cx="385.6" cy="38.4" r="16.8"></circle>
        <circle cx="385.6" cy="90.4" r="16.8"></circle>
        <circle cx="385.6" cy="143.2" r="16.8"></circle>
        <circle cx="385.6" cy="195.2" r="16.8"></circle>
        <circle cx="385.6" cy="247.2" r="16.8"></circle>
        <circle cx="385.6" cy="299.2" r="16.8"></circle>
        <circle cx="385.6" cy="351.2" r="16.8"></circle>
        <circle cx="385.6" cy="404" r="16.8"></circle>
        <circle cx="385.6" cy="456" r="16.8"></circle>
      </g>
    </svg>
  );
}
