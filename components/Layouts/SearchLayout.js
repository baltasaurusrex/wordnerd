import React from "react";
import { Typography } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import cn from "classnames";
import { useRouter } from "next/router";
import IntersectionObserverWrapper from "./IntersectionObserverWrapper";

import styles from "./SearchLayout.module.css";

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

function Navbar({}) {
  const router = useRouter();

  const menuItems = [
    { title: "All", link: "/profile" },
    { title: "Words", link: "/profile" },
    { title: "Idioms", link: "/profile/phrases" },
    { title: "Proverbs", link: "/profile/relations" },
    { title: "Quotes", link: "/profile/likes" },
    // { title: "Likes2", link: "/profile/likes2" },
    // { title: "Likes3", link: "/profile/likes3" },
    // { title: "Likes4", link: "/profile/likes4" },
    // { title: "Likes5", link: "/profile/likes5" },
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

function SearchLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default SearchLayout;
