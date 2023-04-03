module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // MySQL에는 모델명이 소문자, 복수로 변경됨 'posts'
    {
      // id는 MySQL에서 자동 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      // MySQL 한글 설정 허용, 이모티콘 설정 허용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {};
  return Post;
};
