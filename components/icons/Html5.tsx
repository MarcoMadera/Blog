import { ReactElement, SVGProps } from "react";
import { colors } from "styles/theme";

export function Html5(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 2000 2000" {...props}>
      <title>HTML5</title>
      <path
        fill={colors.flame}
        d="M352.732 1718.4L208.627 101.984h1582.746l-144.28 1616.544-647.478 179.488z"
      />
      <path
        fill={colors.halloweenOrange}
        d="M1000 234.108v1526.608l523.565-145.131 123.353-1381.477z"
      />
      <path
        fill={colors.white}
        d="M503.468 432.378l53.438 599.519h687.142l-23.06 257.144-221.244 59.816-220.825-59.729-14.764-165.111h-199l28.456 318.285 406.086 112.784 406.599-112.784 54.51-608.633H738.229l-18.143-203.021h758.687l17.759-198.27z"
      />
      <path
        d="M1000 432.378H503.468l53.438 599.519H1000V833.669H738.229l-18.143-203.021H1000zm0 916.393l-.256.086-220.825-59.729-14.764-165.111h-199l28.456 318.285 406.086 112.784.303-.085z"
        fill={colors.softPeach}
      />
    </svg>
  );
}
