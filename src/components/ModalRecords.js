import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import OrderDetails from "./OrderDetails";

const ModalRecords = ({
  ordersModalVisible,
  onOk,
  table,
  totalPriceHandler,
}) => {
  const handleOk = () => {
    onOk();
  };

  return (
    <>
      <Modal
        title="Orders"
        visible={ordersModalVisible}
        footer={null}
        onCancel={handleOk}
        width={900}
      >
        <OrderDetails table={table} totalPriceHandler={totalPriceHandler} />
      </Modal>
    </>
  );
};

export default ModalRecords;
