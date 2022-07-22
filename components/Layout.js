import Searchbar from "./Searchbar.js";
import styles from "./Layout.module.css";
import { Typography } from "@mui/material";
import Link from "next/link";

const Layout = ({ children }) => {
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
        <div className={styles.menu}>Menu</div>
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
