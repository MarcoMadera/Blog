import { ReactElement, SVGProps } from "react";

export function Comment(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill={props.fill}
        d="M17 3.25H7A4.756 4.756 0 0 0 2.25 8v13a.75.75 0 0 0 1.28.53l2.414-2.414a1.246 1.246 0 0 1 .885-.366H17A4.756 4.756 0 0 0 21.75 14V8A4.756 4.756 0 0 0 17 3.25ZM20.25 14A3.254 3.254 0 0 1 17 17.25H6.829a2.73 2.73 0 0 0-1.945.806L3.75 19.189V8A3.254 3.254 0 0 1 7 4.75h10A3.254 3.254 0 0 1 20.25 8Z"
      />
    </svg>
  );
}
