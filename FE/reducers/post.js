import * as ACTIONS from "./actions";
import produce from "immer";

/**
 * initialState
 * @props {boolean} __Loading 비동기처리 진행중
 * @props {boolean} __Done 비동기처리 성공
 * @props {object} __Error 비동기처리 결과 에러 객체
 */
const initialState = {
  mainPosts: [], // 전체 Post 목록
  imagePaths: [], // 업로드 이미지 경로 목록
  hasMorePosts: true, // DB내 모든 Posts를 가져왔는지

  createPostLoading: false,
  createPostDone: false,
  createPostError: null,
  readPostsLoading: false,
  readPostsDone: false,
  readPostsError: null,
  deletePostLoading: false,
  deletePostDone: false,
  deletePostError: null,

  createCommentLoading: false,
  createCommentDone: false,
  createCommentError: null,
};

// action creators
/**
 * createPostAction
 * @param {{ content: text, User: me }} data
 * @returns action 객체 반환
 */
export const createPostAction = (data) => ({
  type: ACTIONS.CREATE_POST_REQUEST,
  data,
});

/**
 * readdPostsAction
 * @returns action 객체 반환
 */
export const readPostsAction = () => ({
  type: ACTIONS.READ_POSTS_REQUEST,
});

/**
 *
 * @param {*} data
 * @returns
 */
export const deletePostAction = (data) => ({
  type: ACTIONS.DELETE_POST_REQUEST,
  data,
});

/**
 *
 * @param {*} data
 * @returns
 */
export const createCommentAction = (data) => ({
  type: ACTIONS.CREATE_COMMENT_REQUEST,
  data,
});

// reducer
const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ACTIONS.CREATE_POST_REQUEST:
        draft.createPostLoading = true;
        draft.createPostDone = false;
        draft.createPostError = null;
        break;
      case ACTIONS.CREATE_POST_SUCCESS: // action = {type, data: Post}
        draft.createPostLoading = false;
        draft.createPostDone = true;
        draft.mainPosts.unshift(action.data); // 시간복잡도 좋지 않음
        // draft.mainPosts = [action.data, ...draft.mainPosts];
        break;
      case ACTIONS.CREATE_POST_FAILURE:
        draft.createPostLoading = false;
        draft.createPostError = action.error;
        break;

      case ACTIONS.READ_POSTS_REQUEST:
        draft.readPostsLoading = true;
        draft.readPostsDone = false;
        draft.readPostsError = null;
        break;
      case ACTIONS.READ_POSTS_SUCCESS: // action = {type, data: {posts, hasMorePosts}}
        draft.readPostsLoading = false;
        draft.readPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.hasMorePosts = draft.mainPosts.length <= 50; // 향후 서버측 응답값으로 변경
        break;
      case ACTIONS.READ_POSTS_FAILURE:
        draft.readPostsLoading = false;
        draft.readPostsError = action.error;
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
      case ACTIONS.CREATE_COMMENT_SUCCESS: // action = {type, data: {comment, postId}}
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
