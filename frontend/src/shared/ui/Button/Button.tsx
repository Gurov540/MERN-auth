import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "primary" | "success";
  buttonSize?: "small" | "medium" | "large";
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  color = "primary",
  buttonSize = "medium",
  onClick,
}) => {
  return (
    <button
      className={`${styles.button} ${styles[color]} ${styles[buttonSize]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
