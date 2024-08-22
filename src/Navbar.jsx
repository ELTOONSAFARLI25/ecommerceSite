import React from "react";
import { Link } from "react-router-dom";
function Navbar({ loged_user }) {
  console.log(loged_user);
  let login;
  if (loged_user) {
    login = "Account";
  } else {
    login = "Log in";
  }
  return (
    <>
      <nav>
        <div className="nav-container">
          <Link to="/">Home</Link>
          <Link to="/basket">Basket</Link>
          <Link to="/wihslist">Wishlist</Link>
          <Link to={loged_user ? "/account" : "/login"}>{login}</Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
