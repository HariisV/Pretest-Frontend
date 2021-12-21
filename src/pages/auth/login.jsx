import React, { useState, useEffect } from "react";
import { ToastShow, ContainerToast } from "../../utils/toast";
import { connect } from "react-redux";
import { login } from "../../stores/actions/auth";
import { Link } from "react-router-dom";
const LoginPage = (props) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const isAuthentication = localStorage.getItem("login");

  useEffect(() => {
    if (isAuthentication) {
      props.history.push("/");
    }
  }, []);

  const handleInput = (value, name) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await props.login(form);
      ToastShow(200, "Login Berhasil");
      localStorage.setItem("login", true);
      setTimeout(() => {
        props.history.push("/");
      }, 3000);
    } catch (error) {
      ToastShow(400, "Email Atau Password Salah");
      console.log(error.response);
    }
  };

  return (
    <div className="login">
      <div className=" d-flex justify-content-center">
        <ContainerToast />
        <div className="card w-50">
          <div className="card-body ">
            <h3 className="text-center">Login</h3>

            <div class="form-group">
              <label for="email" className="">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Input Your Mail"
                onChange={(e) => handleInput(e.target.value, "email")}
              />
            </div>
            <div class="form-group">
              <label for="password" className="">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter Your Password"
                onChange={(e) => handleInput(e.target.value, "password")}
              />
            </div>
            <p>
              Dont Have An Account ?{" "}
              <Link to="/auth/register"> Register Now</Link>{" "}
            </p>
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = { login };
export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
