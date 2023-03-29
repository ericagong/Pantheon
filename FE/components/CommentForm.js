import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback } from "react";
import * as ACTIONS from "../reducers/actions";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.user.me?.id);
  const [comment, setComment] = useState("");

  const onSubmit = useCallback(() => {
    console.log(
      `[제출] 게시글 정보: ${post.id} 댓글 내용: ${comment} 작성자 ${id}`
    );
    // TODO 재사용성 있으면, 액션 생성 함수로 분리. 특정 컴포넌트에서만 사용되면 함수 분리 불필요.
    dispatch({
      type: ACTIONS.CREATE_COMMENT_REQUEST,
      data: { content: comment, postId: post.id, userId: id },
    });
    setComment("");
  }, [comment, id]);

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
