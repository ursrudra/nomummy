import React from "react";
import { Redirect } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import "./Store.scss";

const Store = () => {
  const signout = () => {
    auth.signOut().then(() => {
      console.log("SignedOut");
      <Redirect to="/login" />;
    });
  };
  return (
    <div className="row store">
      <aside className="sidebar">
        <div className="avatar logo">nm</div>
      </aside>
      <main className="col main-container">
        <header className="header">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search for products"
          />
          <div className="avatar"></div>
          <button onClick={signout}>SignOut</button>
        </header>
        <section className="container"></section>
      </main>
    </div>
  );
};

export default Store;
