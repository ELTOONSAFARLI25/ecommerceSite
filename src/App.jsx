import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Basket from "./pages/Basket";
import Navbar from "./Navbar";
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Admin from "./pages/Admin";
function App() {
  let loged_user = JSON.parse(localStorage.getItem("logedUser"));

  return (
    <>
      <Navbar loged_user={loged_user} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path={loged_user ? "/account" : "/login"}
          element={loged_user ? <Account /> : <Login />}
        ></Route>
        <Route path="/basket" element={<Basket />}></Route>
        <Route path="/wihslist" element={<Wishlist />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </>
  );
}

export default App;
