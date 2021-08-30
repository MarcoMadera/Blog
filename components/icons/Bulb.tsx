import { ReactElement } from "react-markdown";

export function Bulb(props: Record<string, string | number>): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.width}
      height={props.height}
      viewBox="0 0 24 24"
    >
      <path
        fill={(props.fill as string) || "#48c4d8"}
        fillRule="evenodd"
        d="M9,21 C9,21.55 9.45,22 10,22 L14,22 C14.55,22 15,21.55 15,21 L15,20 L9,20 L9,21 Z M12,2 C8.13,2 5,5.13 5,9 C5,11.38 6.19,13.47 8,14.74 L8,17 C8,17.55 8.45,18 9,18 L15,18 C15.55,18 16,17.55 16,17 L16,14.74 C17.81,13.47 19,11.38 19,9 C19,5.13 15.87,2 12,2 Z"
      />
    </svg>
  );
}
