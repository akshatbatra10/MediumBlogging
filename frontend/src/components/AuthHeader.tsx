import { Link } from "react-router-dom";

export const AuthHeader = ({ type }: { type: "signup" | "signin" }) => {
  return (
    <div className="px-10">
      <div className="text-3xl font-extrabold">
        {type === "signin" ? "Welcome Back" : "Create an account"}
      </div>
      <div className="text-slate-500">
        {type === "signin"
          ? "Don't have an account?"
          : "Already have and account?"}
        <Link
          className="pl-2 underline underline-offset-2"
          to={type === "signin" ? "/signup" : "/signin"}
        >
          {type === "signin" ? "Sign Up" : "Login"}
        </Link>
      </div>
    </div>
  );
};
