import React, { useRef, useEffect, useState } from "react";
import classnames from "classnames";
import { makeStyles } from "@mui/material";
// import OverflowMenu from "./overflow-menu";

import styles from "./IntersectionObserverWrapper.module.css";

export default function IntersectionObserverWrapper({ children }) {
  const navRef = useRef(null);
  const [visibilityMap, setVisibilityMap] = useState({});

  const handleIntersection = (entries) => {
    console.log("in handleIntersection");
    // our logic of maintaining visibility state goes here
    const updatedEntries = {};
    entries.forEach((entry) => {
      const targetid = entry.target.dataset.targetid;
      console.log(entry, targetid);
      // Check if element is visibile within container
      if (entry.isIntersecting) {
        updatedEntries[targetid] = true;
      } else {
        updatedEntries[targetid] = false;
      }
    });
    // Overwrite previous state values with current state
    setVisibilityMap((prev) => ({
      ...prev,
      ...updatedEntries,
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: navRef.current,
      threshold: 1,
    });
    // We are adding observers to child elements of the container div
    // with ref as navRef. Notice that we are adding observers
    // only if we have the data attribute targetid on the child element
    Array.from(navRef.current.children).forEach((item) => {
      console.log(item.dataset.targetid);
      if (item.dataset.targetid) {
        observer.observe(item);
      }
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className={styles.toolbarWrapper} ref={navRef}>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className: classnames(child.props.className, {
            [styles.visible]: !!visibilityMap[child.props["data-targetid"]],
            [styles.inVisible]: !visibilityMap[child.props["data-targetid"]],
          }),
        });
      })}
    </div>
  );
}
