const express = require("express");
const { User } = require("../models"); // db 내 User 구조분해할당
const bcrypt = require("bcrypt");
const router = express.Router();

// POST /user/
router.post("/", async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // 동일 이메일을 사용한 기존 사용자 DB 내 존재 시 null 아님
    if (exUser) {
      return res.status(403).send("이미 가입된 이메일입니다.");
    }

    // 비밀번호 보안 위해 해시화
    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    // 가입 처리
    await User.create({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    // 브라우저의 CORS 에러가 나지 않도록 각 router에서 서버가 허용 OR 미들웨어로 한번에 처리 가능
    // res.setHeader("Access-Control-Allow-Origin", "*");

    res.status(201).end("성공적으로 가입되었습니다.");
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
