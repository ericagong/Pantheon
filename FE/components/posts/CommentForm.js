import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { createCommentAction } from "../../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me.id);
  const username = useSelector((state) => state.user.me.username);
  const createCommentDone = useSelector((state) => state.post);
  const [comment, setComment] = useState("");

  const onSubmit = useCallback(() => {
    // TODO 서버 연결 시, user 정보 전체를 가져와서 User: user로 변경
    dispatch(
      createCommentAction({
        content: comment,
        postId: post.id,
        User: { id, username },
      })
    );
  }, [comment, id, username]);

  // 서버측에서 에러가 나지 않고 성공적으로 처리된 경우만 작성했던 본문 비우기
  useEffect(() => {
    if (createCommentDone) {
      setComment("");
    }
  }, [createCommentDone]);

  const onChangeComment = useCallback((e) => {
    setComment(e.target.value);
  }, []);

  return (
    <Form onFinish={onSubmit}>
      <Form.Item>
        <Input.TextArea
          value={comment}
          onChange={onChangeComment}
          rows={4}
          style={{ position: "relative", margin: 0 }}
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ position: "absolute", right: 0, bottom: -40, zIndex: 10 }}
        >
          작성하기
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;