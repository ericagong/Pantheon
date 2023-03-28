import { useCallback } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { Form } from "antd";

const SignUp = () => {
  const onSignUp = useCallback(() => {
    // antd에서는 e.preventDefault() 가 이미 적용되어 있음
  }, []);

  return (
    <>
      <Head>
        <title>회원가입 | Pantheon</title>
      </Head>
      <Layout>
        <Form onFinish={onSignUp}></Form>
      </Layout>
    </>
  );
};

export default SignUp;
