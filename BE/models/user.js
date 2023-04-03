module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User", // MySQL에는 모델명이 소문자, 복수로 변경됨 'users'
    {
      // id는 MySQL에서 자동 생성
      email: {
        type: DataTypes.STRING(30), // 데이터 형식 지정: STRING, TEXT, BOOLEAN, FLOAT, DATETIME 등...
        allowNull: false, // 필수 여부
        unique: true, // 고유값 여부
      },
      username: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100), // 비밀번호 암호화 위해 길이 넉넉히 지정
        allowNull: false,
      },
    },
    {
      // MySQL 한글 설정 허용
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  User.associate = (db) => {};
  return User;
};
