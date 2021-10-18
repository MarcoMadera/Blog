import useDarkMode from "hooks/useDarkMode";
import { ReactElement, SVGProps } from "react";
import { colors } from "styles/theme";

export function NumberList(props: SVGProps<SVGSVGElement>): ReactElement {
  const { darkMode } = useDarkMode();

  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill={darkMode ? colors.dark_textColor : colors.textColor}
        d="M4.788 16.017c.5 0 .891.112 1.17.338.28.226.419.518.419.878 0 .64-.325 1.042-.974 1.204v.017c.346.043.62.169.82.377.2.209.3.465.3.768 0 .458-.167.82-.502 1.087-.334.266-.797.4-1.387.4-.506 0-.917-.083-1.234-.247v-.94c.328.24.71.36 1.148.36.276 0 .49-.06.645-.178a.59.59 0 00.23-.496.563.563 0 00-.285-.506c-.19-.118-.452-.178-.784-.178h-.455v-.827h.42c.638 0 .957-.212.957-.636 0-.398-.245-.598-.734-.598-.329 0-.648.106-.958.318v-.882c.345-.173.746-.26 1.204-.26zM19.75 18a.75.75 0 110 1.5h-9a.75.75 0 110-1.5h9zM4.962 9.517c.248 0 .471.032.668.097.197.065.364.158.5.279.138.12.242.267.314.439.071.172.107.364.107.576 0 .225-.034.426-.104.601-.07.176-.162.335-.277.479a2.511 2.511 0 01-.398.395l-.23.176-.238.17c-.11.078-.215.155-.316.231a3.128 3.128 0 00-.269.226 1.225 1.225 0 00-.184.217.375.375 0 00-.069.201h2.078v.896h-3.26v-.37c0-.25.042-.475.126-.674.084-.2.19-.378.318-.537.128-.158.267-.298.419-.42.1-.081.198-.157.293-.228l.14-.102c.143-.103.269-.2.377-.294.108-.093.2-.186.273-.279.074-.092.13-.185.166-.28a.834.834 0 00.055-.302c0-.21-.06-.368-.178-.475-.119-.108-.3-.161-.544-.161-.421 0-.824.167-1.21.502v-.95a2.597 2.597 0 011.443-.413zm14.788 1.977a.75.75 0 110 1.5h-9a.75.75 0 010-1.5h9zM5.695 2.989V8H4.618V4.206a1.29 1.29 0 01-.21.149 2.17 2.17 0 01-.542.222 2.072 2.072 0 01-.29.056v-.909a4.491 4.491 0 001.466-.735h.653zM19.75 5a.75.75 0 110 1.5h-9a.75.75 0 110-1.5h9z"
      />
    </svg>
  );
}
