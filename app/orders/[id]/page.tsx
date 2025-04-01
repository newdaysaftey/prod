"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrderDetails } from "@/lib/FE/api";
import { format } from "date-fns";
import { ArrowLeft, Package2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function OrderDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", params.id],
    queryFn: () => getOrderDetails(params.id),
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
        <div className="text-red-500">Error loading order details</div>
      </div>
    );
  }

  const order = data?.data;

  if (!order) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/orders"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="flex items-center gap-3 mb-8">
        <Package2 className="h-8 w-8" />
        <h1 className="text-3xl font-bold">Order Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-sm text-gray-500">
              Order placed {format(new Date(order.orderDate), "MMMM d, yyyy")}
            </p>
            <p className="text-sm text-gray-500">
              Order #{order.orderId.slice(0, 8)}
            </p>
          </div>
          <div>
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

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-semibold text-lg mb-4">Shipping Address</h2>
            <div className="text-gray-600">
              <p>
                {order.shippingAddress.firstName}{" "}
                {order.shippingAddress.lastName}
              </p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                {order.shippingAddress.pincode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
            <div className="space-y-2 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${order.subTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${order.deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>${order.serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-black pt-2 border-t">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-semibold text-lg mb-6">Order Items</h2>
        <div className="space-y-6">
          {order.orderItems.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 pb-6 border-b last:border-b-0 last:pb-0"
            >
              <img
                src={item.Color?.Images[0]}
                alt={item.Product?.Name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{item.Product?.Name}</h3>
                <p className="text-sm text-gray-500">
                  {item.Product?.Description}
                </p>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>Color: {item.Color?.ColorName}</p>
                  <p>Size: {item.Size?.Size}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ${(item.priceAtTime * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  ${item.priceAtTime.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>
        {order.paymentProof?.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="font-semibold text-lg mb-6">Payment Proof</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {order.paymentProof.map((imgUrl, idx) => (
                <img
                  key={idx}
                  src={imgUrl}
                  width={254}
                  height={254}
                  alt={`Payment Proof ${idx + 1}`}
                  className=" h-64 object-cover rounded border cursor-pointer"
                  onClick={() => setSelectedImage(imgUrl)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded-lg max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="mb-4 text-gray-500 hover:text-gray-700 float-right"
            >
              ✕
            </button>
            <img
              src={selectedImage}
              alt="Payment Proof Full View"
              className="w-full h-auto max-h-[80vh] object-contain mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
