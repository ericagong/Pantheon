import { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";

const NAMES = {
  ID: "id",
  PW: "password",
};

const LABELS = {
  [NAMES.ID]: "아이디",
  [NAMES.PW]: "비밀번호",
};

const SignInForm = () => {
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

  return (
    <Form>
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

export default SignInForm;
