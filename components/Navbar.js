import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

import {
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Backdrop,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useProSidebar, ProSidebarProvider } from "react-pro-sidebar";

import Searchbar from "./Searchbar.js";

import styles from "./Navbar.module.css";

function Navbar({ searchbar, toggleSidebarButton }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const profileMenuOpen = Boolean(anchorEl);
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
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

  const handleMenuOpen = (e) => {
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
      {searchbar && !searchbarOpen && mobile && searchIconGroup}
      <Tooltip title="Add new entry">
        <IconButton
          aria-label="add new entry"
          onClick={() => router.push("/new")}
        >
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
        open={profileMenuOpen}
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
      <a style={{ textDecoration: "none", color: "maroon" }}>
        {mobile ? (
          <Image
            src="/wn_logo_transparent.png"
            width={40}
            height={40}
            layout="fixed"
          />
        ) : (
          <Typography
            variant="h5"
            sx={{ fontFamily: "Bree Serif", textDecoration: "none" }}
          >
            WordNerd
          </Typography>
        )}
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
    <>
      <nav className={`${mobile ? styles.nav_mobile : styles.nav}`}>
        <div className={`${mobile ? styles.start_mobile : styles.start}`}>
          {searchbarOpen ? (mobile ? btn_back : logo) : logo}
        </div>
        {searchbar && searchbarOpen ? searchbar_max : searchbar_coll}
      </nav>
      <Backdrop
        open={backdropOpen}
        onClick={() => {
          setSearchbarOpen(false);
        }}
        sx={{ zIndex: "10" }}
      ></Backdrop>
    </>
  );
}

export default Navbar;
