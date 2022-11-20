import { SVGProps, ReactElement } from "react";

export default function ArrowDownRight(
  props: SVGProps<SVGSVGElement>
): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552 512" {...props}>
      <path
        fill={props.fill}
        d="M527.52 457.55a13.365 13.365 0 0 1-12.426 3.5l-242.02-60.297a13.126 13.126 0 0 1-6.125-22.05l40.688-40.688-135.19-135.19a13.043 13.043 0 0 1 0-18.551l81.812-81.812a13.043 13.043 0 0 1 18.55 0L408 237.652l40.689-40.688a13.25 13.25 0 0 1 12.773-3.41 13.008 13.008 0 0 1 9.187 9.535l60.375 242.02v.004a12.872 12.872 0 0 1-3.5 12.434z"
      />
    </svg>
  );
}
