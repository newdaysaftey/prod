"use client";

import { useState } from "react";
import { Order } from "@/lib/FE/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { UpdateOrderDialog } from "./UpdateOrderDialog";

interface AdminOrderListProps {
  orders: Order[];
  isLoading: boolean;
}

export function AdminOrderList({ orders, isLoading }: AdminOrderListProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="hidden sm:hidden -mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Order ID
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Customer
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Total
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Payment
                    </th>
                    <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.orderId.slice(0, 8)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {format(new Date(order.orderDate), "MMM d, yyyy")}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {order.shippingAddress.firstName}{" "}
                        {order.shippingAddress.lastName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        ${order.totalAmount.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <OrderStatusBadge status={order.status} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <OrderStatusBadge status={order.paymentStatus} />
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card view for mobile */}
        <div className="block sm:block space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border border-gray-300 rounded-lg shadow p-4 bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">
                  Order ID: {order.orderId.slice(0, 8)}
                </h3>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-indigo-600 text-sm font-medium hover:text-indigo-900"
                >
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Date: {format(new Date(order.orderDate), "MMM d, yyyy")}
              </p>
              <p className="text-sm text-gray-500">
                Customer: {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p className="text-sm text-gray-500">
                Total: ${order.totalAmount.toFixed(2)}
              </p>
              <div className="flex justify-between items-center mt-2">
                <OrderStatusBadge status={order.status} />
                <OrderStatusBadge status={order.paymentStatus} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <UpdateOrderDialog
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}
