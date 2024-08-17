import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Head from "next/head";
import { useRouter } from "next/router";

const Layout = ({ children, title, searchType }) => {
  const [header, setHeader] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let path = router.pathname;
    let noHeaderPaths = ["/signUp/SignUp", "/signIn/SignIn", "/forgotPassword/ForgotPassword", "/"];
    if (noHeaderPaths.includes(path)) {
      setHeader(false);
    } else {
      setHeader(true);
    }
  }, [router.pathname]);

  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <title>{title} Dashboard</title>
      </Head>
      {header ? <Header /> : <div></div>}
      <div>{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchType: state.searchType,
  };
};

export default connect(mapStateToProps)(Layout);
