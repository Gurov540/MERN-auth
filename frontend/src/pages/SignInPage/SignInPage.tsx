import { Link } from "react-router-dom";
import styles from "./SignInPage.module.css";

import { Input } from "../../shared/ui/Input";
import { Button } from "../../shared/ui/Button";

const SignInPage = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <h1 className={styles.formHeader}>Sign In</h1>

        <div className={styles.inputGroup}>
          <Input type="email" placeholder="Email address" />
          <Input type="password" placeholder="Password" />
        </div>

        <Button type="submit" buttonSize="large">
          Login
        </Button>

        <div className={styles.links}>
          <Link to="/signup" className={styles.link}>
            Create account
          </Link>

          <Link to="/" className={styles.linkSecondary}>
            Back to home
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
