import * as ACTIONS from "./actions";

const initialState = {
  createPostLoading: false, // 비동기 처리 진행 중
  createPostDone: false,
  createPostError: null,
  createCommentLoading: false, // 비동기 처리 진행 중
  createCommentDone: false,
  createCommentError: null,
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
};

export const createPostAction = (data) => ({
  type: ACTIONS.CREATE_POST_REQUEST,
  data,
});

export const createCommentAction = (data) => ({
  type: ACTIONS.CREATE_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.CREATE_POST_REQUEST:
      return {
        ...state,
        createPostLoading: true,
        createPostDone: false,
        createPostError: null,
      };
    case ACTIONS.CREATE_POST_SUCCESS:
      return {
        ...state,
        createPostLoading: false,
        createPostDone: true,
        mainPosts: [action.data, ...state.mainPosts],
      };
    case ACTIONS.CREATE_POST_FAILURE:
      return {
        ...state,
        createPostLoading: false,
        createPostError: action.error,
      };
    case ACTIONS.CREATE_COMMENT_REQUEST:
      return {
        ...state,
        createCommentLoading: true,
        createCommentDone: false,
        createCommentError: null,
      };
    case ACTIONS.CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        createCommentLoading: false,
        createCommentDone: true,
        mainPosts: state.mainPosts.map((post) => {
          if (post.id === action.data.postId) {
            return {
              ...post,
              Comments: [action.data.comment, ...post.Comments],
            };
          } else return post;
        }),
      };
    case ACTIONS.CREATE_COMMENT_FAILURE:
      return {
        ...state,
        createCommentLoading: false,
        createCommentError: action.error,
      };
    default:
      return { ...state };
  }
};

export default reducer;
