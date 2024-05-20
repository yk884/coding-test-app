import React, { ChangeEventHandler } from "react";

type LoginInputProps = {
  label: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const LoginInput = ({
  label,
  type,
  placeholder,
  value,
  onChange,
}: LoginInputProps) => {
  return (
    <div className="loginFormInputContainer">
      <p className="inputTitle">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default LoginInput;
