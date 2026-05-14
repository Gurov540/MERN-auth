import { Link, useNavigate } from "react-router-dom";
import { useState, type FormEvent, type ChangeEvent } from "react";

import { useAuthStore } from "../../store/authStore";
import { validateEmail, validatePassword } from "../../utils/validation";

import styles from "./SignInPage.module.css";

import { Input } from "../../shared/ui/Input";
import { PasswordInput } from "../../shared/ui/Input/PasswordInput";
import { Button } from "../../shared/ui/Button";

const SignInPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const navigate = useNavigate();

  const { login } = useAuthStore() as {
    login: (email: string, password: string) => Promise<void>;
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError || undefined,
        password: passwordError || undefined,
      });
      return;
    }
    setErrors({});

    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: undefined });
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: undefined });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h1 className={styles.formHeader}>Sign In</h1>

        <div className={styles.inputGroup}>
          <Input
            type="email"
            placeholder="Email address"
            fullWidth={true}
            onChange={handleEmailChange}
          />
          <PasswordInput
            placeholder="Password"
            fullWidth={true}
            onChange={handlePasswordChange}
          />
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
