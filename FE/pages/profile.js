import { useSelector } from "react-redux";
import Layout from "../components/Layout";
import Head from "next/head";
import UsernameEditForm from "../components/UsernameEditForm";
import FollowList from "../components/FollowList";

const Profile = () => {
  const { me } = useSelector((state) => state.user);

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
