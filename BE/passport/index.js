const passport = require("passport");
const local = require("./local");
const { User } = require("../models");

module.exports = () => {
  // req.login 시 serializeUser가 실행되며, session에 정보 저장
  passport.serializeUser((user, done) => {
    done(null, user.id); // user 정보 중 id만 쿠키와 묶어 저장
  });

  // session에 저장된 정보를 바탕으로 user 정보 복구하여 req.user에 user 정보 대입
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      });
      done(null, user);
    } catch (err) {
      console.error(err);
      done(err);
    }
  });

  local();
};
