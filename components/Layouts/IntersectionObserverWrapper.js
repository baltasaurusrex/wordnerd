import React, { useRef, useEffect, useState, useMemo } from "react";
import cn from "classnames";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import styles from "./IntersectionObserverWrapper.module.css";

function OverflowMenu({ visibilityMap, children, className }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const shouldShowMenu = useMemo(
    () => Object.values(visibilityMap).some((v) => v === false),
    [visibilityMap]
  );
  if (!shouldShowMenu) {
    return null;
  }

  return (
    <li className={className}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {React.Children.map(children, (child) => {
          if (!visibilityMap[child.props["data-targetid"]]) {
            return (
              <MenuItem key={child} onClick={handleClose}>
                {React.cloneElement(child, {
                  className: cn(child.className, styles.inOverflowMenu),
                })}
              </MenuItem>
            );
          }
          return null;
        })}
      </Menu>
    </li>
  );
}

export default function IntersectionObserverWrapper({ children }) {
  const navRef = useRef(null);
  const [visibilityMap, setVisibilityMap] = useState({});

  console.log(styles);

  const handleIntersection = (entries) => {
    console.log("in handleIntersection");
    // our logic of maintaining visibility state goes here
    const updatedEntries = {};

    entries.forEach((entry) => {
      console.log(entry);
      const targetid = entry.target.dataset.targetid;
      // Check if element is visibile within container
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true;
      } else {
        updatedEntries[targetid] = false;
      }
    });

    console.log("updatedEntries: ", updatedEntries);

    // Overwrite previous state values with current state
    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries,
    }));
  };

  useEffect(() => {
    console.log(`visibilityMap: `, visibilityMap);
  }, [visibilityMap]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });
    // We are adding observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute targetid on the child element
    Array.from(navRef.current.children).forEach((item) => {
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.toolbarWrapper} ref={navRef}>
      {React.Children.map(children, (child) => {
        console.log(child);
        const visible = visibilityMap[child.props["data-targetid"]];
        console.log("visible: ", visible);

        return React.cloneElement(child, {
          className: cn(child.props.className, {
            [styles.visible]: visible,
            [styles.inVisible]: !visible,
          }),
        });
      })}
      <OverflowMenu visibilityMap={visibilityMap} className={styles.li}>
        {children}
      </OverflowMenu>
    </div>
  );
}
