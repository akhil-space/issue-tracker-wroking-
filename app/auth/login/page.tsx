"use client";
import axios from "axios";
import React, { ReactEventHandler, useState } from "react";
import { Toast, Toaster } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import prisma from "@/prisma/client";
const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        email: email,
        pass: password,
        ip: "192.168.168.5",
        redirect:false
      };
      console.log("credetial ", data);
      const response = await axios.post(
        `https://api-development.eventably.com/login`,
        data
      );
      const result = await response.data;
    
   
      // console.log("response :", result);
      
      // Call NextAuth's signIn with credentials after successful API login credentials

      /**  */

      const res = await signIn("credentials", data );
   console.log( "response while setting in sign auth",res);
   
      if (res?.error) {
        setError(true);
        console.log("Login error:", res.error);
      }
      console.log("Login successful:", res);
    } catch (err) {
      setError(true);
      console.log("error :", err);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    // Trigger OAuth login for Google, GitHub, etc.
    signIn(provider, { callbackUrl: "/" }); // Adjust callbackUrl as needed
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            {" "}
            <label>email</label>
            <input
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label>passowrd</label>
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit"> login</button>
        </div>
      </form>
      {/* OAuth Login Options */}
      <div>
        <button onClick={() => handleOAuthLogin("google")}>
          Login with Google
        </button>
        <button onClick={() => handleOAuthLogin("github")}>
          Login with GitHub
        </button>
      </div>
      <Toaster />
    </>
  );
};

export default Signin;
