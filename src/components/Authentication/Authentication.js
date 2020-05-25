import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../customHooks/useForm";
import auth from "../../sideEffects/apis/auth";
import { connect } from "react-redux";
import { setUser } from "../../creators/userCreator";

const failure = {
  display: "block",
  border: "0.5px solid red",
  padding: 10,
  color: "red",
};

const defaultTo = {
  display: "none",
};

const passValidator = (password) => {
  const passwordErrors = [];
  if (!/[A-Z]/.test(password)) {
    passwordErrors.push(
      "The password needs to contain at least one capital letter [A - Z]"
    );
  }
  if (!/\d/.test(password)) {
    passwordErrors.push("The password needs to contain at least one number");
  }
  if (!/[!@#\$%^\&\*()_\+\-=[\]{};':"|,.<>\\/?]/.test(password)) {
    passwordErrors.push(
      `The password needs to contain at least one special character like [ !@#$%^&*()_+-=[]{};':"|,.<>/?]`
    );
  }
  if (password.length < 6) {
    passwordErrors.push(
      "Password length must be more than six characters in total"
    );
  }
  return passwordErrors;
};

const confirmPassValidator = (password, confirmPassword) =>
  password === confirmPassword;

const Register = (props) => {
  const firstNameField = useForm("text", "");
  const surNameField = useForm("text", "");
  const phoneNumberField = useForm("tel", "");
  const emailField = useForm("email", "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [successStatus, setSuccessStatus] = useState({
    message: "",
    style: defaultTo,
  });

  const statusMessageHandler = (message, style) => {
    setSuccessStatus({ message, style });
    setTimeout(() => {
      setSuccessStatus({ message: "", style: defaultTo });
    }, 5000);
  };

  const onPasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    setErrors(passValidator(passwordValue));
    setConfirmPasswordError(
      confirmPassValidator(passwordValue, confirmPassword)
    );
  };

  const onConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setConfirmPasswordError(
      confirmPassValidator(password, confirmPasswordValue)
    );
  };

  const prepareData = () => {
    return {
      email: emailField.main.value,
      password,
      confirmPassword,
    };
  };

  const submitForm = (e) => {
    e.preventDefault();
    props.isBusy(true);
    auth
      .register(prepareData())
      .then((response) => {
        props.setUser(response);
        props.url ? props.history.push(props.url) : props.history.push("/");
        props.isBusy(false);
        window.location.reload();
      })
      .catch((err) => {
        statusMessageHandler(err.message, failure);
        props.isBusy(false);
      });
  };

  const registerProps = {
    submitForm,
    emailField: emailField.main,
    showPassword,
    setShowPassword,
    password,
    onPasswordChange,
    errors,
    confirmPassword,
    onConfirmPasswordChange,
    confirmPasswordError,
    successStatus,
    url: props.url,
  };
  return props.user ? (
    <SignedInUser name="registered" />
  ) : (
    <RegisterForm {...registerProps} />
  );
};

export const Login = (props) => {
  const emailField = useForm("email", "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [successStatus, setSuccessStatus] = useState({
    message: "",
    style: defaultTo,
  });
  const statusMessageHandler = (message, style) => {
    setSuccessStatus({ message, style });
    setTimeout(() => {
      setSuccessStatus({ message: "", style: defaultTo });
    }, 5000);
  };
  const login = (data) => {
    props.isBusy(true);
    auth
      .login(data)
      .then((response) => {
        props.setUser(response);
        props.url !== "/login"
          ? props.history.push(props.url)
          : props.history.push("/");
        props.isBusy(false);
        window.location.reload();
      })
      .catch((err) => {
        statusMessageHandler(err.message, failure);
        props.isBusy(false);
      });
  };

  const submitForm = (e) => {
    e.preventDefault();
    login({ email: emailField.main.value, password });
  };

  const loginProps = {
    submitForm,
    emailField: emailField.main,
    showPassword,
    setShowPassword,
    password,
    setPassword,
    successStatus,
    url: props.url,
  };

  return props.user && localStorage.getItem("token") ? (
    <SignedInUser name="logged in" />
  ) : (
    <LoginForm {...loginProps} />
  );
};

