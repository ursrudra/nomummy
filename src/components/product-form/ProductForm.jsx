import React, { useEffect, useState } from "react";
import "./productform.scss";
import { useStateValue } from "../../globalState/StateProvider";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
const ProductForm = ({ product }) => {
  const [localProduct, setLocalProduct] = useState(product);
  const [{ store }, dispatch] = useStateValue();

  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct({ ...localProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const baseUrl = "http://127.0.0.1:5000";
    const { product_id, ...rest } = localProduct;
    // axios
    //   .post(`${baseUrl}/insert`, { ...rest })
    //   .then((res) => console.log(res));
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        ...localProduct,
        product_id: product_id,
      },
    });
  };

  if (!product) {
    return <h1>Select one</h1>;
  }
  const {
    short_name,
    items_available,
    price,
    image_url,
    category,
    metric,
    qty_metric,
  } = localProduct;

  return (
    <div className="product-form">
      <div className="product-form__image">
        <img src={image_url} alt={short_name} />
      </div>
      <div className="product-form__container">
        <fieldset>
          <legend>Product Details</legend>
          <div className="product-form__field">
            <label htmlFor="short_name">Product Image</label>
            <input
              type="text"
              name="image_url"
              id="image_url"
              value={image_url}
              onChange={handleChange}
            />
          </div>
          <div className="product-form__field">
            <label htmlFor="short_name">Product Category</label>
            <select
              name="category"
              id="category"
              onChange={handleChange}
              value={category}
            >
              <option value="fruits">Fruits</option>
              <option value="veg">Veg</option>
              <option value="electronics">Electronics</option>
              <option value="mobiles">Mobiles</option>
            </select>
          </div>

          <div className="product-form__field">
            <label htmlFor="short_name">Product name</label>
            <input
              type="text"
              name="short_name"
              id="short_name"
              value={short_name}
              onChange={handleChange}
            />
          </div>
          <div className="product-form__field">
            <label htmlFor="price">Product price</label>
            <span>
              <input
                type="text"
                name="price"
                id="price"
                value={price}
                onChange={handleChange}
              />
              /
              <select value={metric} onChange={handleChange} name="metric">
                <option value="kg">KG</option>
                <option value="gram">Gram</option>
                <option value="liter">Liter</option>
                <option value="packet">Packet</option>
              </select>
            </span>
          </div>
          <div className="product-form__field">
            <label htmlFor="items_available">Stock Availability</label>
            <span>
              <input
                type="text"
                name="items_available"
                id="items_available"
                value={items_available}
                onChange={handleChange}
              />
              /
              <select
                name="qty_metric"
                onChange={handleChange}
                value={qty_metric}
              >
                <option value="kg">KG</option>
                <option value="gram">Gram</option>
                <option value="liter">Liter</option>
                <option value="packet">Packet</option>
              </select>
            </span>
          </div>
        </fieldset>
        <input
          className="product-form__cta"
          type="submit"
          value="Add Product"
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProductForm;
