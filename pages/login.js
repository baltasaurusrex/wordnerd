import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

import styles from "./login.module.css";

const Login = () => {
  return (
    <div className={styles.div}>
      <Button onClick={signIn}>Sign in with Google</Button>
    </div>
  );
};

export default Login;
