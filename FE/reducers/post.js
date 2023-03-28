const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        username: "erica",
      },
      content: "첫번째 게시글 #해시태그 #판테온",
      Images: [
        {
          src: "https://img.extmovie.com/files/attach/images/135/415/999/086/186803c4189401b59be70cb58847bfad.jpg",
        },
        {
          src: "https://img.extmovie.com/files/attach/images/135/415/999/086/ea26de7173a413094e53d0c9a5fb7845.jpg",
        },
      ],
      Comments: [
        {
          User: {
            id: 2,
            username: "Rica",
          },
          content: "얼른 보고 싶어요!",
        },
        {
          User: {
            id: 3,
            username: "Theon",
          },
          content: "내일 보러가야지!!",
        },
      ],
    },
  ], // 전체 포스트 목록
  imagePaths: [], // 이미지 업로드 시 경로들 저장
  postAdded: false, // 게시글 추가 완료 시 변경
};

const DUMMY_POST = {
  User: {
    id: 1,
    nickname: "Pantheon",
  },
  content: "더미데이터",
  Images: [],
  Comments: [],
};

const ADD_POST = "ADD_POST";

const addPostAction = {
  type: ADD_POST,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [
          { ...DUMMY_POST, id: state.mainPosts.length + 1 },
          ...state.mainPosts,
        ],
        postAdded: true,
      };
    default:
      return { ...state };
  }
};

export { addPostAction };
export default reducer;
