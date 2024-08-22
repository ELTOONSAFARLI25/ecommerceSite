import React, { useEffect, useState } from "react";
import { FaBeer } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import axios, { isCancel, AxiosError } from "axios";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
function Home() {
  let loged_user = JSON.parse(localStorage.getItem("logedUser"));
  let api_url_products =
    "https://669f8faab132e2c136fe57d0.mockapi.io/products/";
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios(api_url_products).then((res) => {
      setProducts(res.data);
    });
  }, []);

  let wishlistArr;
  let local_wishlist = JSON.parse(localStorage.getItem("wishlist"));
  if (local_wishlist) {
    wishlistArr = local_wishlist;
  } else {
    wishlistArr = [];
  }
  console.log(wishlistArr);
  return (
    <>
      <div
        className={
          loged_user
            ? "go-log-in log-in-container none"
            : "go-log-in log-in-container"
        }
      >
        <h2>You are not loged in!</h2>
        <i>Log in or register to use features of site</i>
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Log in
        </button>
      </div>

      <div
        className={
          loged_user ? " products-container" : "products-container none"
        }
      >
        {products.map((elem) => {
          return (
            <div key={uuidv4()} className="card" cardid={elem.id}>
              <div className="card-img">
                <img
                  src="https://media.istockphoto.com/id/1356225921/vector/new-product-label-tag-new-fabric-vector-design-fashion-tag-sign.jpg?s=612x612&w=0&k=20&c=PN9xlDif2_qb9YgYCbAxsH_jBW-YjbXiW62CqCov2zg="
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
                  <FiShoppingCart className="add-to-cart" />

                  {/* {favIcon ? <FaHeart /> : <FaRegHeart />} */}
                  <FaRegHeart
                    className="add-to-fav "
                    style={{ color: "red" }}
                    onClick={(e) => {
                      let selected_id =
                        e.target.parentElement.parentElement.parentElement.getAttribute(
                          "cardid"
                        );
                      let selected_elem = products.find(
                        (elem) => elem.id == selected_id
                      );
                      console.log(selected_elem);
                      console.log(selected_id);
                      let findFav = true;
                      for (let elem of wishlistArr) {
                        if (elem.id == selected_id) {
                          console.log(elem.id, selected_id);
                          findFav = false;
                        }
                      }
                      if (findFav) {
                        wishlistArr.push(selected_elem);
                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(wishlistArr)
                        );
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Product added to wishlist",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      } else {
                        wishlistArr = wishlistArr.filter(
                          (elem) => elem.id != selected_id
                        );
                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(wishlistArr)
                        );
                        Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: "Product deleted from wihslist",
                          showConfirmButton: false,
                          timer: 1000,
                        });
                      }
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

export default Home;
