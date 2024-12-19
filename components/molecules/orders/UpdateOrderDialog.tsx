"use client";

import { useState } from "react";
import { updateOrderPaymentStatus } from "@/lib/FE/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/lib/FE/types/order";

interface UpdateOrderDialogProps {
  order: Order | null;
  onClose: () => void;
}

export function UpdateOrderDialog({ order, onClose }: UpdateOrderDialogProps) {
  const [status, setStatus] = useState<string>("");
  const queryClient = useQueryClient();

  const updatePaymentStatus = useMutation({
    mutationFn: (paymentStatus: string) =>
      updateOrderPaymentStatus(order?.orderId || "", paymentStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      onClose();
    },
  });

  if (!order) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[35%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md  rounded-lg bg-white p-6 shadow-xl"
        >
          <h2 className="text-lg font-semibold mb-4">Update Order Status</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Order ID: {order.orderId.slice(0, 8)}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Payment Status: {order.paymentStatus}
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Payment Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="">Select status</option>
                <option value="PENDING">Pending</option>
                <option value="PAID">Paid</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              onClick={() => status && updatePaymentStatus.mutate(status)}
              disabled={!status || updatePaymentStatus.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {updatePaymentStatus.isPending ? "Updating..." : "Update"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
