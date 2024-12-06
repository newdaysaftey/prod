"use client";

import { User, Phone, Mail } from "lucide-react";
import type { UserProfile } from "@/lib/FE/types/user";

interface PersonalInfoProps {
  profile: UserProfile;
  onUpdate: (data: Partial<UserProfile>) => void;
  isEditing: boolean;
}

export function PersonalInfo({
  profile,
  onUpdate,
  isEditing,
}: PersonalInfoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onUpdate({ [name]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <User className="w-5 h-5 text-indigo-500" />
        Personal Information
      </h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              First Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="FirstName"
                value={profile.FirstName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">
                {profile.FirstName || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Middle Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="MiddleName"
                value={profile.MiddleName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">
                {profile.MiddleName || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Last Name
            </label>
            {isEditing ? (
              <input
                type="text"
                name="LastName"
                value={profile.LastName || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">
                {profile.LastName || "-"}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </div>
            </label>
            {isEditing ? (
              <input
                type="tel"
                name="Phone"
                value={profile.Phone || ""}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            ) : (
              <p className="text-gray-900 dark:text-gray-100">
                {profile.Phone || "-"}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </div>
            </label>
            <p className="text-gray-900 dark:text-gray-100">{profile.Email}</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              name="Gender"
              value={profile.Gender || ""}
              onChange={(e) => onUpdate({ Gender: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </select>
          ) : (
            <p className="text-gray-900 dark:text-gray-100">
              {profile.Gender === "m"
                ? "Male"
                : profile.Gender === "f"
                ? "Female"
                : profile.Gender === "o"
                ? "Other"
                : "-"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
