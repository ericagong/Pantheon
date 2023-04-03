http = require("http");

// 서버 생성, API 요청에 따른 응답 작성
const server = http.createServer((req, res) => {
  console.log(req.url, res.method);
  if (req.method === "GET") {
    if (req.url === "/api/post") {
      res.write("post1");
      res.end("post 전송 완료");
    } else if (req.url === "/api/posts") {
      res.write("post 여러개");
      res.end("post 여러개 전송 완료");
    }
  }
  if (req.method === "POST") {
    if (req.url === "/api/post") {
      res.write("post1");
      res.end("post 생성 완료");
    }
  }
});

// 서버에 포트 및 콜백 함수 등록
server.listen(3065, () => {
  console.log("서버 실행중");
});
