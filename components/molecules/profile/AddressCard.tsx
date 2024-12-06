"use client";

import { motion } from "framer-motion";
import { MapPin, Trash2, Star } from "lucide-react";
import type { Address } from "@/lib/FE/types/user";

interface AddressCardProps {
  address: Address;
  onEdit: (address: Address) => void;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
  isEditing: boolean;
}

export function AddressCard({
  address,
  onEdit,
  onDelete,
  onSetDefault,
  isEditing,
}: AddressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm
        ${
          address.isDefault
            ? "ring-2 ring-indigo-500"
            : "border border-gray-200 dark:border-gray-700"
        }
      `}
    >
      {address.isDefault && (
        <span className="absolute top-2 right-2 text-indigo-500">
          <Star className="w-5 h-5 fill-current" />
        </span>
      )}

      <div className="flex items-start gap-3">
        <MapPin className="w-5 h-5 text-gray-400 mt-1" />
        <div className="flex-1">
          <div className="font-medium">
            {address.firstName} {address.lastName}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {address.street}
            <br />
            {address.city}, {address.state}
            <br />
            {address.country}, {address.pincode}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-4 flex items-center justify-end gap-2">
          {!address.isDefault && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSetDefault(address.id)}
              className="text-sm text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Set as Default
            </motion.button>
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onEdit(address)}
            className="text-sm text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            Edit
          </motion.button>
          {!address.isDefault && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDelete(address.id)}
              className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              <Trash2 className="w-4 h-4" />
            </motion.button>
          )}
        </div>
      )}
    </motion.div>
  );
}
