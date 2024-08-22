import React, { useEffect, useState } from "react";
import axios, { isCancel, AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";

import Swal from "sweetalert2";

function Admin() {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [adminUser, setAdminUser] = useState({});
  let api_url_users = "https://669f8faab132e2c136fe57d0.mockapi.io/users/";
  let api_url_products =
    "https://669f8faab132e2c136fe57d0.mockapi.io/products/";

  useEffect(() => {
    axios(api_url_users).then((res) => {
      setUsers(res.data);
    });
  }, []);
  useEffect(() => {
    axios(api_url_products).then((res) => {
      setProducts(res.data);
    });
  }, []);
  return (
    <>
      <div className="log-in-container" style={{ backgroundColor: "#1E1E1E" }}>
        <h1 style={{ color: "white" }}>Admin</h1>
        <form className="log-in-form" style={{ textAlign: "center" }}>
          <input
            type="email"
            required
            placeholder="Email"
            style={{ backgroundColor: "black", color: "white" }}
            onChange={(e) => {
              setAdminEmail(e.target.value);
            }}
          />
          <input
            type="passowrd"
            placeholder="Password"
            style={{ backgroundColor: "black", color: "white" }}
            onChange={(e) => {
              setAdminPassword(e.target.value);
            }}
          />
          <div className="admin-log-in-buttons ">
            <button
              style={{ backgroundColor: "white", color: "black" }}
              onClick={(e) => {
                e.preventDefault();
                let findAdmin = false;
                let user;
                users.forEach((elem) => {
                  if (
                    elem.email == adminEmail &&
                    elem.password == adminPassword
                  ) {
                    findAdmin = true;
                    user = elem;
                  }
                });
                if (findAdmin) {
                  if (user.isAdmin) {
                    setAdminUser(user);
                    document
                      .querySelector(".log-in-container")
                      .classList.add("none");
                    document
                      .querySelector(".admin-page-container")
                      .classList.remove("none");
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Welcome,Admin User!",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "You don't have access to this section!",
                    });
                  }
                } else {
                  console.log(" invalid email or password");
                }
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
      <div className="admin-page-container none">
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              document
                .querySelector(".admin-page-products")
                .classList.toggle("none");
            }}
          >
            Products
          </button>
          <button>Users</button>
        </div>
        <div className="admin-page-products">
          <table className="admin-products-table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>pice</th>
                <th>units in stock</th>
                <th>edit</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((elem) => {
                return (
                  <tr key={uuidv4()} elemid={elem.id}>
                    <td>{elem.id}</td>
                    <td>{elem.name}</td>
                    <td>{elem.unitPrice}</td>
                    <td>{elem.unitsInStock}</td>
                    <td>
                      <button className="admin-edit">Edit</button>
                    </td>
                    <td>
                      <button
                        className="admin-delete"
                        onClick={(e) => {
                          let selected_id =
                            e.target.parentElement.parentElement.getAttribute(
                              "elemid"
                            );
                          axios.delete(api_url_products + selected_id);
                          products.filter((elem) => elem.id != selected_id);
                          setProducts(products);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Admin;
