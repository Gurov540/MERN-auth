import React from "react";
import styles from "./Input.module.css";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  color?: "primary" | "success";
  inputSize?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  color = "primary",
  inputSize = "medium",
  fullWidth = false,
  className,
  ...props
}) => {
  const inputClasses = [
    styles.input,
    styles[color],
    styles[inputSize],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <input className={inputClasses} {...props} />;
};
