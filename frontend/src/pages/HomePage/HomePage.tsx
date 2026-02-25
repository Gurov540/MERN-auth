// import { useState } from "react";
import styles from "./HomePage.module.css";

import { Button } from "../../shared/ui/Button";

const HomePage = () => {
  return (
    <nav className={styles.navBar}>
      <Button color="primary" to="/signup">
        Signup
      </Button>
      <Button color="success" to="/signin">
        Signin
      </Button>
    </nav>
  );
};

export default HomePage;