export const Logout = (props) => <button onClick={props.logout}>Logout</button>;

const LoginForm = (props) => {
  return (
    <div className="login-wrapper row">
      <div className="bg-section col-md-7">
        <img
          className="img-fluid"
          src="./images/register-bg.png"
          alt="register-background-image"
        />
      </div>
      <div className="form-section col-md-5">
        <form onSubmit={props.submitForm}>
          <div className="text-center">
            <img
              src="https://brand-mobile-assets.s3-eu-west-1.amazonaws.com/Logo+(1).png"
              alt="image log"
              className="img-fluid mb-3"
            />
            <h6 className="below-image">
              Welcome back! Please login to your account
            </h6>
          </div>

          <div>
            <input placeholder="Email" {...props.emailField} required />
          </div>
          <div>
            <input
              placeholder="Password"
              type={props.showPassword ? "text" : "password"}
              value={props.password}
              onChange={({ target }) => props.setPassword(target.value)}
              required
            />
          </div>
          <Notification {...props.successStatus} />
          <div>
            <label>
              {props.showPassword ? "Hide password" : "Show password"}
              <input
                type="checkbox"
                onChange={() => props.setShowPassword(!props.showPassword)}
                checked={props.showPassword}
              />
            </label>
          </div>

          <div className="text-center">
            <button className="login" type="submit">
              Login
            </button>

            <Link to={`/register?redirectUrl=${props.url}`}>
              {" "}
              <button className="signup" type="button">
                {" "}
                Sign up{" "}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const RegisterForm = (props) => {
  return (
    <div className="register-wrapper row">
      <div className="bg-section col-md-7">
        <img
          className="img-fluid"
          src="./images/register-bg.png"
          alt="register-background-image"
        />
      </div>
      <div className="form-section col-md-5">
        <form onSubmit={props.submitForm}>
          <div className="text-center">
            <img
              src="./images/logo.svg"
              alt="image log"
              className="img-fluid mb-3"
            />
            <h6 className="below-image">
              Please complete to create your account
            </h6>
          </div>
          <div></div>
          <div>
            <input placeholder="Email" {...props.emailField} required />
          </div>

          <div>
            <input
              placeholder="Password"
              type={props.showPassword ? "text" : "password"}
              className={
                props.password && props.errors.length > 0 ? "red-border" : ""
              }
              value={props.password}
              onChange={props.onPasswordChange}
              required
            />
          </div>
          {props.errors.map((error, index) => (
            <p key={index} className="text-danger">
              {error}
            </p>
          ))}
          <div>
            <input
              placeholder="Confirm password"
              type={props.showPassword ? "text" : "password"}
              className={
                props.confirmPassword && !props.confirmPasswordError
                  ? "red-border"
                  : ""
              }
              onChange={props.onConfirmPasswordChange}
              value={props.confirmPassword}
              required
            />
          </div>
          {props.confirmPassword && !props.confirmPasswordError && (
            <p className="text-danger">
              The password and confirm password do not match
            </p>
          )}
          <Notification {...props.successStatus} />
          <div>
            {props.errors.length === 0 &&
              props.confirmPasswordError &&
              props.password &&
              props.confirmPassword && <button type="submit">Register</button>}
          </div>
          <div className="text-center">
            <label className="terms">
              <input
                type="checkbox"
                onChange={() => props.setShowPassword(!props.showPassword)}
                checked={props.showPassword}
              />
              <span>
                {props.showPassword ? "Hide password" : "Show password"}
              </span>
            </label>
          </div>

          <div className="text-center py-4">
            <p>
              Already have an account?
              <Link to={`/login?redirectUrl=${props.url}`}> Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const SignedInUser = ({ name }) => <p>Your are already {name}</p>;

const Notification = ({ message, style }) => <p style={style}>{message}</p>;

const ConnectedRegister = connect(null, { setUser })(Register);

export default ConnectedRegister;
