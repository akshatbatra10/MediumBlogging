import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex items-center">
          <Avatar name={authorName} size={"small"} />
          <div className="font-extralight pl-2 text-sm">{authorName}</div>
          <div className="pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-thin text-slate-400 text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
        <div className="text-slate-500 text-sm font-thin pt-4">{`${Math.ceil(
          content.length / 100
        )} mins`}</div>
      </div>
    </Link>
  );
};

function Circle() {
  return <div className="w-1 h-1 rounded-full bg-slate-400"></div>;
}
