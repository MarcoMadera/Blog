import { colors } from "styles/theme";
import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";

export function CheckList(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 394.893 394.893" {...props}>
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M344.426 191.963c-6.904 0-12.5 5.597-12.5 12.5V350.91H25V43.982h246.57c6.904 0 12.5-5.597 12.5-12.5s-5.596-12.5-12.5-12.5H12.5c-6.903 0-12.5 5.597-12.5 12.5V363.41c0 6.903 5.597 12.5 12.5 12.5h331.926c6.902 0 12.5-5.597 12.5-12.5V204.463c0-6.903-5.596-12.5-12.5-12.5z"
      />
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M391.23 27.204c-4.881-4.881-12.795-4.881-17.678 0L169.957 230.801l-50.584-50.584c-4.882-4.881-12.796-4.881-17.678 0-4.881 4.882-4.881 12.796 0 17.678l59.423 59.423a12.465 12.465 0 008.839 3.661c3.199 0 6.398-1.221 8.839-3.661L391.23 44.882c4.883-4.882 4.883-12.796 0-17.678z"
      />
    </svg>
  );
}
