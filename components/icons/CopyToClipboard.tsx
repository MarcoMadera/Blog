import useDarkMode from "hooks/useDarkMode";
import { SVGProps, ReactElement } from "react";
import { colors } from "styles/theme";

export function CopyToClipboard(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 76 76"
      width={props.width}
      height={props.height}
    >
      <path
        fill={darkMode ? colors.greyGoose : colors.davyGrey}
        d="M37.917 15.833c2.186 0 4.333 1.98 4.333 4.167L42 21h12v36H22V21h12l-.25-1c0-2.186 1.98-4.167 4.167-4.167ZM51 24h-5.5l2 4h-19l2-4H25v30h26V24Zm-13.083-5.792c-.875 0-1.917.668-1.917 1.542 0 .288.365 1.017.5 1.25h3c.135-.233.5-.962.5-1.25 0-.874-1.209-1.542-2.083-1.542Z"
      />
    </svg>
  );
}
