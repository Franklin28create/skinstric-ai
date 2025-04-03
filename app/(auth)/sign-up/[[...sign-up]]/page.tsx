import React from "react";
import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="auth-page_modal">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
