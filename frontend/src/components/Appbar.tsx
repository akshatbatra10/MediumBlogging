import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between items-center px-10 py-4">
      <div className="cursor-pointer">
        <Link to={"/blogs"}>Medium</Link>
      </div>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="mr-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          >
            New
          </button>
        </Link>

        <Avatar name="Akshat Batra" size={"big"} />
      </div>
    </div>
  );
};
