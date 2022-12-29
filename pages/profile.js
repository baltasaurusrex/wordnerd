import React from "react";
import Sidebar from "../components/Sidebar.js";
import { useProSidebar } from "react-pro-sidebar";

import styles from "./profile.module.css";

const Profile = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  // authenticate
  // fetch data

  return (
    <body className={styles.body}>
      <Sidebar />
      <main></main>
    </body>
  );
};

Profile.getLayout = (page) => page;

export default Profile;
