module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image", // MySQL에는 모델명이 소문자, 복수로 변경됨 'images'
    {
      // id는 MySQL에서 자동 생성
      src: {
        type: DataTypes.STRING(200), // 이미지 url이므로 넉넉히 제공
        allowNull: false,
      },
    },
    {
      // MySQL 한글 설정 허용
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
  Image.associate = (db) => {};
  return Image;
};
