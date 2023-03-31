import { Form, Input } from "antd";

import styled from "styled-components";
import PropTypes from "prop-types";

const UsernameEditForm = () => {
  return (
    <FormWrapper>
      <Input.Search addonBefore="닉네임" enterButton="수정" />
    </FormWrapper>
  );
};

UsernameEditForm.propTypes = {};

const FormWrapper = styled(Form)`
  padding: 10%;
`;

export default UsernameEditForm;
