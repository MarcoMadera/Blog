import { SVGProps, ReactElement } from "react";

export default function RapidChess(
  props: SVGProps<SVGSVGElement>
): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" {...props}>
      <g stroke={props.fill} fill={props.fill}>
        <circle
          cx="256"
          cy="299.34"
          r="166.31"
          fill="transparent"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="56.799"
          stroke={props.fill}
        />
        <g fill={props.fill}>
          <path
            fill={props.fill}
            stroke={props.fill}
            strokeWidth="48.685"
            d="M256 133.03V37.418"
          />
          <g strokeLinecap="round">
            <path
              fill={props.fill}
              stroke={props.fill}
              strokeWidth="64.913"
              d="M208.89 50.403h94.226"
            />
            <path
              fill={props.fill}
              stroke={props.fill}
              strokeWidth="48.685"
              d="m355.61 167.54 37.067-42.61"
            />
            <path
              fill={props.fill}
              stroke={props.fill}
              strokeLinejoin="round"
              strokeWidth="40.571"
              d="M256 225.56v73.781l65.239 1.717"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
