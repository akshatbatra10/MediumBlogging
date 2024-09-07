import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { BACKEND_URL } from "../config";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handlePost = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/blog`,
      {
        title,
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth-token")}`,
        },
      }
    );

    navigate(`/blog/${response.data.id}`);
  };

  return (
    <div>
      <div className="flex justify-center pt-8">
        <div className="w-full max-w-screen-lg">
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
            placeholder="Enter Title"
          />
          <textarea
            rows={8}
            onChange={(e) => setContent(e.target.value)}
            className="outline-none mt-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-30"
            placeholder="Write your thoughts here..."
          ></textarea>
          <button
            type="submit"
            onClick={handlePost}
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};
