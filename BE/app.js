const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const db = require("./models");

const app = express();

// DB에 sequelize 연결
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

// express 서버에 필요한 미들웨어 연결 (반드시 router 보다 상단에 코드 작성)
app.use(cors({ credentials: true, origin: "http://localhost:3060" }));
app.use(express.json()); // FE의 json 형태를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // formData 사용 시 req.body에 넣어줌

// Route 내 공통 부분의 URL을 prefix로 제공
app.use("/user", userRouter);
app.use("/post", postRouter);

// 서버에 포트 및 콜백 함수 등록
app.listen(3065, () => {
  console.log("서버 실행중! http://localhost:3065");
});
