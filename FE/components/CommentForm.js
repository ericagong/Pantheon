import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";

const CommentForm = ({ post }) => {
  const id = useSelector((state) => state.user.me?.id);
  const [comment, setComment] = useState("");

  const onSubmit = useCallback(() => {
    console.log(
      `[제출] 게시글 정보: ${post.id} 댓글 내용: ${comment} 작성자 ${id}`
    );
    setComment("");
  }, [comment]);

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
