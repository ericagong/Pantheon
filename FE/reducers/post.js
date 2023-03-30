import shortId from "shortid";
import * as ACTIONS from "./actions";
import produce from "immer";

const initialState = {
  createPostLoading: false, // 비동기 처리 진행 중
  createPostDone: false,
  createPostError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,
  createCommentLoading: false,
  createCommentDone: false,
  createCommentError: null,
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        username: "Erica",
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
            id: shortId.generate(),
            username: "Rica",
          },
          content: "얼른 보고 싶어요!",
        },
        {
          User: {
            id: shortId.generate(),
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

export const deletePostAction = (data) => ({
  type: ACTIONS.DELETE_POST_REQUEST,
  data,
});

export const createCommentAction = (data) => ({
  type: ACTIONS.CREATE_COMMENT_REQUEST,
  data,
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ACTIONS.CREATE_POST_REQUEST:
        draft.createPostLoading = true;
        draft.createPostDone = false;
        draft.createPostError = null;
        break;
      case ACTIONS.CREATE_POST_SUCCESS:
        draft.createPostLoading = false;
        draft.createPostDone = true;
        draft.mainPosts.unshift(action.data); // 시간복잡도 좋지 않음
        // draft.mainPosts = [action.data, ...draft.mainPosts];
        break;
      case ACTIONS.CREATE_POST_FAILURE:
        draft.createPostLoading = false;
        draft.createPostError = action.errorfalse;
        break;
      case ACTIONS.DELETE_POST_REQUEST:
        draft.deletePostLoading = true;
        draft.deletePostDone = false;
        draft.deletePostError = null;
        break;
      case ACTIONS.DELETE_POST_SUCCESS:
        draft.deletePostLoading = false;
        draft.deletePostDone = true;
        // 의미론적으로 immer 내에서는 불변성을 지키지 않아도 되므로 splice 사용 가능
        draft.mainPosts = draft.mainPosts.filter(
          (post) => post.id !== action.data.postId
        );
        break;
      case ACTIONS.DELETE_POST_FAILURE:
        draft.deletePostLoading = false;
        draft.deletePostError = action.error;
        break;
      case ACTIONS.CREATE_COMMENT_REQUEST:
        draft.createCommentLoading = true;
        draft.createCommentDone = false;
        draft.createCommentError = null;
        break;
      case ACTIONS.CREATE_COMMENT_SUCCESS:
        draft.createCommentLoading = false;
        draft.createCommentDone = true;
        // find, indexOf 차이
        const targetPost = draft.mainPosts.find(
          (post) => post.id === action.data.postId
        );
        targetPost.Comments.unshift(action.data.comment); // 시간복잡도 좋지 않음
        // targetPost.Comments = [action.data, ...draft.Comments];
        break;
      case ACTIONS.CREATE_COMMENT_FAILURE:
        draft.createCommentLoading = false;
        draft.createCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
