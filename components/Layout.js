import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
import styles from "./styles/Aside.module.css";
const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
