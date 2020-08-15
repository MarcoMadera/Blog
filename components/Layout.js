import Navbar from "./Navbar";
import Footer from "./Footer";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <>
      {/* <Head>
        <title>Marco Madera</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head> */}
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
