import { useSelector, useDispatch } from "react-redux";
import useInput from "../hooks/useInput";
import { useCallback } from "react";
import { addPostAction } from "../reducers/post";
import { Form, Input, Button } from "antd";

const PostForm = () => {
  const { imagePaths } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [text, onChangeText] = useInput("");

  const onSubmit = useCallback(() => {
    dispatch(addPostAction);
  }, []);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input type="file" multiple hidden />
        <Button>이미지 업로드</Button>
        <Button type="primary" htmlType="submit" style={{ float: "right" }}>
          작성하기
        </Button>
      </div>
      .
      <div>
        {imagePaths.map((v) => {
          return (
            <div key={v} style={{ display: "inline-block" }}>
              <img src={v} style={{ width: "200px" }} alt={v} />
              <div>
                <Button>제거</Button>
              </div>
            </div>
          );
        })}
      </div>
    </Form>
  );
};

export default PostForm;
