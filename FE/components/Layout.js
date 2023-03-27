import Link from "next/link";
import PropTypes from "prop-types";
import { Menu, Input, Row, Col } from "antd";

const Layout = ({ children }) => {
  const { Search } = Input;

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
        <Search
          placeholder="검색어를 입력하세요."
          onSearch={onSearch}
          enterButton
          style={{ verticalAlign: "middle" }}
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
    <div>
      <div>
        <Menu items={items} mode="horizontal" />
        <Row gutter={8}>
          <Col xs={24} md={6}>
            왼쪽 메뉴
          </Col>
          <Col xs={24} md={12}>
            {children}
          </Col>
          <Col xs={24} md={6}>
            <a
              href="https://github.com/ericagong"
              target="_blank"
              rel="noreferrer noopener"
            >
              Made by Pantheon
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
