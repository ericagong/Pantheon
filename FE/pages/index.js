import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { readPostsAction } from "../reducers/post";
import PostForm from "../components/posts/PostForm";
import PostCard from "../components/posts/PostCard";

const Home = () => {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.user.me);
  const mainPosts = useSelector((state) => state.post.mainPosts);
  const hasMorePosts = useSelector((state) => state.post.hasMorePosts);
  const readPostsLoading = useSelector((state) => state.post.readPostsLoading);

  useEffect(() => {
    dispatch(readPostsAction());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        // 로딩이 아닌 경우만 실행되도록 프론트단에서 처리하여 무한 스크롤 요청수 제한
        if (hasMorePosts && !readPostsLoading) {
          dispatch(readPostsAction());
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts, readPostsLoading]);

  return (
    <Layout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Home;
