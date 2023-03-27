import { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";
import PropTypes from "prop-types";

const NAMES = {
  ID: "id",
  PW: "password",
};

const LABELS = {
  [NAMES.ID]: "아이디",
  [NAMES.PW]: "비밀번호",
};

const SignInForm = ({ setIsLoggedIn }) => {
  const [info, setInfo] = useState({
    [NAMES.ID]: "",
    [NAMES.PW]: "",
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  // THINK 리렌더링 발생하는지?
  const getInputs = () => {
    return Object.values(NAMES).map((name) => (
      <FieldWrapper key={`field_${name}`}>
        <label htmlFor={name}>{LABELS[name]}</label>
        <br />
        <Input name={name} value={info[name]} onChange={onChange} required />
      </FieldWrapper>
    ));
  };

  const onSumbit = useCallback(() => {
    // antd 에서는 e.preventDefault 기본 적용
    console.log(info);
    setIsLoggedIn(true);
  }, [info]);

  return (
    <Form onFinish={onSumbit}>
      {getInputs()}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signUp">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </Form>
  );
};

const FieldWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

SignInForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default SignInForm;
