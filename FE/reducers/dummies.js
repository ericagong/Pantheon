import shortId from "shortid";
import faker from "faker";

faker.seed(1031);

/**
 * createOnePost
 * @param {{ content, User }} data
 * @returns {{id, content, User, Images, Comments}} Dummy post 반환
 */
export const createOnePost = (data) => ({
  id: shortId.generate(),
  Images: [],
  Comments: [],
  ...data,
});

/**
 * createManyPosts
 * @returns {[Post, ...]} 20개의 post로 구성된 배열 반환
 */
export const createManyPosts = () => {
  return Array(10)
    .fill()
    .map((_) => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        username: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: Array(Math.floor(Math.random() * 4))
        .fill()
        .map((_) => ({
          src: faker.image.image(),
        })),
      Comments: Array(Math.floor(Math.random() * 6))
        .fill()
        .map((_) => ({
          User: {
            id: shortId.generate(),
            username: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        })),
    }));
};

/**
 * createOneComment
 * @param {{ content, User }} data
 * @returns {{id, content, User, Images, Comments}} Dummy comment 반환
 */
export const createOneComment = (data) => {
  return {
    id: shortId.generate(),
    User: data.User,
    content: data.content,
  };
};
