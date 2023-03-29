import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useCallback } from "react";
import { createPostAction } from "../reducers/post";
import { Form, Input, Button } from "antd";

const PostForm = () => {
  const dispatch = useDispatch();

  const { imagePaths } = useSelector((state) => state.post);
  const [text, setText] = useState("");

  const imageInputRef = useRef();

  const onSubmit = useCallback(() => {
    dispatch(createPostAction(text));
    // TODO 서버쪽 에러에 의한 처리 불가
    setText("");
  }, [text]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  // ref 통해 DOM 요소 직접 접근
  const onClickImageButton = useCallback(() => {
    imageInputRef.current.click();
  }, [imageInputRef.current]);

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
        <input type="file" ref={imageInputRef} multiple hidden />
        <Button onClick={onClickImageButton}>이미지 업로드</Button>
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
