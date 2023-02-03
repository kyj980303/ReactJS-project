import React from "react";
import { useState } from "react";
import { authService, firebaseInstance } from "fbase";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  // newAccount값에 반대되는 것을 리턴
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (!newAccount) {
        // create account
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        // login
        data = await authService.signInWithEmailAndPassword(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;

    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <form onSubmit={onSubmit} className="loginForm">
        <input
          className="login"
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          className="login"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        {error && <span className="authError">{error}</span>}
        <input
          className="loginbtn"
          type="submit"
          value={newAccount ? "LogIn" : "Create Account"}
          required
        />
        <div className="socialLogin">
          <button onClick={onSocialClick} name="google">
            Continue with Google
          </button>
          <button onClick={onSocialClick} name="github">
            Continue with GitHub
          </button>
        </div>
        <span onClick={toggleAccount} className="create">
          {newAccount ? "Create Account" : "LogIn"}
        </span>
      </form>
    </>
  );
};

export default AuthForm;
