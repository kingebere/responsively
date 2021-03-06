import React from "react";

function Subscribe() {
  return (
    <div className="subscribe">
      <h2 className="subscribe__header mobile marg-b-m">
        Join our newsletters, <br /> <span>keep up with new updates! </span>
      </h2>
      <h2 className="subscribe__header desktop marg-b-m">
        Explore new music with us.{" "}
        <span className="subscribe__header--span">
          Track your collections and wantlist. Contribute to the catalogs.{" "}
        </span>
      </h2>
      <form className="subscribe__form">
        <input
          className="subscribe__input"
          name="subscribe"
          id="subscribe"
          placeholder="Enter your e-mail"
          type="email"
        ></input>
        <button className="btn btn-white  btn-white--subscribe" type="submit">
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default Subscribe;
