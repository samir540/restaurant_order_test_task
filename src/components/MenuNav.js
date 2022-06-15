
import { Link } from "react-router-dom";
import React from "react";

const MenuNav = () => {
  return (
    <nav className="w-1/4 flex flex-col ml-5 mt-10 " >
      <Link to="/home">
        <div>HomePage</div>
      </Link>
      <Link to="/order-info">
        <div>OrderInfo</div>
      </Link>
      <Link to="/order">
        <div>Order</div>
      </Link>
    </nav>
  );
};

export default MenuNav;
