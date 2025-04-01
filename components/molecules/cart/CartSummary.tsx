"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, CreditCard, Truck, Shield } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Cart } from "@/lib/FE/types/cart";
import type { Address } from "@/lib/FE/types/user";
import type { PaymentMethod, PaymentStatus } from "@/lib/FE/types/order";
import {
  getAddresses,
  createOrder,
  addAddress,
  handleImageUpload,
} from "@/lib/FE/api";

interface CartSummaryProps {
  cart: Cart;
}

const DELIVERY_FEE = 7.65;
const SERVICE_FEE = 1.2;

// Define a type for the uploaded image state
interface UploadedImage {
  file: File;
  preview: string;
  isUploading: boolean;
  uploadedUrl?: string;
}

export function CartSummary({ cart }: CartSummaryProps) {
  // Payment and checkout related states
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>("ZELLE");
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  // Replace single file state with an array for multiple files
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  // Create a ref for the file input to clear its value when needed
  const fileInputRef = useRef<HTMLInputElement>(null);

  // States for adding a new address when none exist
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const { data: addressesData, refetch } = useQuery({
    queryKey: ["addresses"],
    queryFn: getAddresses,
  });

  const addresses: Address[] = addressesData?.data || [];
  const defaultAddress = addresses.find((addr: Address) => addr.isDefault);

  // Set default address when data is loaded and not already selected
  if (defaultAddress && !selectedAddressId) {
    setSelectedAddressId(defaultAddress.id);
  }

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Stop processing and show on-screen success message
      setIsProcessing(false);
      setOrderSuccess(true);
      window.location.href = "/orders";
    },
    onError: () => {
      toast.error("Failed to place order");
      setIsProcessing(false);
    },
  });

  // Handle file input changes for the payment screenshot(s)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // Create new UploadedImage objects with preview URLs and mark them as uploading
      const newImages: UploadedImage[] = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        isUploading: true,
      }));
      // Append new images to the state
      setUploadedImages((prev) => [...prev, ...newImages]);

      try {
        // Upload all files at once (assuming your API supports multiple file uploads)
        const imageUrls = await handleImageUpload(files);
        // Update each corresponding image with the returned URL and mark as not uploading
        setUploadedImages((prev) => {
          const updated = [...prev];
          // Update the last `files.length` images (assuming they match the order)
          const startIndex = updated.length - files.length;
          for (let i = 0; i < files.length; i++) {
            updated[startIndex + i] = {
              ...updated[startIndex + i],
              isUploading: false,
              uploadedUrl: imageUrls[i],
            };
          }
          return updated;
        });
      } catch (error) {
        toast.error("Image upload failed");
        // Remove the images that failed to upload
        setUploadedImages((prev) => prev.slice(0, prev.length - files.length));
      }
    }
  };

  // Remove an uploaded image by index and clear the file input if none remain
  const removeImage = (index: number) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      if (updated.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return updated;
    });
  };

  // Handle submission of the add address form
  const handleAddressSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const addressToAdd = {
        ...newAddress,
        isDefault: addresses.length === 0,
      };
      await addAddress(addressToAdd);
      toast.success("Address added successfully!");
      refetch(); // Refresh the addresses list
      setIsAddingAddress(false);
    } catch (error) {
      toast.error("Failed to add address");
    }
  };

  // Handle checkout submission
  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select a delivery address");
      return;
    }

    // For Zelle payments, ensure at least one screenshot is provided
    if (selectedPaymentMethod === "ZELLE" && uploadedImages.length === 0) {
      toast.error("Please upload a screenshot of your payment");
      return;
    }

    const isAnyImageUploading = uploadedImages.some((img) => img.isUploading);
    if (isAnyImageUploading) {
      toast.error("Please wait until all images have finished uploading");
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
        id: item.id,
      })),
      shippingAddressId: selectedAddressId,
      billingAddressId: selectedAddressId,
      paymentProof: uploadedImages.map((img) => img.uploadedUrl),
    };

    orderMutation.mutate(orderData);
  };

  const total = cart.totalAmount + DELIVERY_FEE + SERVICE_FEE;
  const isAnyImageUploading = uploadedImages.some((img) => img.isUploading);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6"
    >
      {/* Show on-screen success message if order is successful */}
      {orderSuccess && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          Payment succeeded! Once your order is confirmed by our team, you'll
          receive an email confirming your order. You can keep browsing and
          shopping.
        </div>
      )}

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
        <h3 className="font-medium mb-2">Delivery Address</h3>
        {addresses.length > 0 ? (
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
        ) : (
          <div className="space-y-2">
            <p>No addresses found. Please add an address.</p>
            <button
              onClick={() => setIsAddingAddress(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Address
            </button>
          </div>
        )}

        {/* Add address form */}
        {isAddingAddress && (
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Add New Address</h3>
            <form onSubmit={handleAddressSubmit} className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="First Name"
                  value={newAddress.firstName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, firstName: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={newAddress.lastName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, lastName: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Street"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                className="w-full p-2 border rounded"
                required
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Country"
                  value={newAddress.country}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, country: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Pincode"
                  value={newAddress.pincode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, pincode: e.target.value })
                  }
                  className="w-1/2 p-2 border rounded"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save Address
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingAddress(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h3 className="font-medium mb-2">Payment Method</h3>
          <div className="space-y-2">
            {(["ZELLE"] as PaymentMethod[]).map((method) => (
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

        {/* Conditionally show the QR image, file input, and preview for ZELLE */}
        {selectedPaymentMethod === "ZELLE" && (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Zelle Payment QR Code</h3>
              <img
                src="/images/images/qr.jpeg"
                alt="Zelle QR Code"
                width={254}
                height={254}
                className="object-contain"
              />
            </div>
            <div>
              <h3 className="font-medium mb-2">Upload Payment Screenshot</h3>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="w-full p-2 border border-gray-200 dark:border-gray-700 rounded-lg"
              />
              {uploadedImages.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-2">
                  {uploadedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={img.preview}
                        alt={`Uploaded ${index}`}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                      {img.isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs">
                          Uploading...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

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
          disabled={
            isProcessing || cart.cartItems.length === 0 || isAnyImageUploading
          }
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : selectedPaymentMethod === "ZELLE" ? (
            "Confirm Payment"
          ) : (
            "Proceed to Checkout"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
