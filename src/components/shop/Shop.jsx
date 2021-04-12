import React, { useState, useEffect } from "react";
import { useStateValue } from "../../globalState/StateProvider";
import "./shop.scss";
import ProductRow from "../product-row/ProductRow";
import { groupBy, getSoftFunction } from "../../Global/js/utils";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { Link } from "react-router-dom";
import axios from "axios";

const productTemp = {
  product_id: null,
  short_name: "",
  long_name: "",
  description: "",
  price: "",
  image_url: "",
  items_available: "",
  brand: "",
  category: "",
  metric: "kg",
  qty_metric: "kg",
};

const UpdateStore = ({ searchKey = "" }) => {
  const [{ store }, dispatch] = useStateValue();
  const [filteredList, setFilteredList] = useState(store);
  const [, setLocalProduct] = useState(productTemp);

  useEffect(() => {
    if (setFilteredList) {
      setFilteredList(
        store.filter((key) => {
          return (
            searchKey === "" ||
            key.short_name.toLowerCase().includes(searchKey.toLowerCase())
          );
        })
      );
    }
  }, [store, searchKey]);

  const productsList = groupBy(filteredList, "category");
  const [sortby, setSortBy] = useState("name");

  const handleClick = (product) => {
    setLocalProduct(product);
  };
  const handleDelete = (product) => {
    const baseUrl = "http://127.0.0.1:5000";
    axios.post(`${baseUrl}/delete`, [product.product_id]).then((res) => {
      console.log(res);
    });
    dispatch({
      type: "DELETE_PRODUCT",
      payload: product,
    });

    setFilteredList(
      filteredList.filter((p) => p.product_id !== product.product_id)
    );
  };

  const handleSortBy = (sortBy) => {
    if (sortBy === sortby) {
      setSortBy(sortBy + "_reverse");
    } else {
      setSortBy(sortBy);
    }
  };
  if (filteredList.length <= 0 && searchKey === "")
    return (
      <div className="noproduct__container">
        <div className="noproduct__message">
          There are no products added to your store.
        </div>
        <div className="noproduct__cta">
          <Link to="add-product">Add a product</Link>
        </div>
      </div>
    );
  else if (filteredList.length <= 0)
    return (
      <div className="noproduct__container">
        <div className="noproduct__message">
          No Products have been found for the search key "{searchKey}"
        </div>
        <div className="noproduct__instructions"></div>
      </div>
    );
  return (
    <div className="updatestore">
      <div className="product-row product-row--heading ">
        <span className="product-row__field"></span>
        <span
          className="product-row__field"
          onClick={() => handleSortBy("name")}
        >
          Name {sortby === "name" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </span>
        <span
          className="product-row__field"
          onClick={() => handleSortBy("price")}
        >
          Price{" "}
          {sortby === "price" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </span>
        <span
          className="product-row__field"
          onClick={() => handleSortBy("qty")}
        >
          Quantity{" "}
          {sortby === "qty" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </span>
        <span
          className="product-row__field"
          onClick={() => handleSortBy("discount")}
        >
          Discount{" "}
          {sortby === "discount" ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </span>
        <span className="product-row__field">
          <span className="product-row__cta" role="button">
            Action
          </span>
        </span>
      </div>
      {Object.keys(productsList).map((category, i) => (
        <div key={category} className={`updatestore__category`}>
          <span
            className={`updatestore__category-heading updatestore__category-heading--${i}`}
          >
            {category}
          </span>
          <div className="updatestore__product-list">
            {productsList[category]
              .sort(getSoftFunction(sortby))
              .map((product) => (
                <ProductRow
                  product={product}
                  key={product.product_id}
                  click={handleClick}
                  handleDelete={(product) => handleDelete(product)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpdateStore;
