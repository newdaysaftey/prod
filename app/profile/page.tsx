"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Plus, Save, Edit2, X, LogOut } from "lucide-react";
import { getUserProfile, updateUserProfile } from "@/lib/FE/api";
import { PersonalInfo } from "@/components/molecules/profile/PersonalInfo";
import { AddressCard } from "@/components/molecules/profile/AddressCard";
import { AddressForm } from "@/components/molecules/profile/AddressForm";
import type {
  UserProfile,
  Address,
  UpdateUserProfile,
} from "@/lib/FE/types/user";
import { toast } from "sonner";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
  });

  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      setIsEditing(false);
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const [formData, setFormData] = useState<UserProfile | null>(null);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/signout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({})
      });
      
      if (response.ok) {
        toast.success("Logged out successfully");
        // Redirect to login page or home page after successful logout
        window.location.href = '/';
      } else {
        toast.error("Failed to logout");
      }
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const profile = formData || data?.data;

  const handleUpdate = (updates: Partial<UserProfile>) => {
    setFormData((prev) => ({ ...prev!, ...updates }));
  };

  const handleSave = () => {
    if (!formData) return;

    const updateData: UpdateUserProfile = {
      Username: formData.Username,
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      MiddleName: formData.MiddleName,
      Phone: Number(formData.Phone),
      Gender: formData.Gender,
      CountryCode: formData.CountryCode,
      ImageUrl: formData.ImageUrl,
      addresses: formData.addresses,
    };

    updateMutation.mutate(updateData);
  };

  const handleAddressSubmit = (address: Address) => {
    let updatedAddresses = editingAddress
      ? profile.addresses.map((a: { id: string }) =>
          a.id === address.id ? address : a
        )
      : [...profile.addresses, { ...address, id: Date.now().toString() }];

    // If the submitted address is marked as default, update other addresses
    if (address.isDefault) {
      updatedAddresses = updatedAddresses.map((a: { id: string }) => ({
        ...a,
        isDefault: a.id === (editingAddress?.id || address.id),
      }));
    }

    handleUpdate({ addresses: updatedAddresses });
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    const addressToDelete = profile.addresses.find(
      (a: { id: string }) => a.id === id
    );
    if (addressToDelete?.isDefault) {
      toast.error(
        "Cannot delete the default address. Please set another address as default first."
      );
      return;
    }

    const updatedAddresses = profile.addresses.map((a: { id: string }) =>
      a.id === id ? { ...a, isDeleted: true } : a
    );

    handleUpdate({ addresses: updatedAddresses });
    toast.success("Address deleted successfully");
  };

  const handleSetDefaultAddress = (id: string) => {
    const updatedAddresses = profile.addresses.map((a: { id: string }) => ({
      ...a,
      isDefault: a.id === id,
    }));

    handleUpdate({ addresses: updatedAddresses });
    toast.success("Default address updated");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex sm:flex-col items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (isEditing) {
                  handleSave();
                } else {
                  setFormData(profile);
                  setIsEditing(true);
                }
              }}
              className=" inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
            >
              {isEditing ? (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              ) : (
                <>
                  <Edit2 className="w-5 h-5" />
                  Edit Profile
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </motion.button>
          </div>
        </div>

        <div className="space-y-8">
          <PersonalInfo
            profile={profile}
            onUpdate={handleUpdate}
            isEditing={isEditing}
          />

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Addresses</h2>
              {isEditing && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setEditingAddress(null);
                    setShowAddressForm(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                >
                  <Plus className="w-5 h-5" />
                  Add Address
                </motion.button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.addresses
                .filter((a: { isDeleted: any }) => !a.isDeleted)
                .map((address: Address) => (
                  <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={(address) => {
                      setEditingAddress(address);
                      setShowAddressForm(true);
                    }}
                    onDelete={handleDeleteAddress}
                    onSetDefault={handleSetDefaultAddress}
                    isEditing={isEditing}
                  />
                ))}
            </div>
          </div>
        </div>

        {showAddressForm && (
          <AddressForm
            address={editingAddress || undefined}
            onSubmit={handleAddressSubmit}
            onCancel={() => {
              setShowAddressForm(false);
              setEditingAddress(null);
            }}
          />
        )}
      </div>
    </div>
  );
}