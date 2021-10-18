import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function BulletList(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M3.5 15.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 .5h13.503a1 1 0 01.117 1.993l-.117.007H7.5a1 1 0 01-.116-1.993L7.5 16h13.503H7.5zm-4-5.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm4 .5h13.503a1 1 0 01.117 1.993l-.117.007H7.5a1 1 0 01-.116-1.993L7.5 11h13.503H7.5zm-4-5.493a1.5 1.5 0 110 2.999 1.5 1.5 0 010-2.999zM7.5 6h13.503a1 1 0 01.117 1.993L21.003 8H7.5a1 1 0 01-.116-1.993L7.5 6h13.503H7.5z"
      />
    </svg>
  );
}
