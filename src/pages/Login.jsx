import React, { useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { json } from "react-router-dom";
import Swal from "sweetalert2";
function Login() {
  let api_url_users = "https://669f8faab132e2c136fe57d0.mockapi.io/users/";
  const [users, setUsers] = useState([]);
  const [logInEmail, setLogInEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  useEffect(() => {
    axios(api_url_users).then((res) => {
      setUsers(res.data);
    });
  }, []);
  let loged_user = [];
  let local_loged_user = JSON.parse(localStorage.getItem("logedUser"));
  if (local_loged_user) {
    loged_user = local_loged_user;
  } else {
    loged_user = [];
  }
  return (
    <>
      <div className="log-in-container">
        <h1 style={{ color: "#ECC540" }}>Log in</h1>
        <form className="log-in-form">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setLogInEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setLogInPassword(e.target.value);
            }}
          />
          <div className="log-in-buttons">
            <button
              style={{ backgroundColor: "black", color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                let find = false;
                let element;
                users.forEach((elem) => {
                  if (
                    elem.email == logInEmail &&
                    elem.password == logInPassword
                  ) {
                    find = true;
                    element = elem;
                  }
                });
                if (find) {
                  console.log("welcome");
                  loged_user = [element];
                  localStorage.setItem("logedUser", JSON.stringify(loged_user));
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Welcome!",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setTimeout(() => {
                    window.location.reload();
                    window.location.href = "/account";
                  }, 1500);
                } else {
                  alert("invalid email or password");
                }
              }}
            >
              Log in
            </button>
            <button
              style={{ backgroundColor: "#FCDE11", color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(".register-container")
                  .classList.remove("none");
                document
                  .querySelector(".log-in-container")
                  .classList.add("none");
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
      <div className="register-container none">
        <h1 style={{ color: "#ECC540" }}>Register</h1>
        <form className="log-in-form">
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => {
              setRegisterName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => {
              setRegisterEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setRegisterPassword(e.target.value);
            }}
          />
          <div className="log-in-buttons">
            <button
              style={{ backgroundColor: "black", color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                let newUser = {
                  name: registerName,
                  email: registerEmail,
                  password: registerPassword,
                };
                console.log(newUser);

                let findReg = true;
                console.log(users);
                users.forEach((elem) => {
                  if (elem.email == registerEmail) {
                    findReg = false;
                    console.log("email regisyered");
                  }
                });
                if (findReg) {
                  axios.post(api_url_users, newUser).then((res) => {
                    setUsers(res.data);
                  });
                  localStorage.setItem("logedUser", JSON.stringify([newUser]));
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You succesfully registered",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  setTimeout(() => {
                    window.location.reload();
                    window.location.href = "/account";
                  }, 1500);
                } else {
                  alert("this email was registered");
                }
              }}
            >
              Register
            </button>
            <button
              style={{ backgroundColor: "#FCDE11", color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector(".register-container")
                  .classList.add("none");
                document
                  .querySelector(".log-in-container")
                  .classList.remove("none");
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
