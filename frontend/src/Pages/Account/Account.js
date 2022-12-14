import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Account.css";

function Form({ option }) {
  return (
    <form className="account-form" onSubmit={(evt) => evt.preventDefault()}>
      <div
        className={
          "account-form-fields " +
          (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
        }
      >
        <input
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required={option === 1 || option === 2 ? true : false}
          disabled={option === 3 ? true : false}
        />
        <input
          id="repeat-password"
          name="repeat-password"
          type="password"
          placeholder="Repeat password"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
        />
      </div>
      <button className="btn-submit-form" type="submit">
        {option === 1 ? "Sign in" : option === 2 ? "Sign up" : "Reset password"}
      </button>
    </form>
  );
}

const Account = () => {
  const [option, setOption] = useState(1);
  return (
    <div
      style={{
        background: "#000000",
        height: '100vh',
        fontFamily: 'Nunito, Roboto, Arial, sans-serif' 
      }}
    >
      <Navbar />
      <div className="cont container">
        <header>
          <div
            className={
              "header-headings " +
              (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
            }
          >
            <span>Sign in to your account</span>
            <span>Create an account</span>
            <span>Reset your password</span>
          </div>
        </header>
        <ul className="options22">
          <li
            className={option === 1 ? "active" : ""}
            onClick={() => setOption(1)}
          >
            Sign in
          </li>
          <li
            className={option === 2 ? "active" : ""}
            onClick={() => setOption(2)}
          >
            Sign up
          </li>
          <li
            className={option === 3 ? "active" : ""}
            onClick={() => setOption(3)}
          >
            Forgot
          </li>
        </ul>
        <Form option={option} />
      </div>
    </div>
  );
};

export default Account;
