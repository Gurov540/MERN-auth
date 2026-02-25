import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";

import { Input } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";

const SignUpPage = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <h1 className={styles.formHeader}>Register form</h1>

        <div className={styles.inputGroup}>
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
          <Input type="password" placeholder="Enter password" />
        </div>

        <Button type="submit" buttonSize="large">
          Register
        </Button>

        <div className={styles.links}>
          <Link to="/signin" className={styles.link}>
            login
          </Link>

          <Link to="/" className={styles.linkSecondary}>
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
