const express = require("express");
const postRouter = require("./routes/post");

const app = express();

// Route 내 공통 부분의 URL을 prefix로 제공
app.use("/post", postRouter);

// 서버에 포트 및 콜백 함수 등록
app.listen(3065, () => {
  console.log("서버 실행중");
});
