import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";

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
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import Searchbar from "./Searchbar.js";

import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const firstRender = useRef(true);
  const menuOpen = Boolean(anchorEl);

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  console.log("mobile: ", mobile);

  const [searchbar_open, setSearchbarOpen] = useState(false);

  useEffect(() => {
    setSearchbarOpen(mobile ? false : true);
  }, [mobile]);

  useEffect(() => {
    console.log("searchbar_open: ", searchbar_open);
  }, [searchbar_open]);

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
      {!searchbar_open && mobile && searchIconGroup}
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
              <Link href="/login">
                <Button style={{ whiteSpace: "nowrap" }}>Sign in</Button>
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
            <Link href="/login">
              <Button style={{ whiteSpace: "nowrap" }}>Sign in</Button>
            </Link>
          </>
        )}
      </div>
    </>
  );

  const logo = (
    <Link href="/" passHref>
      <a className={styles.logo}>
        {/* <Typography variant="h4" className={styles.logoBig}>
          WordNerd
        </Typography>
        <Typography variant="h4" className={styles.logoSmall}>
          WN
        </Typography> */}
        <Image
          src="/WordNerd Logo Transparent.png"
          width="100%"
          height="100%"
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
    <div className={styles.wrapper}>
      <nav className={`${mobile ? styles.nav_mobile : styles.nav}`}>
        <div className={`${mobile ? styles.start_mobile : styles.nav}`}>
          {searchbar_open ? (mobile ? btn_back : logo) : logo}
        </div>
        {searchbar_open ? searchbar_max : searchbar_coll}
      </nav>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
