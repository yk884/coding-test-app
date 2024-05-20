import React, { ReactNode, MouseEventHandler } from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
};

const Button = ({ onClick, children, className = "" }: ButtonProps) => {
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
