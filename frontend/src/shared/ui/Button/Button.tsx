import React from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.css";

type BaseProps = {
  children: React.ReactNode;
  color?: "primary" | "success";
  buttonSize?: "small" | "medium" | "large";
  className?: string;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLink = BaseProps & {
  to: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button: React.FC<ButtonProps> = (props) => {
  const {
    children,
    color = "primary",
    buttonSize = "medium",
    className = "",
    ...rest
  } = props;

  const combinedClassName = `
    ${styles.button}
    ${styles[color]}
    ${styles[buttonSize]}
    ${className}
  `;

  if ("to" in props && props.to) {
    return (
      <Link
        to={props.to}
        className={combinedClassName}
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      className={combinedClassName}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};
