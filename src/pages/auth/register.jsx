import React, { useState, useEffect } from "react";
import { ToastShow, ContainerToast } from "../../utils/toast";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";

const RegisterPage = (props) => {
  const isAuthentication = localStorage.getItem("login");
  const [isError, setIsError] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

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
    console.log(form);
  };

  const handleSubmit = async () => {
    try {
      setIsError({ name: "" });
      const setData = {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password,
        role: form.role,
      };
      await axios.post("/api/auth/register", setData);
      ToastShow(200, "Register Berhasil");
      setTimeout(() => {
        props.history.push("/auth/login");
      }, 3000);
      //   console.log(props.auth.userLogin);
    } catch (error) {
      // ToastShow(400, "Email Atau Password Salah");
      console.log(JSON.parse(error.response.data));
      setIsError(JSON.parse(error.response.data));
    }
  };

  return (
    <div className="login">
      <div className=" d-flex justify-content-center">
        <ContainerToast />
        <div className="card w-50">
          <div className="card-body ">
            <h3 className="text-center">Register</h3>

            <div class="form-group">
              <label for="email" className="">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Input Your Full Name"
                onChange={(e) => handleInput(e.target.value, "name")}
              />
            </div>
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
            <div class="form-group">
              <label for="password" className="">
                Role
              </label>
              <select
                class="form-control form-select"
                onChange={(e) => handleInput(e.target.value, "role")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <p>
              Already Have An Account ? <Link to="/auth/login"> Login Now</Link>{" "}
            </p>
            {isError.name || isError.email || isError.password ? (
              <div class="card card-body">
                Error :
                <ul>
                  {isError.name ? <li>{isError.name}</li> : ""}
                  {isError.email ? <li>{isError.email}</li> : ""}
                  {isError.password ? <li>{isError.password}</li> : ""}
                </ul>
              </div>
            ) : (
              ""
            )}
            <button className="btn btn-primary" onClick={handleSubmit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
