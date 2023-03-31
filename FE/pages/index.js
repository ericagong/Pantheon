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

  useEffect(() => {
    dispatch(readPostsAction());
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight - 500
      ) {
        if (hasMorePosts) {
          dispatch(readPostsAction());
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePosts]);

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
