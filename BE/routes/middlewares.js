// 로그인, 로그아웃 상태의 사용자만 사용가능하도록 custom-middleware 생성
// middleware는 상 -> 하, 왼 -> 오 순차적으로 진행
// middleware 내에서 next()는 다음 middleware로 이동
// next(에러) 는 에러 처리 미들웨어(맨 끝에 내부적으로 존재)로 이동

exports.isSignedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어로 전달됨
  } else {
    res.status(401).send("로그인이 필요합니다.");
  }
};

exports.isNotSignedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 다음 미들웨어로 전달됨
  } else {
    res.status(401).send("로그인하지 않은 사용자만 접근 가능합니다.");
  }
};
