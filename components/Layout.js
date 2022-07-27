import Searchbar from "./Searchbar.js";
import styles from "./Layout.module.css";
import { Typography, Button } from "@mui/material";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Layout = ({ children }) => {
  const { data: session } = useSession();

  if (session) {
    console.log("session: ", session);
  } else {
    console.log("no session");
  }

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" passHref>
          <a className={styles.logo}>
            <Typography variant="h4" className={styles.logoBig}>
              WordNerd
            </Typography>
            <Typography variant="h4" className={styles.logoSmall}>
              WN
            </Typography>
          </a>
        </Link>
        <div className={styles.searchbar}>
          <Searchbar />
        </div>
        <div className={styles.menu}>
          {session && <Button onClick={signOut}>Sign out</Button>}
          {!session && (
            <Link href="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
