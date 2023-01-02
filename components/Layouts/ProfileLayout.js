import React from "react";
import { Typography } from "@mui/material";
import cn from "classnames";
import { useRouter } from "next/router";

import styles from "./ProfileLayout.module.css";

function MenuItem({ title, link, active }) {
  return (
    <li className={cn(styles.li, { [styles.active]: active })}>
      <a href={link}>
        <Typography>{title}</Typography>
      </a>
    </li>
  );
}

function ProfileNavbar({}) {
  const router = useRouter();

  const menuItems = [
    { title: "Home", link: "/profile" },
    { title: "Phrases", link: "/profile/phrases" },
  ];

  return (
    <ul className={styles.navbar}>
      {menuItems.map(({ title, link }, i) => (
        <MenuItem
          key={i}
          title={title}
          link={link}
          active={link === router.asPath}
        />
      ))}
    </ul>
  );
}

function ProfileLayout({ children }) {
  return (
    <div>
      <ProfileNavbar />
      {children}
    </div>
  );
}

export default ProfileLayout;
