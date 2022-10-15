import { ReactElement, SVGProps } from "react";

export function Share(props: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg {...props} viewBox="-8 0 46 46">
      <path
        fill={props.fill}
        d="M25 46H5a5 5 0 0 1-5-5V23a5 5 0 0 1 5-5h4a1 1 0 0 1 0 2H5a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h20a3 3 0 0 0 3-3V23a3 3 0 0 0-3-3h-4a1 1 0 0 1 0-2h4a5 5 0 0 1 5 5v18a5 5 0 0 1-5 5ZM22.334 9.715 16 3.381V29a1 1 0 0 1-2 0V3.381L7.666 9.715a.977.977 0 0 1-1.381-1.381L14.19.429a.942.942 0 0 1 .095-.144A.973.973 0 0 1 14.99 0h.02a.973.973 0 0 1 .7.283.882.882 0 0 1 .091.14l7.909 7.909a.977.977 0 1 1-1.381 1.381Z"
      />
    </svg>
  );
}
