import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "Accessories",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setProductDetails({ ...productDetails, image: e.target.files[0] });
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const Add_Product = async () => {
    console.log(productDetails);
    let responseData;

    let formData = new FormData();
    formData.append("product", productDetails.image);
    await fetch("http://localhost:4001/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      const updatedProductDetails = {
        ...productDetails,
        image: responseData.image_url,
      };
      console.log(updatedProductDetails);
      await fetch("http://localhost:4001/addproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductDetails),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert("Product Added")
            : alert("Failed to Add Product");
        });
    }
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="addproduct-selector"
        >
          <option value="Accessories">Accessories</option>
          <option value="Supplements">Supplements</option>
          <option value="Snacks">Snacks</option>
        </select>
      </div>
      <div className="addproduct-itemfield">
        <label htmlFor="file-input">
          <img
            src={
              productDetails.image
                ? URL.createObjectURL(productDetails.image)
                : upload_area
            }
            className="addproduct-thumbnail-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Product();
        }}
        className="addproduct-button"
      >
        Add
      </button>
    </div>
  );
};

export default AddProduct;
