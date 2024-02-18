import React, { useEffect, useState } from "react";
import { Field, Input, Form, Button, Alert, VerticalGroup } from "@grafana/ui";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import eyeIcon from "../asset/img/eye.svg";
import noEyeIcon from "../asset/img/no_eye.svg";
// import logo1 from "../asset/img/logo/update/logo1.jpg";

const Login = () => {
  const [containerClass, setContainerClass] = useState("auth-container");
  const [boxClass, setBoxClass] = useState("auth-box");
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    const requestBody = {
      username: document.querySelector("input[name='email'").value,
      password: document.querySelector("input[name='password'").value,
    };
    console.log('request', requestBody);
    await axios
      .post("https://ranchhand.xyz/api/login", requestBody)
      .then((res) => {
        console.log("result", res);
        if (res.data.success =="success") {
          setLogin(true);
          localStorage.setItem("login", "success");
          localStorage.setItem("user", res.data.user);
          localStorage.setItem("token", res.data.token);
          setTimeout(() => {
            navigate("/");
          }, 800);
        } else if (res.data.success == "failed") {
          console.log("result", res);
          setLoginFailed(true);
          setTimeout(() => {
            setLoginFailed(false);
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    setContainerClass("auth-container show");
    setBoxClass("auth-box show");
  }, []);

  return (
    <div className={containerClass}>
      <div className={boxClass}>
        <div style={{ display: "flex", direction: "column", marginLeft: "50px", alignItems: "center", justifyContent: "center" }}>
          {/* <span style={{flexGrow: "1"}}>
          <img src={logo1} alt="Logo" className="logo1"/>          
        </span> */}
          <span style={{ flexGrow: "5", fontSize: "20pt" }}>
            Welcome to Ranch Hand!
          </span>

        </div>
        <div className="form-container">
          <div className="form-inner">
            <div style={{ width: "100%", paddingBottom: "16px" }}>
              <Form onSubmit={submitHandler}>
                {({ register, errors }) => (
                  <>
                    <Field label="Email or Username" invalid={!!errors.email} error={errors.email && "Email or username is required"}>
                      <Input placeholder="email or username" {...register("email", { required: true })} />
                    </Field>
                    <Field label="Password" invalid={!!errors.password} error={errors.password && "Password is required"}>
                      <div style={{ position: "relative" }}>
                        <Input type={showPassword ? "text" : "password"} placeholder="password" {...register("password", { required: true })} />
                        <Button
                          className="eye-icon-btn"
                          onClick={() => {
                            setShowPassword(!showPassword);
                          }}
                        >
                          {showPassword ? <img src={noEyeIcon} alt="noEyeIcon" /> : <img src={eyeIcon} alt="eyeIcon" />}
                        </Button>
                      </div>
                    </Field>
                    <Button variant="primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                      Log in
                    </Button>
                  </>
                )}
              </Form>
              {/* <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <Link className="origin-link-style" to="/register">
                  Don't you have account?
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {login && (
        <Alert
          style={{ position: "absolute", width: "350px", top: "40px", right: "10px", fontSize: "14px" }}
          title="Logged In Successfully"
          severity="success"
          onRemove={() => {
            setLogin(false);
          }}
        >
          <VerticalGroup>
            <div>You have logged in successfully!</div>
          </VerticalGroup>
        </Alert>
      )}
      {loginFailed && (
        <Alert
          style={{ position: "absolute", width: "350px", top: "40px", right: "10px", fontSize: "14px" }}
          title="Log in Failed"
          severity="error"
          onRemove={() => {
            setLoginFailed(false);
          }}
        >
          <VerticalGroup>
            <div>Username or Password is incorrect!</div>
          </VerticalGroup>
        </Alert>
      )}
    </div>
  );
};

export default Login;
