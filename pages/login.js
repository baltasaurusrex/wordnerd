import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

const Login = () => {
  return (
    <div>
      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
