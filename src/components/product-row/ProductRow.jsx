import React, { useEffect, useState } from "react";
import "./productRow.scss";
import { useStateValue } from "../../globalState/StateProvider";
import axios from "axios";
const ProductRow = ({ product, handleDelete }) => {
  const [localProduct, setLocalProduct] = useState(product);
  const [edit, setEdit] = useState(false);
  const [, dispatch] = useStateValue();

  const {
    id,
    image_url,
    short_name,
    items_available,
    price,
    discount = 0,
    metric,
    qty_metric,
  } = localProduct;

  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalProduct({ ...localProduct, [name]: value });
  };

  const handleSave = () => {
    const baseUrl = "http://127.0.0.1:5000";
    const { product_id, ...rest } = localProduct;
    axios
      .post(`${baseUrl}/update`, {
        id: product_id,
        ...rest,
      })
      .then((res) => {
        console.log(res);
      });
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: localProduct,
    });
    setEdit(false);
  };

  if (edit) {
    return (
      <div className="product-row" id={`product-${id}`}>
        <span className="product-row__field">
          <img src={image_url} alt={short_name} />
        </span>
        <span className="product-row__field">
          <input
            type="text"
            value={short_name ? short_name : ""}
            placeholder="Update product name"
            name="short_name"
            onChange={handleChange}
          />
        </span>
        <span className="product-row__field">
          <input
            type="text"
            value={price ? price : "0"}
            placeholder="Update Price"
            name="price"
            onChange={handleChange}
          />
        </span>
        <span className="product-row__field">
          <input
            type="text"
            value={items_available ? items_available : "0"}
            placeholder="Update Quantity"
            onChange={handleChange}
            name="items_available"
          />
        </span>
        <span className="product-row__field">
          <input
            type="text"
            value={discount ? discount : "0"}
            placeholder="Update Discount"
            onChange={handleChange}
            name="discount"
          />
        </span>

        <span className="product-row__field">
          <span className="product-row__cta" role="button" onClick={handleSave}>
            Save
          </span>
          <span
            className="product-row__cta product-row__cta--cancle"
            role="button"
            onClick={() => setEdit(!edit)}
          >
            cancel
          </span>
        </span>
      </div>
    );
  } else
    return (
      <div className="product-row" id={`product-${id}`}>
        <span className="product-row__field">
          <img src={image_url} alt={short_name} />
        </span>
        <span className="product-row__field">{short_name}</span>
        <span className="product-row__field">
          <b>
            ₹
            {new Intl.NumberFormat("en-IN", {
              maximumSignificantDigits: 3,
            }).format(price)}
          </b>
          <span>{metric && "/" + metric}</span>
          {discount > 0 && (
            <p className="product__chip">
              ₹
              {new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 3,
              }).format(price - price * (discount / 100))}
            </p>
          )}
        </span>
        <span className="product-row__field">
          {items_available} {qty_metric}
        </span>
        <span className="product-row__field">{discount}%</span>

        <span className="product-row__field">
          <span
            className="product-row__cta"
            role="button"
            onClick={() => setEdit(!edit)}
          >
            Edit
          </span>
          <span
            className="product-row__cta product-row__cta--delete"
            role="button"
            onClick={() => handleDelete(localProduct)}
          >
            Delete
          </span>
        </span>
      </div>
    );
};
export default ProductRow;
