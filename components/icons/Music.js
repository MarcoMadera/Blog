import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";

export function Music(props) {
  const { darkMode } = useDarkMode();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 502 502" {...props}>
      <title>Música</title>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M167.599 282.635H96.277c-39.39 0-71.322 31.932-71.322 71.322s31.932 71.322 71.322 71.322 71.322-31.932 71.322-71.322v-71.322zm309.447 66.721h-71.322c-39.39 0-71.322 31.932-71.322 71.322S366.334 492 405.724 492s71.322-31.932 71.322-71.322v-71.322z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M477.046 150.344V76.721L167.599 10v73.623z"
      ></path>
      <path d="M318.01 169.002c-.696 0-1.402-.073-2.109-.225l-26-5.584c-5.4-1.16-8.837-6.477-7.677-11.876 1.159-5.4 6.474-8.839 11.876-7.677l26 5.584c5.4 1.16 8.837 6.477 7.677 11.876-1.007 4.692-5.155 7.902-9.767 7.902z"></path>
      <path d="M487.046 150.344V76.721a10 10 0 00-7.892-9.775L169.707.225a9.998 9.998 0 00-12.108 9.776v262.635H96.277c-44.841 0-81.322 36.481-81.322 81.322s36.481 81.322 81.322 81.322 81.322-36.481 81.322-81.322V139.075l77.301 16.602a10.04 10.04 0 002.109.225c4.612 0 8.76-3.21 9.767-7.902 1.16-5.399-2.277-10.717-7.677-11.876l-81.5-17.504V96.01l289.446 62.408v180.938h-61.322c-44.841 0-81.322 36.481-81.322 81.322S360.882 502 405.723 502s81.322-36.481 81.322-81.322V150.344h.001zM157.599 353.957c0 33.813-27.509 61.322-61.322 61.322s-61.322-27.509-61.322-61.322 27.509-61.322 61.322-61.322h61.322v61.322zm20-331.571l289.446 62.409v53.164L177.599 75.55V22.386zm289.447 398.292c0 33.813-27.509 61.322-61.322 61.322s-61.322-27.509-61.322-61.322 27.509-61.322 61.322-61.322h61.322v61.322z"></path>
      <path d="M59 365.5c-5.523 0-10-4.477-10-10 0-26.743 21.757-48.5 48.5-48.5 5.523 0 10 4.477 10 10s-4.477 10-10 10C81.785 327 69 339.786 69 355.5c0 5.523-4.477 10-10 10zm309.5 66c-5.523 0-10-4.477-10-10 0-26.743 21.757-48.5 48.5-48.5 5.523 0 10 4.477 10 10s-4.477 10-10 10c-15.715 0-28.5 12.785-28.5 28.5 0 5.523-4.477 10-10 10z"></path>
    </svg>
  );
}
