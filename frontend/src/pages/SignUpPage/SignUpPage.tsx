import { Link } from "react-router-dom";
import styles from "./SignUpPage.module.css";

import { Input } from "../../shared/ui/Input";
import { PasswordInput } from "../../shared/ui/Input/PasswordInput";
import { Button } from "../../shared/ui/Button";

const SignUpPage = () => {
  return (
    <div className={styles.formWrapper}>
      <form className={styles.form}>
        <h1 className={styles.formHeader}>Register form</h1>

        <div className={styles.inputGroup}>
          <Input type="email" placeholder="Email address" fullWidth={true} />
          <PasswordInput
            placeholder="Password"
            hint="Используйте буквы, цифры и символы"
            fullWidth={true}
          />
          <PasswordInput placeholder="Enter Password" fullWidth={true} />
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
