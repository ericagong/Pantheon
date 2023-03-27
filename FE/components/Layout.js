import { useState } from "react";
import Link from "next/link";
import { Menu, Input, Row, Col } from "antd";
import UserProfile from "./UserProfile";
import SignInForm from "./SignInForm";
import PropTypes from "prop-types";
import styled from "styled-components";

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onSearch = (value) => console.log(value);

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
        <SearchInput
          placeholder="검색어를 입력하세요."
          onSearch={onSearch}
          enterButton
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

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;

export default Layout;
