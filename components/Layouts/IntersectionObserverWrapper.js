import React, { useRef, useEffect, useState } from "react";
import cn from "classnames";
import { makeStyles } from "@mui/material";
// import OverflowMenu from "./overflow-menu";

import styles from "./IntersectionObserverWrapper.module.css";

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
      threshold: 0.75,
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
    </div>
  );
}
