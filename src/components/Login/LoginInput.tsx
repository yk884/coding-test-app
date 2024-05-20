import React, { ChangeEventHandler, useEffect, useState } from "react";

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
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(value.length === 1);
  }, [value]);

  return (
    <div className="loginFormInputContainer">
      <p className="inputTitle">{label}</p>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={isError ? "error" : ""}
      />
      {isError && <p className="errorMessage">2文字以上入力してください</p>}
    </div>
  );
};

export default LoginInput;
