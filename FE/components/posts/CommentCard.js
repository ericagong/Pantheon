import useInput from "../../hooks/useInput";
import { useCallback } from "react";
import { Form, Input, Button, Avatar, Comment } from "antd";
import PropTypes from "prop-types";

const CommentCard = ({ User: { username }, content, id }) => {
  const [onEdit, setOnEdit] = useInput(false);
  const [text, setText, onChangeText] = useInput("");

  const toggleEdit = useCallback((e) => {
    setOnEdit((prev) => !prev);
    setText(content);
  }, []);

  // backend 만든 뒤, update 부분 작성 편리하므로 이후 작성
  const onSubmit = useCallback(() => {
    console.log(`${text}로 댓글을 업데이트합니다.`);
    // dispatch(updateCommentAction(data))
  }, [text]);

  // TODO 코드 가독성을 위해 어떤 처리 해야할지 생각해보기
  return (
    <Comment
      author={username}
      avatar={<Avatar>{username[0]}</Avatar>}
      content={
        !onEdit ? (
          content
        ) : (
          <Form
            style={{ margin: "10px 0 20px" }}
            encType="multipart/form-data"
            onFinish={onSubmit}
          >
            <Input.TextArea
              value={text}
              onChange={onChangeText}
              maxLength={140}
              placeholder="최소한 한 글자 이상 작성해주셔야 댓글 수정이 가능합니다."
            />
            <Button
              danger
              type="default"
              htmlType="button"
              style={{ float: "right" }}
              onClick={toggleEdit}
            >
              취소
            </Button>
            <Button type="primary" htmlType="submit" style={{ float: "right" }}>
              수정완료
            </Button>
          </Form>
        )
      }
      actions={
        !onEdit
          ? [
              <span key={`update_${id}`} name="update" onClick={toggleEdit}>
                수정하기
              </span>,
              <span key={`delete_${id}`} name="delete">
                삭제하기
              </span>,
            ]
          : []
      }
    />
  );
};

CommentCard.propTypes = {
  User: PropTypes.object,
  content: PropTypes.string.isRequired,
  // id: PropTypes.number.isRequired,
};

export default CommentCard;
