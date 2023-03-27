import Link from "next/link";
import PropTypes from "prop-types";
import { Menu } from "antd";

const Layout = ({ children }) => {
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
      label: <Link href="/signUp">회원가입</Link>,
      key: "signUp",
    },
  ];

  return (
    <div>
      <div>
        <Menu items={items} mode="horizontal" />
      </div>
      {children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
