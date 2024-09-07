import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogData {
  title: string;
  content: string;
  id: string;
  author: { name: string };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return {
    blogs,
    loading,
  };
};
