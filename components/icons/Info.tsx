import { ReactElement, SVGProps } from "react";
import { colors } from "styles/theme";

export function Info(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg fill={props.fill ?? colors.darkSkyBlue} viewBox="0 0 50 50" {...props}>
      <title>Información</title>
      <path d="M25 2C12.297 2 2 12.297 2 25s10.297 23 23 23 23-10.297 23-23S37.703 2 25 2zm0 9a3 3 0 110 6 3 3 0 010-6zm4 27h-8v-2h2V23h-2v-2h6v15h2v2z" />
    </svg>
  );
}
