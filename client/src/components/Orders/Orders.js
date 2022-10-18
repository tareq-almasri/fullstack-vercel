import axios from "axios";
import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);

  const getOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/orders/", {
        withCredentials: true,
      });

      setOrders(response.data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {error ? <p>Unauthorized access</p> : null}
      <ol>
        {orders.map((order) => {
          return (
            <li>
              orderDescription: {order.orderDescription}, totalPrice:{" "}
              {order.totalPrice}
            </li>
          );
        })}
      </ol>
    </>
  );
}
