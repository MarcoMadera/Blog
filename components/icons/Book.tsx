import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function Book(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 512 512" {...props}>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M7.778 107.865h496.447v320.29H7.778z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M7.778 428.154V107.868h496.444"
      ></path>
      <path fill="#fff" d="M39.803 83.847H472.19v312.284H39.803z"></path>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M87.85 292.029h120.103v56.054H87.85z"
      ></path>
      <path
        fill={darkMode ? colors.dark_primary : colors.primary}
        d="M304.039 131.884h120.103v56.054H304.039z"
      ></path>
      <g fill="#1d1d1b">
        <path d="M248.224 107.865h15.556v264.236h-15.556z"></path>
        <path d="M479.972 100.09V76.068H272.014a23.701 23.701 0 00-16.013 6.211 23.7 23.7 0 00-16.014-6.211H32.029v24.022H0v335.843h512V100.09h-32.028zM47.585 91.624h192.4c4.542 0 8.236 3.695 8.236 8.236h15.556c0-4.542 3.695-8.236 8.235-8.236h192.401v296.723H263.779v-8.235h-15.556v8.235H47.585V91.624zm448.859 328.752H263.779v-8.236h-15.556v8.236H15.556v-304.73h16.473v288.258h447.943V115.646h16.473v304.731h-.001z"></path>
        <path d="M79.842 124.106H143.9v15.556H79.842z"></path>
      </g>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M79.842 156.141h24.019v15.556H79.842z"
      ></path>
      <path
        fill="#1d1d1b"
        d="M119.875 156.141h96.085v15.556h-96.085zm-40.033 32.025h56.054v15.556H79.842z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M151.911 188.166h64.058v15.556h-64.058z"
      ></path>
      <path
        fill="#1d1d1b"
        d="M79.842 220.191h136.126v15.556H79.842zm0 32.035h96.085v15.556H79.842zm112.1 0h24.019v15.556h-24.019zm23.793 103.635H80.071v-71.607h135.664v71.607zM95.627 340.305h104.552V299.81H95.627v40.495zm336.302-144.588H296.265v-71.606h135.664v71.606zm-120.108-15.556h104.552v-40.494H311.821v40.494zm-15.788 32.024h136.126v15.556H296.033z"
      ></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M296.033 244.22h16.013v15.556h-16.013z"
      ></path>
      <path fill="#1d1d1b" d="M328.068 244.22h104.091v15.556H328.068z"></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M296.033 276.245h16.013v15.556h-16.013z"
      ></path>
      <path fill="#1d1d1b" d="M328.068 276.245h104.091v15.556H328.068z"></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M296.033 308.28h16.013v15.556h-16.013z"
      ></path>
      <path fill="#1d1d1b" d="M328.068 308.28h104.091v15.556H328.068z"></path>
      <path
        fill={darkMode ? colors.dark_secondary : colors.secondary}
        d="M296.033 340.305h16.013v15.556h-16.013z"
      ></path>
      <path fill="#1d1d1b" d="M328.068 340.305h104.091v15.556H328.068z"></path>
    </svg>
  );
}
