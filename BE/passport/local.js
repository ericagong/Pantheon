const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const { User } = require("../models");
const bcrypt = require("bcrypt");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          // 클라이언트 에러
          const user = await User.findOne({
            where: {
              email,
            },
          });

          // 미가입 사용자 에러
          if (!user) {
            return done(null, false, { reason: "가입되지 않은 이메일입니다." });
          }

          const result = await bcrypt.compare(password, user.password);

          // 비밀번호 에러
          if (!result) {
            return done(null, false, { reason: "잘못된 비밀번호입니다." });
          }

          // 로그인 성공
          return done(null, user);
        } catch (err) {
          // 서버 에러
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
