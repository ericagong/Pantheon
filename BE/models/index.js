const Sequelize = require("sequelize");

// 환경 변수 설정 : 개발시 'development' 배포시 'production'
const env = process.env.NODE_ENV || "development";

// config.json에서 환경에 따른 config 설정 가져옴
const config = require("../config/config")[env];

// sequelize가 node와 mysql을 mysql2 드라이브에 전달하여 node와 mysql 연결
const sequelize = new Sequelize(
  config.databse,
  config.username,
  config.password,
  config
);

const db = {};

// sequelize에 db model 등록
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Image = require("./image")(sequelize, Sequelize);
db.Hashtag = require("./hashtag")(sequelize, Sequelize);

// 반복문으로 각 db에 대해 associate 함수 실행해 model간 관계 등록
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db에 sequelize 연결c
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
