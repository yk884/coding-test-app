import React, { useState } from "react";
import "./Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginWrapper">
      <div className="loginForm">
        <div className="loginFormTitle">
          <h2>ログイン</h2>
        </div>
        <div className="loginFormInputContainer">
          <p className="inputTitle">メールアドレス</p>
          <input
            type="email"
            placeholder="sample@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="loginFormInputContainer">
          <p className="inputTitle">パスワード</p>
          <input
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="button loginButton">ログイン</button>
      </div>
    </div>
  );
};

export default Login;
