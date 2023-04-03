module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post", // MySQL에는 모델명이 소문자, 복수로 변경됨 'posts'
    {
      // id는 MySQL에서 자동 생성
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      // UserId: {}
    },
    {
      // MySQL 한글 설정 허용, 이모티콘 설정 허용
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    }
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // 속한 관계, Post 작성자
    db.Post.hasMany(db.Comment); // 1: many 관계
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" }); // many: many 관계
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" }); // many: many 관계, 중간 테이블 이름 지정, db User 이름을 Likers로 변경
  };
  return Post;
};
