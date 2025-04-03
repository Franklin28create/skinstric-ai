import React from "react";
import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="auth-page_modal">
      <SignIn />
    </div>
  );
};

export default SignInPage;
