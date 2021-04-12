import React, { useState } from "react";
import "./addproduct.scss";
import ProductForm from "../components/product-form/ProductForm";
import ProductCard from "../components/product-card/ProductCard";
import { products } from "../assets/productData";
import { groupBy } from "../Global/js/utils";
const AddProduct = () => {
  const initProduct = {
    product_id: null,
    short_name: "",
    long_name: "",
    description: "",
    price: "",
    image_url: "",
    items_available: "",
    brand: "",
    category: "",
  };

  const [localProduct, setLocalProduct] = useState(initProduct);

  const handleSelection = (product) => {
    setLocalProduct(product);
  };
  const [categories] = useState(groupBy(products, "category"));

  return (
    <div className="add-product">
      <div className="product__categories-container">
        <h2>Avaialble Products</h2>
        {Object.keys(categories).map((category, i) => (
          <div key={category} className={`updatestore__category`}>
            <span
              className={`updatestore__category-heading updatestore__category-heading--${i}`}
            >
              {category}
            </span>
            <div className="updatestore__product-list">
              {categories[category].map((product) => (
                <ProductCard
                  product={product}
                  key={product.product_id}
                  handleClick={(product) => handleSelection(product)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="product__form-container">
        <ProductForm product={localProduct} />
      </div>
    </div>
  );
};

export default AddProduct;
