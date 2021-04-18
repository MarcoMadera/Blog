import Head from "next/head";
import propTypes from "prop-types";
export default function Font({ src = "", name = "" }) {
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
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href={src} rel="stylesheet" />
      </Head>
    );
  }
  return (
    <Head>
      <link href={src} rel="stylesheet" />
    </Head>
  );
}

Font.propTypes = {
  src: propTypes.string,
  name: propTypes.string,
};
