import Layout from "../components/Layout";
import Head from "next/head";
import UsernameEditForm from "../components/UsernameEditForm";
import FollowList from "../components/FollowList";

const DUMMIES = {
  FOLLOWERS: [
    { nickname: "follower_erica1" },
    { nickname: "follower_erica2" },
    { nickname: "follower_erica3" },
  ],
  FOLLOWINGS: [
    { nickname: "following_erica1" },
    { nickname: "following_erica2" },
    { nickname: "following_erica3" },
  ],
};

const Profile = () => {
  return (
    <>
      <Head>
        <title>내 프로필 | Pantheon</title>
      </Head>
      <Layout>
        <UsernameEditForm />
        <FollowList header="팔로우 목록" data={DUMMIES.FOLLOWERS} />
        <FollowList header="팔로잉 목록" data={DUMMIES.FOLLOWINGS} />
      </Layout>
    </>
  );
};

export default Profile;
