import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
import "./Account.css";

function Form({ option }) {
  // const [firstName,setFirstName] = useState("")
  // const [lastName,setLastName] = useState("")
  // const [email,setEmail] = useState("")
  // const [password,setPassword] = useState("")
  // const [repeatPassword,setRepeatPassword] = useState("")
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const [formError, setFormError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });

  const handleUserInput = (name, value) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };
  const validateFormInput = (event) => {
    event.preventDefault();
    let inputError = {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    };

    if (!formInput.email && !formInput.password) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
        password: "Password should not be empty",
      });
      return;
    }

    if (!formInput.firstName) {
      setFormError({
        ...inputError,
        firstName: "Enter your first name",
      });
      return;
    }

    if (!formInput.lastName) {
      setFormError({
        ...inputError,
        lastName: "Enter your last name",
      });
      return;
    }

    if (!formInput.email) {
      setFormError({
        ...inputError,
        email: "Enter valid email address",
      });
      return;
    }

    if (formInput.confirmPassword !== formInput.password) {
      setFormError({
        ...inputError,
        confirmPassword: "Password and confirm password should be same",
      });
      return;
    }

    if (!formInput.password) {
      setFormError({
        ...inputError,
        password: "Password should not be empty",
      });
      return;
    }

    setFormError(inputError);
  };
  return (
    <form className="account-form" onSubmit={validateFormInput}>
      <div
        className={
          "account-form-fields " +
          (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
        }
      >
        <input
          value={formInput.email}
          onChange={({ target }) => {
            handleUserInput(target.name, target.value);
          }}
          className="input"
          id="email"
          name="email"
          type="email"
          placeholder="E-mail"
          required
        />
        <p className="error-message">{formError.email}</p>
        <input
          value={formInput.password}
          onChange={({ target }) => {
            handleUserInput(target.name, target.value);
          }}
          id="password"
          name="password"
          className="input"
          type="password"
          placeholder="Password"
          required={option === 1 || option === 2 ? true : false}
          disabled={option === 3 ? true : false}
          // value={password}
          // onChange={(e)=> setPassword(e.target.value)}
        />
        <p className="error-message">{formError.password}</p>
        <input
          value={formInput.confirmPassword}
          onChange={({ target }) => {
            handleUserInput(target.name, target.value);
          }}
          id="confirm-password"
          name="confirm-password"
          className="input"
          type="password"
          placeholder="Confirm password"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
          // value={repeatPassword}
          // onChange={(e)=> setRepeatPassword(e.target.value)}
        />
        <p className="error-message">{formError.confirmPassword}</p>
        <input
          id="first-name"
          name="first-name"
          className="input"
          placeholder="First Name"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
          // value={firstName}
          // onChange={(e)=> setLastName(e.target.value)}
          value={formInput.firstName}
          onChange={({ target }) => {
            handleUserInput(target.name, target.value);
          }}
        />
        <p className="error-message">{formError.firstName}</p>

        <input
          id="last-name"
          name="last-name"
          className="input"
          placeholder="Last Name"
          required={option === 2 ? true : false}
          disabled={option === 1 || option === 3 ? true : false}
          // value={lastName}
          // onChange={(e)=> setLastName(e.target.value)}
          value={formInput.lastName}
          onChange={({ target }) => {
            handleUserInput(target.name, target.value);
          }}
        />
        <p className="error-message">{formError.lastName}</p>
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
        height: "120vh",
        fontFamily: "Nunito, Roboto, Arial, sans-serif",
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
