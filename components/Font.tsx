import Head from "next/head";
import { ReactElement } from "react";

interface FontProps {
  src: string;
  name?: string;
}

export default function Font({ src, name }: FontProps): ReactElement {
  if (name) {
    return (
      <style global jsx>{`
        @font-face {
          font-family: ${name};
          src: url(${src});
        }
      `}</style>
    );
  }
  if (src.startsWith("https://fonts.googleapis.com")) {
    return (
      <Head key={src}>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={src} rel="stylesheet" />
      </Head>
    );
  }
  return (
    <Head key={src}>
      <link href={src} rel="stylesheet" />
    </Head>
  );
}
