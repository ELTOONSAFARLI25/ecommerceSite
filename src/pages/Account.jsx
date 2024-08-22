import React from "react";
import { json } from "react-router-dom";
import Swal from "sweetalert2";

function Account() {
  let loged_user = JSON.parse(localStorage.getItem("logedUser"));

  return (
    <>
      <div className="account-container">
        <h1>Account</h1>
        <h2>Name: {loged_user[0].name}</h2>
        <h3>Email: {loged_user[0].email}</h3>
        <div className="buttons">
          <button
            onClick={() => {
              loged_user = null;
              localStorage.setItem("logedUser", JSON.stringify(loged_user));
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Loged out",
                showConfirmButton: false,
                timer: 1500,
              });
              setTimeout(() => {
                window.location.reload();
                window.location.href = "/login";
              }, 1500);
            }}
          >
            Log out
          </button>
          <button>Delete account</button>
        </div>
      </div>
    </>
  );
}

export default Account;
