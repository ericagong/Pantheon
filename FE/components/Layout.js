import { useState, useMemo } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import SignInForm from "./SignInForm";
import PropTypes from "prop-types";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSearch = (value) => console.log(value);

  const { Search } = Input;

  const InputStyle = useMemo(() => {
    return { verticalAlign: "midddle" };
  }, []);

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
          style={InputStyle}
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
          {isLoggedIn ? (
            <UserProfile setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <SignInForm setIsLoggedIn={setIsLoggedIn} />
          )}
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
