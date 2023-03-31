import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { signInRequestAction } from "../../reducers/user";
import { Form, Input, Button } from "antd";
import Link from "next/link";
import styled from "styled-components";

const NAMES = {
  EMAIL: "email",
  PW: "password",
};

const LABELS = {
  [NAMES.EMAIL]: "이메일",
  [NAMES.PW]: "비밀번호",
};

const TYPES = {
  [NAMES.EMAIL]: "email", // type을 email로 적으면 html이 자동검사 수행
  [NAMES.PW]: "password",
};

const SignInForm = () => {
  const dispatch = useDispatch();
  const signInLoading = useSelector((state) => state.user.signInLoading);

  const [info, setInfo] = useState({
    [NAMES.EMAIL]: "",
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
        <Input
          name={name}
          type={TYPES[name]}
          value={info[name]}
          onChange={onChange}
          required
        />
      </FieldWrapper>
    ));
  };

  const onSignIn = useCallback(() => {
    // antd는 e.preventDefault 기본 적용
    dispatch(signInRequestAction(info));
  }, [info]);

  return (
    <FormWrapper onFinish={onSignIn}>
      {getInputs()}
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={signInLoading}>
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
