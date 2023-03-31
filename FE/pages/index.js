import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import PostForm from "../components/posts/PostForm";
import PostCard from "../components/posts/PostCard";

const Home = () => {
  const me = useSelector((state) => state.user.me);
  const mainPosts = useSelector((state) => state.post.mainPosts);

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
