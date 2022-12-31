import React from "react";
import Sidebar from "../components/Sidebar.js";
import Navbar from "../components/Navbar.js";
import { useProSidebar, ProSidebarProvider } from "react-pro-sidebar";
import Layout from "../components/Layout.js";
import ProfileLayout from "../components/Layouts/ProfileLayout.js";
import { SessionProvider } from "next-auth/react";

import styles from "./profile.module.css";

const Profile = () => {
  const { collapseSidebar, toggleSidebar, collapsed, toggled, broken, rtl } =
    useProSidebar();

  return <body className={styles.body}></body>;
};

Profile.getLayout = (page) => (
  <SessionProvider>
    <Layout>
      <ProfileLayout>{page}</ProfileLayout>
    </Layout>
  </SessionProvider>
);

export default Profile;
