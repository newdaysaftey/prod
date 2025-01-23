"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, Shield } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Cart } from "@/lib/FE/types/cart";
import type { Address } from "@/lib/FE/types/user";
import type { PaymentMethod, PaymentStatus } from "@/lib/FE/types/order";
import { getAddresses, createOrder } from "@/lib/FE/api";

interface CartSummaryProps {
  cart: Cart;
}

const DELIVERY_FEE = 7.65;
const SERVICE_FEE = 1.2;

export function CartSummary({ cart }: CartSummaryProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("CARD");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: addressesData } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses = addressesData?.data || [];
  const defaultAddress = addresses.find((addr: Address) => addr.isDefault);

  // Set default address when data is loaded
  if (defaultAddress && !selectedAddressId) {
    setSelectedAddressId(defaultAddress.id);
  }

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order placed successfully!");
      // Redirect to orders page or show success screen
    },
    onError: () => {
      toast.error("Failed to place order");
      setIsProcessing(false);
    },
  });

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    setIsProcessing(true);

    const orderData = {
      totalAmount: cart.totalAmount,
      paymentStatus: "PENDING" as PaymentStatus,
      paymentMethod: selectedPaymentMethod,
      deliveryFee: DELIVERY_FEE,
      serviceFee: SERVICE_FEE,
      items: cart.cartItems.map((item) => ({
        productId: item.productId,
        colorId: item.colorId,
        sizeId: item.sizeId,
        quantity: item.quantity,
        priceAtTime: item.priceAtTime,
      })),
      shippingAddressId: selectedAddressId,
      billingAddressId: selectedAddressId, // Using same address for billing
    };

    orderMutation.mutate(orderData);
  };

  const total = cart.totalAmount + DELIVERY_FEE + SERVICE_FEE;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6"
    >
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        Order Summary
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">
            Subtotal ({cart.cartItems.length}{" "}
            {cart.cartItems.length === 1 ? "item" : "items"})
          </span>
          <span>${cart.totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Delivery Fee</span>
          <span>${DELIVERY_FEE.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Service Fee</span>
          <span>${SERVICE_FEE.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Delivery Address</h3>
          <select
            value={selectedAddressId}
            onChange={(e) => setSelectedAddressId(e.target.value)}
            className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <option value="">Select Address</option>
            {addresses.map((address: Address) => (
              <option key={address.id} value={address.id}>
                {address.street}, {address.city}{" "}
                {address.isDefault && "(Default)"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="font-medium mb-2">Payment Method</h3>
          <div className="space-y-2">
            {(["CARD", "ZELLE", "CASH"] as PaymentMethod[]).map((method) => (
              <label
                key={method}
                className="flex items-center gap-2 p-2 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={selectedPaymentMethod === method}
                  onChange={(e) =>
                    setSelectedPaymentMethod(e.target.value as PaymentMethod)
                  }
                  className="text-indigo-600"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Truck className="w-4 h-4" />
            <span>Free shipping on all orders</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secure payment processing</span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckout}
          disabled={isProcessing || cart.cartItems.length === 0}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              Proceed to Checkout
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
