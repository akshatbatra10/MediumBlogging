import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SignUpParams } from "@akshat_dev/blog-common";

import { LabelledInput } from "../components/LabelledInput";
import { Quote } from "../components/Quote";
import { AuthHeader } from "../components/AuthHeader";
import { BACKEND_URL } from "../config";

export const Signup = () => {
  const [userData, setUserData] = useState<SignUpParams>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData((c) => ({
      ...c,
      [e.target.name]: e.target.value,
    }));
  };

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/user/signup`, userData);
      const jwt = response.data;
      localStorage.setItem("auth-token", jwt.auth_token);
      navigate("/blogs");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen justify-center flex flex-col">
        <div className="flex justify-center">
          <div>
            <AuthHeader type="signup" />
            <div className="mt-6">
              <LabelledInput
                label="Name"
                placeholder="Enter your name"
                name="name"
                onChange={handleChange}
              />

              <LabelledInput
                label="Email"
                placeholder="xyz@example.com"
                type="email"
                name="email"
                onChange={handleChange}
              />
              <LabelledInput
                label="Password"
                placeholder=""
                type="password"
                name="password"
                onChange={handleChange}
              />
              <button
                type="button"
                className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                onClick={sendRequest}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
