const express = require("express");
const { User, Post } = require("../models"); // db 내 User 구조분해할당
const bcrypt = require("bcrypt");
const router = express.Router();
const passport = require("passport");

// POST /user/signUp
router.post("/signUp", async (req, res, next) => {
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

// POST /user/signIn
// TODO Express에서 미들웨어 확장 연결하는 법
router.post("/signIn", async (req, res, next) => {
  passport.authenticate("local", (serverErr, user, clientErr) => {
    if (serverErr) {
      console.error(serverErr);
      return next(serverErr);
    }
    if (clientErr) {
      return res.status(401).send(clientErr.reason);
    }
    // passport에서 로그인 수행
    return req.login(user, async (passportErr) => {
      if (passportErr) {
        console.error(passportErr);
        return next(passportErr);
      }
      // 최종 로그인 성공 시 사용자 정보 전달
      // passport 에서는 user id에 문자열 정보 매칭해 session에 저장
      // res.setHeader('Cookie', 'blabla')

      const fullUserWithoutPassword = await User.findOne({
        where: {
          id: user.id,
        },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
          },
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// POST /user/signOut
router.post("/signOut", async (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.status(200).send("성공적으로 로그아웃 되었습니다.");
});

module.exports = router;
