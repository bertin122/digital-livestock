import React, { useEffect, useState } from "react";
import { X, Check } from "lucide-react";
import Modal from "../modals/modal"; 

interface Cow {
  id: number;
  name: string;
  price: string;
  photos: string[];
}

interface Order {
  id: number;
  user_id: number;
  cow_id: number;
  ordered_at: string;
  status: string;
  cow: Cow;
}

const OrdersCard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error" | null>(null);
  const [modalMessage, setModalMessage] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order/getall", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: 1 }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setOrders(data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleCancel = async (orderId: number) => {
    try {
      const res = await fetch("http://localhost:3000/api/order/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId }),
      });
      const data = await res.json();

      if (res.ok) {
        setModalType("success");
        setModalMessage("Order deleted successfully!");
        fetchOrders(); // refresh the list
      } else {
        setModalType("error");
        setModalMessage(data.message || "Failed to delete order");
      }

      setShowModal(true);
      setTimeout(() => setShowModal(false), 4000);
    } catch (error) {
      console.error("Error deleting order:", error);
      setModalType("error");
      setModalMessage("An error occurred while deleting the order");
      setShowModal(true);
      setTimeout(() => setShowModal(false), 4000);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h2 className="font-bold text-lg border-b pb-2">Orders</h2>

      {orders.length === 0 && <p className="text-gray-500">No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex items-center bg-[rgb(230,225,225)] justify-between p-2  rounded-lg hover:shadow-md transition-shadow gap-4"
        >
          <img
            src={order.cow.photos[0]}
            alt={order.cow.name}
            className="w-12 h-12 object-cover rounded-md"
          />

          <div className="flex-1 flex gap-4 items-center">
            <p className="w-[5%] font-semibold">#{order.id}</p>
            <p className="w-[15%] font-semibold">{order.cow.name}</p>
            <p className="w-[15%]">${order.cow.price}</p>
            <p className="w-[25%]">{new Date(order.ordered_at).toLocaleDateString()}</p>
            <p
              className={`w-[10%] font-bold text-center ${
                order.status === "pending"
                  ? "text-yellow-600"
                  : order.status === "completed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.status}
            </p>
          </div>

          <button
            onClick={() => handleCancel(order.id)}
            className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
          >
            <X size={16} />
            Cancel
          </button>
        </div>
      ))}

      {showModal && modalMessage && modalType && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === "success" && (
            <div className="w-100 h-12 flex justify-center items-center">
              <div className="w-[10%] flex justify-center items-center rounded-full bg-green-500 h-[83%]">
                <Check className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold">{modalMessage}</p>
              </div>
            </div>
          )}

          {modalType === "error" && (
            <div className="w-100 h-12 flex justify-center items-center">
              <div className="w-[10%] flex justify-center items-center rounded-full bg-red-500 h-[83%]">
                <X className="text-white" />
              </div>
              <div className="w-[85%] flex items-center ml-3 h-full">
                <p className="font-bold">{modalMessage}</p>
              </div>
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default OrdersCard;
