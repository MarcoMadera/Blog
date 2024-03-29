import { ReactElement, SVGProps } from "react";
import { colors } from "styles/theme";

export function Email(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 490 490" {...props}>
      <path
        fill={colors.white}
        d="M75 32.5v167.305L245 297.5l170-97.695V32.5z"
      ></path>
      <path
        fill={colors.saffronMango}
        d="M75 162.5v37.305L10 162.5zm405 0l-65 37.305V162.5z"
      ></path>
      <path
        fill={colors.brightSun}
        d="M415 199.805l65-37.305v295H10v-295l65 37.305L245 297.5z"
      ></path>
      <g fill={colors.zeus}>
        <path d="M485.011 153.846a10 10 0 00-5.011-1.344v-.002h-55v-120c0-5.522-4.478-10-10-10H75c-5.522 0-10 4.478-10 10v120H10v.002A9.992 9.992 0 000 162.5v295c0 5.522 4.477 10 10 10h470c5.522 0 10-4.478 10-10v-295a10 10 0 00-4.989-8.654zM442.486 172.5L425 182.536V172.5h17.486zM405 42.5v151.519l-160 91.948-160-91.949V42.5h320zM65 182.536L47.514 172.5H65v10.036zM470 447.5H20v-20h425v-20H20V179.769l50.018 28.706 170 97.695a10 10 0 009.965 0l169.995-97.692L470 179.769V447.5z"></path>
        <path d="M105 62.5h50v20h-50zm0 50h280v20H105zm30 40h220v20H135zm45 40h130v20H180zm-5-130h25v20h-25z"></path>
      </g>
    </svg>
  );
}
