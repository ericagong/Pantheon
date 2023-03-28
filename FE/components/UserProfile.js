import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { signOutAction } from "../reducers";

const DUMMY_USER = {
  USERNAME: "Pantheon",
  PROFILE: "PT",
};

const NAMES = {
  ALERT: "alert",
  FOLLOWINGS: "followings",
  FOLLOWERS: "followers",
};

const LABELS = {
  [NAMES.ALERT]: "알림",
  [NAMES.FOLLOWINGS]: "팔로잉",
  [NAMES.FOLLOWERS]: "팔로워",
};

const DATA = {
  [NAMES.ALERT]: 1,
  [NAMES.FOLLOWINGS]: 13,
  [NAMES.FOLLOWERS]: 1000,
};

const UserProfile = () => {
  const dispatch = useDispatch();

  const getInfo = () => {
    return Object.values(NAMES).map((name) => (
      <div key={`info_${name}`}>
        {LABELS[name]}
        <br />
        {DATA[name]}
      </div>
    ));
  };

  const onSignOut = useCallback(() => {
    dispatch(signOutAction());
  }, []);

  return (
    <Card actions={getInfo()}>
      <Card.Meta
        avatar={<Avatar>{DUMMY_USER.PROFILE}</Avatar>}
        title={DUMMY_USER.USERNAME}
        description={<Button onClick={onSignOut}>로그아웃</Button>}
      />
    </Card>
  );
};

export default UserProfile;
