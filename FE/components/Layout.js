import Link from "next/link";
import { useSelector } from "react-redux";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./my/UserProfile";
import SignInForm from "./auth/SignInForm";
import PropTypes from "prop-types";

const INPUT_STYLE = {
  style: { verticalAlign: "middle" },
};

const Layout = ({ children }) => {
  const me = useSelector((state) => state.user.me);

  const onSearch = (value) => console.log(value);

  const { Search } = Input;

  const items = [
    {
      label: <Link href="/">홈</Link>,
      key: "home",
    },
    {
      label: <Link href="/profile">프로필</Link>,
      key: "profile",
    },
    {
      label: (
        <Search
          placeholder="검색어를 입력하세요."
          onSearch={onSearch}
          enterButton
          {...INPUT_STYLE}
        />
      ),
      key: "searchBar",
    },
    {
      label: <Link href="/signUp">회원가입</Link>,
      key: "signUp",
    },
  ];

  return (
    <>
      <Menu items={items} mode="horizontal" />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <SignInForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://github.com/ericagong"
            target="_blank"
            rel="noreferrer noopener" // 보안 위협 방어
          >
            Made by Pantheon
          </a>
        </Col>
      </Row>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
