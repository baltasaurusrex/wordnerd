import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

import {
  Typography,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Searchbar from "./Searchbar.js";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);

  if (session) {
    console.log("session: ", session);
  } else {
    console.log("no session");
  }

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sessionBar = (
    <div>
      <Tooltip title="Add new entry">
        <IconButton aria-label="add new entry">
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Account">
        <IconButton aria-label="account" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem
          onClick={(e) => {
            handleMenuClose(e);
            signOut();
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );

  return (
    <>
      <nav className={styles.nav}>
        <div id="start">
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
        </div>
        <div id="center">
          <div className={styles.searchbar}>
            <Searchbar />
          </div>
        </div>
        <div id="end">
          <div className={styles.menu}>
            {session && sessionBar}
            {!session && (
              <Link href="/login">
                <Button>Sign in</Button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
