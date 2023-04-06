const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const db = require("./models");
const passportConfig = require("./passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const dotenv = require("dotenv");

const app = express();

// DB에 sequelize 연결
db.sequelize
  .sync()
  .then(() => {
    console.log("DB 연결 성공");
  })
  .catch(console.error);

// 환경 설정 연결
dotenv.config();
passportConfig();

// express 서버에 필요한 미들웨어 연결 (반드시 router 보다 상단에 코드 작성)
app.use(cors({ credentials: true, origin: "http://localhost:3060" }));

// 데이터 송수신 관련 미들웨어 연결
app.use(express.json()); // FE의 json 형태를 req.body에 넣어줌
app.use(express.urlencoded({ extended: true })); // formData 사용 시 req.body에 넣어줌

// 로그인 관련 미들웨어 연결
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET, // 쿠키 문자열을 인코딩 base 문자열 -> TODO 향후 dotenv로 이동
  })
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

// Route 내 공통 부분의 URL을 prefix로 제공
app.use("/user", userRouter);
app.use("/post", postRouter);

// 에러처리 미들웨어 (별도의 에러 페이지 등...)
app.use((err, req, res, next) => {});

// 서버에 포트 및 콜백 함수 등록
app.listen(3065, () => {
  console.log("서버 실행중! http://localhost:3065");
});
