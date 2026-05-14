import React, { useState } from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";

type PasswordInputProps = Omit<InputProps, "type"> & {
  label?: string;
  hint?: string;
  error?: string;
  color?: "primary" | "success";
};

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8
             a18.45 18.45 0 0 1 5.06-5.94
             M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8
             a18.5 18.5 0 0 1-2.16 3.19
             m-6.72-1.07a3 3 0 1 1-4.24-4.24"
    />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const PasswordInput: React.FC<PasswordInputProps> = (props) => {
  const [visible, setVisible] = useState(false);

  const toggleButton = (
    <button
      type="button"
      tabIndex={-1}
      aria-label={visible ? "Скрыть пароль" : "Показать пароль"}
      onClick={() => setVisible((v) => !v)}
      style={{
        background: "none",
        border: "none",
        padding: "4px",
        cursor: "pointer",
        color: "primary",
        display: "flex",
        alignItems: "center",
        borderRadius: "6px",
      }}
    >
      {visible ? <EyeOffIcon /> : <EyeIcon />}
    </button>
  );

  return (
    <Input
      {...props}
      type={visible ? "text" : "password"}
      endAdornment={toggleButton}
      autoComplete={props.autoComplete ?? "current-password"}
    />
  );
};
