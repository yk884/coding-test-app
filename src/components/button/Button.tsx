import React, { ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
  theme?: "Basic" | "Primary";
};

const Button = ({
  onClick,
  children,
  className = "",
  theme = "Primary",
}: ButtonProps) => {
  return (
    <button
      className={`button ${className} ${theme.toLowerCase()}Theme`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
