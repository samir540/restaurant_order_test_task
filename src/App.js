import "./App.css";
import HomePage from "./pages/HomePage";
import OrderInfoPage from "./pages/OrderInfoPage";
import OrderPage from "./pages/OrderPage";
import ErrorPage from "./pages/ErrorPage";

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/order-info" element={<OrderInfoPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
