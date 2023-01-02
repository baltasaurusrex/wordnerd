import React from "react";

import Sidebar from "../Sidebar.js";
import Navbar from "../Navbar.js";
import { useProSidebar, ProSidebarProvider } from "react-pro-sidebar";

import styles from "./SidebarLayout.module.css";

function SidebarLayout({ children }) {
  return (
    <>
      <Navbar toggleSidebarButton /> <Sidebar />
      <main>{children}</main>
    </>
  );
}

export default SidebarLayout;
