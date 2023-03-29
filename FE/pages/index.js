import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import PostForm from "../components/PostForm";
import PostCard from "../components/PostCard";

const Home = () => {
  // TODO 둘 중 어느 편이 최적화 측면에서 좋은지 생각해보기
  const { signInDone } = useSelector((state) => state.user);
  const mainPosts = useSelector((state) => state.post.mainPosts);

  return (
    <Layout>
      {signInDone && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Layout>
  );
};

export default Home;
