import React, { useEffect, useState } from "react";
import { Field, Input, Form, Button, Alert, VerticalGroup } from "@grafana/ui";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import eyeIcon from "../asset/img/eye.svg";
import noEyeIcon from "../asset/img/no_eye.svg";

const Register = () => {
  const [containerClass, setContainerClass] = useState("auth-container");
  const [boxClass, setBoxClass] = useState("auth-box");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [created, setCreated] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async () => {
    const requestBody = {
      username: document.querySelector("input[name='email'").value,
      password: document.querySelector("input[name='password'").value,
    };
    await axios
      .post("https://ranchhand.xyz/api/register", requestBody)
      .then((res) => {
        setCreated(true);
        document.querySelector("input[name='email'").value = "";
        document.querySelector("input[name='password'").value = "";
        document.querySelector("input[name='passconfirm'").value = "";
        setTimeout(() => {
          navigate("/login");
        }, 800);
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
        <div className="title-container">
          <h1>Welcome to Ranch Hand!</h1>
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
                    <Field label="Password Confirm" invalid={!!errors.passconfirm} error={errors.passconfirm && "Passwords doesn't match"}>
                      <div style={{ position: "relative" }}>
                        <Input
                          type={showPasswordConfirm ? "text" : "password"}
                          placeholder="password confirm"
                          {...register("passconfirm", {
                            required: true,
                            validate: (v) => {
                              return v === document.querySelector("input[name='password'").value;
                            },
                          })}
                        />
                        <Button
                          className="eye-icon-btn"
                          onClick={() => {
                            setShowPasswordConfirm(!showPasswordConfirm);
                          }}
                        >
                          {showPasswordConfirm ? <img src={noEyeIcon} alt="noEyeIcon" /> : <img src={eyeIcon} alt="eyeIcon" />}
                        </Button>
                      </div>
                    </Field>
                    <Button variant="primary" type="submit" style={{ width: "100%", justifyContent: "center" }}>
                      Create Account
                    </Button>
                  </>
                )}
              </Form>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                <Link className="origin-link-style" to="/login">
                  Already have account?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {created && (
        <Alert
          style={{ position: "absolute", width: "350px", top: "40px", right: "10px", fontSize: "14px" }}
          title="Created Successfully"
          severity="success"
          onRemove={() => {
            setCreated(false);
          }}
        >
          <VerticalGroup>
            <div>Your account has been created successfully!</div>
          </VerticalGroup>
        </Alert>
      )}
    </div>
  );
};

export default Register;
