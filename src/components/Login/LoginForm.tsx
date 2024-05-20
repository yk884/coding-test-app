import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginInput from "./LoginInput";
import Button from "../button/Button";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/dashboard", { state: { email } });
  };

  return (
    <div className="loginForm">
      <div className="loginFormTitle">
        <h2>ログイン</h2>
      </div>
      <LoginInput
        label="メールアドレス"
        type="email"
        placeholder="sample@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <LoginInput
        label="パスワード"
        type="password"
        placeholder=""
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin} className="loginButton">
        ログイン
      </Button>
    </div>
  );
};

export default LoginForm;
