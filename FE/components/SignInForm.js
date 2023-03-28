import { useDispatch } from "react-redux";
import { useState, useCallback } from "react";
import { signInAction } from "../reducers/user";
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
  const dispatch = useDispatch();

  const [info, setInfo] = useState({
    [NAMES.ID]: "",
    [NAMES.PW]: "",
  });

  const onChange = useCallback((e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({ ...prev, [name]: value }));
  }, []);

  const getInputs = () => {
    return Object.values(NAMES).map((name) => (
      <FieldWrapper key={`field_${name}`}>
        <label htmlFor={name}>{LABELS[name]}</label>
        <br />
        <Input name={name} value={info[name]} onChange={onChange} required />
      </FieldWrapper>
    ));
  };

  const onSignIn = useCallback(() => {
    // antd 에서는 e.preventDefault 기본 적용
    console.log(info);
    dispatch(signInAction(info));
  }, [info]);

  return (
    <FormWrapper onFinish={onSignIn}>
      {getInputs()}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={false}>
          로그인
        </Button>
        <Link href="/signUp">
          <Button>회원가입</Button>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  padding: 10%;
`;

const FieldWrapper = styled.div`
  margin-top: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

export default SignInForm;
