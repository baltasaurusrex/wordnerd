import React from "react";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import cn from "classnames";
import { useRouter } from "next/router";
import IntersectionObserverWrapper from "./IntersectionObserverWrapper";

import styles from "./ProfileLayout.module.css";

function MenuItem({ key, title, link, active, className }) {
  return (
    <li
      key={key}
      className={cn(styles.li, { [styles.active]: active }, className)}
      data-targetid={title}
    >
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
    { title: "Relations", link: "/profile/relations" },
    { title: "Likes", link: "/profile/likes" },
  ];

  return (
    <ul className={styles.navbar}>
      <IntersectionObserverWrapper>
        {menuItems.map(({ title, link }, i) => (
          <MenuItem
            key={i}
            title={title}
            link={link}
            data-targetid={title}
            active={link === router.asPath}
          />
        ))}
      </IntersectionObserverWrapper>
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
