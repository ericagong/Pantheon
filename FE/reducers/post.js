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
          src: "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20230130_41%2F1675041107446A8HAc_PNG%2Fmovie_image.jpg",
        },
        {
          src: "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20230207_218%2F1675730219849H9NRL_PNG%2Fmovie_image.jpg",
        },
        {
          src: "https://search.pstatic.net/common?quality=75&direct=true&src=https%3A%2F%2Fmovie-phinf.pstatic.net%2F20230207_295%2F1675730349897cskgL_PNG%2Fmovie_image.jpg",
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
    username: "Pantheon",
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
