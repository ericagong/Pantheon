import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { Card, Avatar, Button } from "antd";
import { signOutRequestAction } from "../reducers/user";

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

const UserProfile = () => {
  const dispatch = useDispatch();
  const { me, signOutLoading } = useSelector((state) => state.user);

  const data = useMemo(
    () => ({
      [NAMES.ALERT]: 1,
      [NAMES.FOLLOWINGS]: me.Followings.length,
      [NAMES.FOLLOWERS]: me.Followers.length,
    }),
    []
  );

  const getInfo = () => {
    return Object.values(NAMES).map((name) => (
      <div key={`info_${name}`}>
        {LABELS[name]}
        <br />
        {data[name]}
      </div>
    ));
  };

  const onSignOut = useCallback(() => {
    dispatch(signOutRequestAction());
  }, []);

  return (
    <Card actions={getInfo()}>
      <Card.Meta
        avatar={<Avatar>{me.username[0]}</Avatar>}
        title={me.username}
        description={
          <Button onClick={onSignOut} loading={signOutLoading}>
            로그아웃
          </Button>
        }
      />
    </Card>
  );
};

export default UserProfile;
