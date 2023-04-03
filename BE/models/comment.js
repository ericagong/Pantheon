module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment", // MySQL에는 모델명이 소문자, 복수로 변경됨 'comments'
    {
      // id는 MySQL에서 자동 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId: {}
      // PostId: {}
    },
    {
      // MySQL 한글 설정 허용, 이모티콘 설정 허용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.Post); // 속한 관계 PostId column 자동 생성
    db.Comment.belongsTo(db.User); // 속한 관계 UserId column 자동 생성
  };
  return Comment;
};
