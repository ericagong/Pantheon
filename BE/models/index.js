const Sequelize = require("sequelize");

// 환경 변수 설정 : 개발시 'development' 배포시 'production'
const env = proccess.env.NODE_ENV || "development";

// config.json에서 환경에 따른 config 설정 가져옴
const config = require("../config/config")[env];

const db = {};

// sequelize가 node와 mysql을 mysql2 드라이브에 전달하여 node와 mysql 연결
const sequelize = new Sequelize(
  config.databse,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
