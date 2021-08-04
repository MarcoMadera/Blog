import { ReactElement } from "react";

export default function Loader(
  props: Record<string, string | number>
): ReactElement {
  return (
    <svg
      width="100%"
      height={94}
      aria-labelledby="loading-aria"
      preserveAspectRatio="none"
      {...props}
    >
      <title>{"Cargando..."}</title>
      <rect
        width="100%"
        height="100%"
        clipPath="url(#prefix__clip-path)"
        fill="url(#prefix__fill)"
      />
      <defs>
        <linearGradient id="prefix__fill">
          <stop offset={0.6} stopColor="#f3f3f3">
            <animate
              attributeName="offset"
              values="-2; -2; 1"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset={1.6} stopColor="#e50b0b">
            <animate
              attributeName="offset"
              values="-1; -1; 2"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset={2.6} stopColor="#f3f3f3">
            <animate
              attributeName="offset"
              values="0; 0; 3"
              keyTimes="0; 0.25; 1"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
        <clipPath id="prefix__clip-path">
          <rect x={85} y={12} rx={3} ry={3} width="20%" height={8} />
          <rect x={240} y={12} rx={3} ry={3} width="10%" height={8} />
          <rect x={85} y={30} rx={3} ry={3} width="80%" height={8} />
          <rect x={85} y={50} rx={3} ry={3} width="75%" height={8} />
          <rect x={85} y={70} rx={3} ry={3} width="40%" height={8} />
          <rect x="10" y="10" rx="30" ry="30" width="60" height="60" />
        </clipPath>
      </defs>
    </svg>
  );
}
