import { useSelector, useDispatch } from "react-redux";
import { useState, useRef, useCallback, useEffect } from "react";
import { createPostAction } from "../reducers/post";
import { Form, Input, Button } from "antd";

const PostForm = () => {
  const dispatch = useDispatch();

  const { me } = useSelector((state) => state.user);
  const { imagePaths, createPostDone } = useSelector((state) => state.post);
  const [text, setText] = useState("");

  const imageInputRef = useRef();

  // 서버측에서 에러가 나지 않고 성공적으로 처리된 경우만 작성했던 본문 비우기
  useEffect(() => {
    if (createPostDone) {
      setText("");
    }
  }, [createPostDone]);

  const _onSubmit = useCallback(() => {
    dispatch(createPostAction({ content: text, User: me }));
  }, [text]);

  const _onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  // ref 통해 DOM 요소 직접 접근
  const _onClickImageButton = useCallback(() => {
    imageInputRef.current.click();
  }, [imageInputRef.current]);

  return (
    <Form
      style={{ margin: "10px 0 20px" }}
      encType="multipart/form-data"
      onFinish={_onSubmit}
    >
      <Input.TextArea
        value={text}
        onChange={_onChangeText}
        maxLength={140}
        placeholder="즐거운 추억이 있다면 공유해보세요."
      />
      <input type="file" ref={imageInputRef} multiple hidden />
      <Button onClick={_onClickImageButton}>이미지 업로드</Button>
      <Button type="primary" htmlType="submit" style={{ float: "right" }}>
        작성하기
      </Button>
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
    </Form>
  );
};

export default PostForm;
