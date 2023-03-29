import useInput from "../hooks/useInput";
import { useState, useCallback } from "react";
import Layout from "../components/Layout";
import Head from "next/head";
import { Form, Input, Checkbox, Button } from "antd";
import styled from "styled-components";

const SignUp = () => {
  const [email, onChangeEmail] = useInput("");
  const [username, onChangeUsername] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, []);

  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(!e.target.checked);
  }, []);

  // CHECK 사용자 기입 필드는 여러번 체크할 수록 좋음
  const onSignUp = useCallback(() => {
    // antd에서는 e.preventDefault() 가 이미 적용되어 있음
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log(email, username, password);
  }, [password, passwordCheck, term]);

  return (
    <>
      <Head>
        <title>회원가입 | Pantheon</title>
      </Head>
      <Layout>
        <Form onFinish={onSignUp}>
          <>
            <label htmlFor="email">아이디</label>
            <br />
            <Input
              name="email"
              value={email}
              required
              onChange={onChangeEmail}
            />
          </>
          <>
            <label htmlFor="username">닉네임</label>
            <br />
            <Input
              name="username"
              value={username}
              required
              onChange={onChangeUsername}
            />
          </>
          <>
            <label htmlFor="password">비밀번호</label>
            <br />
            <Input
              name="password"
              type="password"
              value={password}
              required
              onChange={onChangePassword}
            />
          </>
          <>
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <br />
            <Input
              name="passwordCheck"
              type="password"
              value={passwordCheck}
              required
              onChange={onChangePasswordCheck}
            />
            {passwordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </>
          <>
            <Checkbox name="term" checked={term} onChange={onChangeTerm}>
              사용자 이용 약관에 동의합니다.
            </Checkbox>
            {termError && (
              <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>
            )}
          </>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              가입하기
            </Button>
          </ButtonWrapper>
        </Form>
      </Layout>
    </>
  );
};

const FieldWrapper = styled.div`
  margin-top: 10px;
`;

const ErrorMessage = styled.div`
  color: "red";
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default SignUp;
