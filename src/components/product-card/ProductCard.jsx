import React, { useEffect, useState } from "react";
import "./productcard.scss";

const ProductCard = ({ product, handleClick }) => {
  const {
    product_id,
    short_name,
    description,
    price,
    image_url,
    items_available,
    brand,
    category,
  } = product;

  const [localProduct, setLocalProduct] = useState();
  useEffect(() => {
    setLocalProduct(product);
  }, [product]);

  return (
    <div className="product-card" onClick={() => handleClick(localProduct)}>
      <div className="product-card__header">
        <img src={image_url} alt={short_name} />
      </div>
      <div className="product-card__body">
        <h5 className="product-card__details-title">{short_name}</h5>
      </div>
      <div className="product-card__footer">
        <span>{price}</span>
        <span>{brand}</span>
      </div>
      <span>Add Product</span>
    </div>
  );
};

export default ProductCard;
