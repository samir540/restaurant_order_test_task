import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import MenuNav from "../components/MenuNav";
import { fetchData } from "../redux/OrderSlice";
import { useDispatch, useSelector } from "react-redux";

import { Select } from "antd";
import api from "../axios/api";

const { Option } = Select;

const OrderPage = () => {
  // Get all data from Redux
  const orderStatus = useSelector((state) => state.order);
  const meals = orderStatus.data.map((data) => data.meals);
  const servers = orderStatus.data.map((data) => data.servers);
  const tables = orderStatus.data.map((data) => data.tables);

  // Table and Server order handle
  const [showTableOrder, setShowTableOrder] = useState(true);
  const tableOrderHandler = () => {
    setShowTableOrder(false);
  };

  const [table, setTable] = useState("");
  const [server, setServer] = useState("");
  const tableHandler = (value) => {
    setTable(value);
  };
  const serverHandler = (value) => {
    setServer(value);
  };

  // Meals and Price
  const [selectedMeal, setSelectedMeal] = useState("");
  // const [selectedMeal, useSelectedMeal] = useState(0);
  const mealOrderHandler = (value) => {
    setSelectedMeal(value);
  };

  // Count meal price
  const [totalPrice, setTotalPrice] = useState(0);
  const [mealAmount, setMealAmount] = useState(0);
  const [sumTotalPrice, setSumTotalPrice] = useState(0);

  const priceHandler = (value) => {
    if (!selectedMeal) return;
    setMealAmount(value);
    const mealsAll = meals.length > 0 ? meals[0].map((item) => item) : null;
    const selectedMealPrice = mealsAll.filter(
      (meal) => meal.name === selectedMeal
    )[0].price;
    const totalMealPrice = value * selectedMealPrice;

    
    setTotalPrice(totalMealPrice > 0 && totalMealPrice);
    
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchData());
  }, []);

  //submit server and table

  const serverAndTableSubmitHandler = () => {
    if (!table || !server) return;

    const orderedServerAndTable = {
      table,
      server,
    
    };

    api.post("/oderedTableAndServer", orderedServerAndTable);
    tableOrderHandler();
  };

  // submit meals

  const mealSubmitHandler = () => {
    const date = new Date();
    const min = date.getMinutes();
    const hour = date.getHours();
    const orderTime = `${hour}:${min}`;
    if (mealAmount <= 0) return;
    const orderedMeals = {
      selectedMeal,
      mealAmount,
      totalPrice,
      orderTime,
      table,
      sumTotalPrice,
    };

    api.post("/oderedMeals ", orderedMeals);
  };

  return (
    <div className="flex flex-row ">
      <MenuNav />
      <div className="order">
        {showTableOrder && (
          <div className="order__options--table mb-8 ">
            <div className="table mb-3  ">
              <label>Masa:</label>
              <Select
                defaultValue="Seç"
                style={{ width: 120 }}
                onChange={tableHandler}
              >
                {!orderStatus.loading && tables.length > 0
                  ? tables[0].map((item) => (
                      <Option value={item.name} key={item.id}>
                        {item.name}
                      </Option>
                    ))
                  : null}
              </Select>
            </div>
            <div className="server">
              <label>Xidmətçi:</label>
              <Select
                defaultValue="Seç"
                style={{ width: 120 }}
                onChange={serverHandler}
              >
                {!orderStatus.loading && servers.length > 0
                  ? servers[0].map((item) => (
                      <Option value={item.name} key={item.id}>
                        {item.name}
                      </Option>
                    ))
                  : null}
                \{" "}
              </Select>
            </div>
            <button
              onClick={serverAndTableSubmitHandler}
              className=" bg-blue-500 rounded p-2 "
              type="submit"
            >
              Sifariş et
            </button>
          </div>
        )}
        {!showTableOrder && (
          <div className="order__meals">
            <label className="mr-2">Məhsulun adı:</label>
            <Select
              defaultValue="Seç"
              style={{ width: 120 }}
              onChange={mealOrderHandler}
            >
              {!orderStatus.loading && meals.length > 0
                ? meals[0].map((item) => (
                    <Option value={item.name} key={item.id}>
                      {item.name}
                    </Option>
                  ))
                : null}
              \{" "}
            </Select>

            <label className="m-3">Miqdar:</label>
            <input
              type="number"
              className="outline  outline-1  "
              onChange={(e) => priceHandler(e.target.value)}
            />
            <p>
              Qiymət: <span>{totalPrice} </span>{" "}
            </p>
            <button
              className=" bg-blue-500 rounded p-2 "
              type="submit"
              onClick={mealSubmitHandler}
            >
              Əlavə et
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPage;
