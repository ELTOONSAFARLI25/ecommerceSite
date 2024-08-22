import React, { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import axios, { isCancel, AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";

function Wishlist() {
  let wishlistArr = JSON.parse(localStorage.getItem("wishlist"));
  let loged_user = JSON.parse(localStorage.getItem("logedUser"));

  console.log(wishlistArr);
  return (
    <>
      <h1>Wishlist</h1>
      <div
        className={
          loged_user ? " products-container" : "products-container none"
        }
      >
        {wishlistArr.map((elem) => {
          return (
            <div key={uuidv4()} className="card" cardid={elem.id}>
              <div className="card-img">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2441/2441016.png"
                  alt=""
                />
              </div>
              <div className="card-body">
                <div className="card-details">
                  <h4>
                    {elem.id} | {elem.name}
                  </h4>
                  <h4>{elem.unitPrice}</h4>
                  <p>
                    {elem.unitsInStock} units in stock| Sale:
                    {elem.sale > 0 ? elem.sale : "None"}
                  </p>
                </div>
                <div className="icons">
                  <IoMdClose
                    className="add-to-fav remove-fav "
                    onClick={(e) => {
                      let selected_id =
                        e.target.parentElement.parentElement.parentElement.getAttribute(
                          "cardid"
                        );
                      let selected_elem = wishlistArr.find(
                        (elem) => elem.id == selected_id
                      );
                      wishlistArr = wishlistArr.filter(
                        (elem) => elem.id != selected_id
                      );
                      e.target.parentElement.parentElement.parentElement.remove();
                      localStorage.setItem(
                        "wishlist",
                        JSON.stringify(wishlistArr)
                      );
                      console.log(selected_elem);
                      console.log(selected_id);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Wishlist;
