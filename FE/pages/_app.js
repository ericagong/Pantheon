// 페이지 공통 로직 처리
import "antd/dist/antd.css";
import Head from "next/head";
import PropTypes from "prop-types";

const App = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Pantheon</title>
      </Head>
      <Component />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default App;
