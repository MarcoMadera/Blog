import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function CSharp(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="-26 -20 507 552" {...props}>
      <defs>
        <linearGradient
          id="d"
          x1="121.095"
          x2="261.772"
          y1="55.807"
          y2="235.867"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor={darkMode ? colors.deepCarminPink : colors.guardsmanRed}
          ></stop>
          <stop
            offset="1"
            stopColor={darkMode ? colors.lavaRed : colors.redBerry}
          ></stop>
        </linearGradient>
        <linearGradient
          id="b"
          x1="314.175"
          x2="443.464"
          y1="207.291"
          y2="372.773"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor={darkMode ? colors.deepCarminPink : colors.guardsmanRed}
          ></stop>
          <stop
            offset="1"
            stopColor={darkMode ? colors.lavaRed : colors.redBerry}
          ></stop>
        </linearGradient>
        <linearGradient
          id="c"
          x1="115.288"
          x2="252.74"
          y1="326.163"
          y2="502.094"
          gradientUnits="userSpaceOnUse"
        >
          <stop
            offset="0"
            stopColor={darkMode ? colors.deepCarminPink : colors.guardsmanRed}
          ></stop>
          <stop
            offset="1"
            stopColor={
              darkMode ? colors.vetenianRed : colors.guardsmanRedCrimson
            }
          ></stop>
        </linearGradient>
        <clipPath id="a">
          <path d="M435.279 113.284L247.191 4.692c-10.835-6.257-28.567-6.257-39.402 0L19.701 113.284C8.865 119.539 0 134.896 0 147.408v217.185c.843 14.571 8.286 26.639 19.701 34.123l188.088 108.592c10.835 6.257 28.567 6.257 39.402 0l188.088-108.592c12.248-8.146 19.219-20.408 19.701-34.123V147.408c-.44-13.165-8.323-26.443-19.701-34.124z"></path>
        </clipPath>
      </defs>
      <g clipPath="url(#a)">
        <path
          fill="url(#b)"
          d="M222.588 124.487h267.464V397.98H222.588z"
        ></path>
        <path
          fill="url(#c)"
          d="M490.052 407.802L145.845 208.63H-29.911v329.723h519.963z"
        ></path>
        <path
          fill="url(#d)"
          d="M-29.911 405.093l519.963-300.885V-14.513H-29.911z"
        ></path>
      </g>
      <path
        fill={colors.white}
        d="M75.83 256.001c-.891-148.089 197.459-213.479 282.996-75.878l-65.635 37.98C253.569 152.569 155.19 176.002 151.659 256c1.06 73.729 97.754 107.978 141.536 37.893l65.635 37.979c-75.382 130.863-279.198 83.781-283-75.871z"
      ></path>
      <g fill={colors.white} aria-label="♯" data-name="♯">
        <path d="M326 213h12.5l-8.541 82.5h-12.735zm26.776 0h12.5l-8.541 82.5H344z"></path>
        <path d="M312 232.592h62.5v12.072H312zM308.5 262H371v12.072h-62.5z"></path>
      </g>
    </svg>
  );
}
