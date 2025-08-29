import React, { useState, useMemo, useEffect } from "react";
import Icon from "../../../../../../watch-store/src/components/Icon";
import Button from "../../../../../../watch-store/src/components/elements/Button";

const OrderStatusTable = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error("Erreur fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Erreur serveur");

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      setEditingOrderId(null);
      setNewStatus("");
    } catch (err) {
      console.error("Erreur update:", err);
    }
  };

  const sortedOrders = useMemo(() => {
    if (!sortConfig.key) return orders;
    return [...orders].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [orders, sortConfig]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    setSelectedOrders(
      selectedOrders.length === orders.length ? [] : orders.map((o) => o._id)
    );
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "Package";
      case "processing":
        return "Clock";
      case "shipped":
        return "Truck";
      case "delivered":
        return "CheckCircle";
      default:
        return "Package";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "processing":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "shipped":
        return "text-purple-600 bg-purple-50 border-purple-200";
      case "delivered":
        return "text-green-600 bg-green-50 border-green-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  if (loading) {
    return <p className="p-4 text-muted-foreground">Loading orders...</p>;
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            Aperçu du statut des commandes 
          </h3>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
            <Button variant="outline" size="sm" iconName="Filter">
              Filter
            </Button>
          </div>
        </div>

        {selectedOrders.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <span className="text-sm text-blue-800">
              {selectedOrders.length} order
              {selectedOrders.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                Update Status
              </Button>
              <Button variant="outline" size="sm">
                Send Notification
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={
                    selectedOrders.length === orders.length && orders.length > 0
                  }
                  onChange={handleSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th
                className="text-left p-4 cursor-pointer"
                onClick={() => handleSort("_id")}
              >
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">Commande ID</span>
                  <Icon name="ArrowUpDown" size={14} />
                </div>
              </th>
              <th className="text-left p-4">Client</th>
              <th className="text-left p-4">Montant</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-border hover:bg-muted/50"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order._id)}
                    onChange={() => handleSelectOrder(order._id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4 text-sm font-medium">{order._id}</td>
                <td className="p-4">
                  {order.customer ? (
                    <div>
                      <p className="text-sm font-medium">
                        {order.customer.firstName} {order.customer.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.customer.email}
                      </p>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">Unknown</span>
                  )}
                </td>

                <td className="p-4 text-sm font-medium">
                  {order.totalAmount.toLocaleString()} MAD
                </td>

                <td className="p-4">
                  {editingOrderId === order._id ? (
                    <div className="flex items-center gap-2">
                      <select
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="p-1 rounded bg-gray-100 border text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <Button
                        onClick={() => updateOrderStatus(order._id)} variant="primary" size="sm"
                      >
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditingOrderId(null)} variant="secondary" size="sm"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div
                      className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <Icon name={getStatusIcon(order.status)} size={14} />
                      <span className="text-sm font-medium">
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  )}
                </td>

                <td className="p-4 text-sm text-muted-foreground">
                  {new Date(order.createdAt).toLocaleString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>

                <td className="p-4 flex gap-2">
                  <Button
                    onClick={() => {
                      setEditingOrderId(order._id);
                      setNewStatus(order.status);
                    }}
                    variant="ghost" size="sm" iconName="Edit"
                  >
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Trash">
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderStatusTable;
