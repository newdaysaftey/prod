"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/FE/api";
import Link from "next/link";
import { format } from "date-fns";
import { Package2, ArrowRight } from "lucide-react";

export default function OrdersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">Error loading orders</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-[75vh]">
      <div className="flex items-center gap-3 mb-8">
        <Package2 className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Your Orders</h1>
      </div>

      <div className="grid gap-6">
        {data?.data.map((order) => (
          <Link
            href={`/orders/${order.orderId}`}
            key={order.orderId}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Order placed{" "}
                    {format(new Date(order.orderDate), "MMMM d, yyyy")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Order #{order.orderId.slice(0, 8)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      order.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {order.orderItems.length} items
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: ${order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2">
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-16 h-16 relative"
                    >
                      <img
                        src={item?.Color?.Images[0]}
                        alt={item?.Product?.Name}
                        className="w-full h-full object-cover rounded"
                      />
                      <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
