import React from "react";

import styles from "./HeroContainer.module.css";

const HeroContainer = ({ children }) => {
  return <section className={styles.section}>{children}</section>;
};

export default HeroContainer;
