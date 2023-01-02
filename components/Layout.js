import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import { Button, IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Navbar from "./Navbar.js";
import Searchbar from "./Searchbar.js";

import styles from "./Layout.module.css";

const theme = createTheme({
  typography: { fontFamily: ["Noto Serif"] },
});

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const menu_open = Boolean(anchorEl);

  // const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("mobile: ", mobile);

  const [searchbarOpen, setSearchbarOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);

  useEffect(() => {
    setSearchbarOpen(mobile ? false : true);
  }, [mobile]);

  // toggle backdrop alongside searchbar, but only if on mobile
  useEffect(() => {
    console.log("searchbarOpen: ", searchbarOpen);
    setBackdropOpen(mobile && searchbarOpen);
  }, [searchbarOpen]);

  // close backdrop when user navigates away from the page
  useEffect(() => {
    setBackdropOpen(false);
  }, [router.asPath]);

  const handlemenu_open = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const searchIconGroup = (
    <Tooltip title="Toggle searchbar">
      <IconButton
        aria-label="Toggle searchbar"
        onClick={() => setSearchbarOpen((prev) => !prev)}
      >
        <SearchIcon />
      </IconButton>
    </Tooltip>
  );

  const sessionBar = (
    <div className={styles.sessionBar}>
      {!searchbarOpen && mobile && searchIconGroup}
      <Tooltip title="Add new entry">
        <IconButton
          aria-label="add new entry"
          onClick={() => router.push("/new")}
        >
          <AddCircleOutlineIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Account">
        <IconButton aria-label="account" onClick={handlemenu_open}>
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={menu_open}
        onClose={handleMenuClose}
        // sx={{ "& .MuiMenuItem-root": { fontFamily: "Noto Serif" } }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => router.push("/profile")}>Profile</MenuItem>
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

  const searchbar_max = (
    <>
      <div className={styles.center}>
        <Searchbar mobile={mobile} />
      </div>
      {!mobile && (
        <div className={styles.end}>
          {session && sessionBar}
          {!session && (
            <>
              <Link href="/auth/signin">
                <Button className={styles.button} variant="contained">
                  Sign in
                </Button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );

  const searchbar_coll = (
    <>
      <div className={styles.center}></div>
      <div className={styles.end}>
        {session && sessionBar}
        {!session && (
          <>
            {searchIconGroup}
            <Link href="/auth/signin">
              <Button className={styles.button} variant="contained">
                Sign in
              </Button>
            </Link>
          </>
        )}
      </div>
    </>
  );

  const logo = (
    <Link href="/" passHref>
      <a className={styles.logo}>
        <Image
          src="/wn_logo_transparent.png"
          width={40}
          height={40}
          layout="fixed"
        />
      </a>
    </Link>
  );

  const btn_back = (
    <>
      <Tooltip title="Toggle searchbar">
        <IconButton
          aria-label="Toggle searchbar"
          onClick={() => setSearchbarOpen((prev) => !prev)}
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.wrapper}>
        <Navbar searchbar />
        <main className={styles.main}>{children}</main>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
