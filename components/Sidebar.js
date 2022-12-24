import React from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  useProSidebar,
} from "react-pro-sidebar";
import { Box, useTheme, IconButton } from "@mui/material";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Image from "next/image";

import styles from "./Sidebar.module.css";

function Sidebar() {
  const theme = useTheme();
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return (
    <Box
      sx={{
        borderRight: "1px solid #efefef",
      }}
    >
      <div className={styles.control}>
        <Link href="/" passHref>
          <a>
            {collapsed ? (
              <Image
                src="/wn_logo_transparent.png"
                width={40}
                height={40}
                layout="fixed"
              />
            ) : (
              <p>WordNerd</p>
            )}
          </a>
        </Link>
        <IconButton
          onClick={() => collapseSidebar()}
          disableFocusRipple
          disableRipple
        >
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </div>
      <ProSidebar rootStyles={{ height: "100%", backgroundColor: "white" }}>
        <Menu>
          <MenuItem>Profile </MenuItem>
          <MenuItem>Phrases </MenuItem>
          <MenuItem>Relations </MenuItem>
          <MenuItem>Likes </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
}

export default Sidebar;
