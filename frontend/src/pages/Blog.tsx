import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog";
import { FullBlog } from "../components/FullBlog";
import { Spinner } from "../components/Spinner";

export const Blog = () => {
  const { id } = useParams();

  const sampleData = {
    author: { name: "" },
    title: "",
    content: "",
    id: "",
  };

  const { loading, blog } = useBlog({ id: id || "" });

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <Spinner />
      </div>
    );
  }
  return (
    <div>
      <FullBlog blog={blog || sampleData} />
    </div>
  );
};
