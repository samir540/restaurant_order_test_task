import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MenuNav from "../components/MenuNav";
import { Table, Button } from "antd";
import ModalRecords from "../components/ModalRecords";
import { fetchTableAndServerData } from "../redux/tableAndServerSlice";
import { fetchMeals } from "../redux/mealOrderSlice";

import { useDispatch, useSelector } from "react-redux";

const OrderInfoPage = () => {
  const [sumOfTotalMealPrice, setSumOfTotalMealPrice] = useState(0);
  const totalPriceHandler = (data) => {
    setSumOfTotalMealPrice(data);
  };
  console.log(sumOfTotalMealPrice);

  // Fetch table and server data
  const dispatchTableAndServer = useDispatch();
  const mealsDispatch = useDispatch();

  useEffect(() => {
    dispatchTableAndServer(fetchTableAndServerData());
    mealsDispatch(fetchMeals());
  }, []);

  // Get table and server data from state
  const dataTableAndServer = useSelector(
    (state) => state.tablesAndServers.oderedTableAndServer
  );
  const [table, setTable] = useState("");
  const showMeal = (record) => {
    setTable(record.Masa);
  };

  console.log(table);
  // Get meals and calculate sum of meals price
  const mealsState = useSelector((state) => state.meals);
  const meals = mealsState.meals.filter((item) => item.table === table);
    const [totalPrice, setTotalPrice] = useState(0);
    const mealsTotalPrices = meals.map((item) => item.totalPrice);
    const sumOfMealsPrice = mealsTotalPrices.reduce((sum, val) => sum + val, 0);
  console.log(sumOfMealsPrice);

  const date = new Date().toLocaleString();

  const [ordersModal, setOrdersModal] = useState(false);
  const okHandler = () => {
    setOrdersModal(false);
  };

  const dataSource =
    dataTableAndServer.length > 0 &&
    dataTableAndServer.map((item) => ({
      key: item.id,
      "Sıra sayı": item.id,
      Masa: item.table,
      Xidmətçi: item.server,
      Status: "10 Downing Street",
      Məbləğ: 100,
      "Sonlanma tarixi": "10 Downing Street",
    }));

  const columns = [
    {
      title: "Sıra sayı",
      dataIndex: "Sıra sayı",
      key: "1",
    },
    {
      title: "Masa",
      dataIndex: "Masa",
      key: "2",
    },
    {
      title: "Xidmətçi",
      dataIndex: "Xidmətçi",
      key: "3",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "4",
    },
    {
      title: "Məbləğ",
      dataIndex: "Məbləğ",
      key: "5",
    },
    {
      title: "Sonlanma tarixi",
      dataIndex: "Sonlanma tarixi",
      key: "6",
    },
    {
      title: "Ətraflı",
      
      key: "7",
      render: (record) => {
        return (
          <>
            <Button
              onClick={() => {
                showMeal(record);

                setOrdersModal(true);
              }}
            >
              Bax
            </Button>
          </>
        );
      },
    },
  ];


  return (
    <>
      <ModalRecords
        ordersModalVisible={ordersModal}
        onOk={okHandler}
        table={table}
        totalPriceHandler={totalPriceHandler}
      />
      <div className="flex flex-row ">
        <MenuNav />
        <div className="">
          <Table dataSource={dataSource} columns={columns} pagination={false} />
          <p>
            Cemi mebleg: <span>100m</span>{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default OrderInfoPage;
