import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: "primary" | "success";
  inputSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  color = "primary",
  inputSize = "medium",
  fullWidth = false,
  className,
  error,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    styles[color],
    styles[inputSize],
    fullWidth && styles.fullWidth,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={styles.wrapper}>
      <input className={inputClasses} {...props} />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
