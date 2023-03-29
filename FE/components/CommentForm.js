import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import * as ACTIONS from "../reducers/actions";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { createCommentAction } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const { id, username } = useSelector((state) => state.user.me);
  const createCommentDone = useSelector((state) => state.post);
  const [comment, setComment] = useState("");

  const onSubmit = useCallback(() => {
    // TODO 재사용성 있으면, 액션 생성 함수로 분리. 특정 컴포넌트에서만 사용되면 함수 분리 불필요.
    console.log(id, username);
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
          style={{ position: "absolute", right: 0, bottom: -40 }}
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
