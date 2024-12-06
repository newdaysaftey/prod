"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import type { Address } from "@/lib/FE/types/user";

interface AddressFormProps {
  address?: Address;
  onSubmit: (address: Address) => void;
  onCancel: () => void;
}

export function AddressForm({ address, onSubmit, onCancel }: AddressFormProps) {
  const [formData, setFormData] = useState<Address>(
    address || {
      id: "",
      firstName: "",
      lastName: "",
      street: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      isDefault: false,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {address ? "Edit Address" : "Add New Address"}
            </h2>
            <button
              onClick={onCancel}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Street Address
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="isDefault" className="text-sm font-medium">
                Set as default address
              </label>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-600 rounded-lg"
              >
                {address ? "Update Address" : "Add Address"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
