declare module "@mapbox/rehype-prism" {
  export default function rehypePrism(options: {
    showLineNumbers?: boolean;
    ignoreMissing?: boolean;
  }): Visitor;
}
