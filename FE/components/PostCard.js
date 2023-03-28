import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { Card, Button, Avatar, Popover } from "antd";
import PropTypes from "prop-types";
import {
  RetweetOutlined,
  HeartOutlined,
  HeartTwoTone,
  MessageOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import PostCardContent from "./PostCardContent";
import PostImages from "./PostImages";
import styled from "styled-components";

const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const PostCard = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);

  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const onToggleLiked = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setShowComments((prev) => !prev);
  }, []);

  return (
    <CardWrapper key={post.id}>
      {/* antd 사용하지 않으면 cover 대신 이미지로 변경해 넣어줘야함 */}
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" />,
          liked ? (
            <HeartTwoTone
              key="heart"
              onClick={onToggleLiked}
              twoToneColor="#eb2f96"
            />
          ) : (
            <HeartOutlined key="heart" onClick={onToggleLiked} />
          ),
          <MessageOutlined key="message" onClick={onToggleComment} />,
          // antd 더보기 시 팝업 : Popover
          <Popover
            key="ellipsis"
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type="danger">삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta
          avatar={<Avatar>{post.User.username[0]}</Avatar>}
          title={post.User.username}
          description={<PostCardContent postData={post.content} />}
        />
      </Card>
      {showComments && <>댓글부분</>}
    </CardWrapper>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    createdAt: PropTypes.object,
    Comments: PropTypes.arrayOf(PropTypes.any),
    Images: PropTypes.arrayOf(PropTypes.any),
  }),
};

export default PostCard;
