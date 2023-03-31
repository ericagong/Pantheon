import { useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";
import Layout from "../components/Layout";
import Head from "next/head";
import UsernameEditForm from "../components/UsernameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const me = useSelector((state) => state.user.me);

  useEffect(() => {
    // 프로필 페이지에서 로그아웃
    if (!me) {
      Router.push("/");
    }
  }, [me]);

  if (!me) return null;

  return (
    <>
      <Head>
        <title>내 프로필 | Pantheon</title>
      </Head>
      <Layout>
        <UsernameEditForm />
        <FollowList header="팔로우 목록" data={me.Followers} />
        <FollowList header="팔로잉 목록" data={me.Followings} />
      </Layout>
    </>
  );
};

export default Profile;
