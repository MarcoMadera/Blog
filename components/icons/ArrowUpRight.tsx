import { SVGProps, ReactElement } from "react";

export default function ArrowUpRight(
  props: SVGProps<SVGSVGElement>
): ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 552 512" {...props}>
      <path
        fill={props.fill}
        d="m531.01 114.91-60.375 242.02a13.013 13.013 0 0 1-9.188 9.54 13.26 13.26 0 0 1-12.777-3.415l-40.688-40.688-135.19 135.19c-5.12 5.121-13.421 5.121-18.546 0l-81.812-81.812c-5.122-5.125-5.122-13.426 0-18.547l135.19-135.19-40.688-40.688a13.122 13.122 0 0 1 6.125-22.05l242.02-60.29a13.217 13.217 0 0 1 12.426 3.5 13.217 13.217 0 0 1 3.5 12.426z"
      />
    </svg>
  );
}
