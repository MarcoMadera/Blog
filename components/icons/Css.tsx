import { ReactElement, SVGProps } from "react";
import { colors } from "styles/theme";

export function Css(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="3 3 42 42" {...props}>
      <title>CSS</title>
      <path fill={colors.frenchBlue} d="M41 5H7l3 34 14 4 14-4 3-34z" />
      <path fill={colors.azure} d="M24 8v31.9l11.2-3.2L37.7 8z" />
      <path
        fill={colors.white}
        d="M33.1 13H24v4h4.9l-.3 4H24v4h4.4l-.3 4.5-4.1 1.4v4.2l7.9-2.6.7-11.5z"
      />
      <path
        fill={colors.softPeach}
        d="M24 13v4h-8.9l-.3-4H24zm-4.6 8l.2 4H24v-4h-4.6zm.4 6h-4l.3 5.5 7.9 2.6v-4.2l-4.1-1.4-.1-2.5z"
      />
    </svg>
  );
}
