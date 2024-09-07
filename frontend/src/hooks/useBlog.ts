import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface BlogData {
  title: string;
  content: string;
  id: string;
  author: { name: string };
}

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<BlogData>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return {
    blog,
    loading,
  };
};
