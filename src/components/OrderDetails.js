import { Table, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMeals } from "../redux/mealOrderSlice";

const OrderDetails = ({ table, totalPriceHandler }) => {
  const mealsState = useSelector((state) => state.meals);
  const meals = mealsState.meals.filter((item) => item.table === table);
  const [totalPrice, setTotalPrice] = useState(0);
  const mealsTotalPrices = meals.map((item) => item.totalPrice);
  const sumOfMealsPrice = mealsTotalPrices.reduce((sum, val) => sum + val, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMeals());
    setTotalPrice(sumOfMealsPrice);
    totalPriceHandler(sumOfMealsPrice);
   
  }, [dispatch, sumOfMealsPrice, sumOfMealsPrice]);


  




 

  const dataSource =
    meals.length > 0 &&
    meals.map((item) => ({
      key: item.id,
      Say: item.id,
      "Məhsulun adı": item.selectedMeal,
      Miqdar: item.mealAmount,
      Məbləğ: item.totalPrice,
      "Sifariş saatı": item.orderTime,
      Gözləmə: "10 Downing Street",
    }));

  const columns = [
    {
      title: "Say",
      dataIndex: "Say",
      key: "1",
    },
    {
      title: "Məhsulun adı",
      dataIndex: "Məhsulun adı",
      key: "2",
    },
    {
      title: "Miqdar",
      dataIndex: "Miqdar",
      key: "3",
    },
    {
      title: "Məbləğ",
      dataIndex: "Məbləğ",
      key: "4",
    },
    {
      title: "Sifariş saatı",
      dataIndex: "Sifariş saat",
      key: "5",
    },
    {
      title: "Gözləmə",
      dataIndex: "Gözləmə",
      key: "6",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "7",
      render: (record) => {
        return (
          <>
            <Button>Verildi</Button>
          </>
        );
      },
    },
    {
      title: "Ləğv",
      dataIndex: "Ləğv",
      key: "7",
      render: (record) => {
        return (
          <>
            <Button>Geri al</Button>
          </>
        );
      },
    },
  ];


 
  return (
    <>
      <div className="">
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <p>
          Cemi mebleg: <span>{totalPrice} manat</span>{" "}
        </p>
      </div>
    </>
  );
};

export default OrderDetails;
