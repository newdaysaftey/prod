"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RoleBasedContent } from "@/lib/FE/HOC/hoc";
import { useAuth } from "@/lib/FE/hooks/useAuth";
import Link from "next/link";
import {
  Menu,
  MapPin,
  Search,
  ShoppingCart,
  User,
  X,
  Globe,
  Settings,
  User2,
} from "lucide-react";
import { CategoriesDropdown } from "./categories-dropdown";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/lib/FE/api";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  return (
    <nav className="relative bg-background text-white z-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-blue-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center lg:flex-none mr-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-white rounded-md" />
              <span className="hidden text-xl font-bold lg:block">Store</span>
            </Link>
          </div>

          {/* Location (Hidden on mobile) */}

          {/* Categories Dropdown */}
          <CategoriesDropdown
            isOpen={isCategoriesOpen}
            onToggle={() => setIsCategoriesOpen(!isCategoriesOpen)}
          />

          {/* Search */}
          <div className="flex flex-1 items-center justify-center px-6">
            <div className="w-full max-w-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full rounded-md border-0 bg-white py-1.5 pl-4 pr-10 text-gray-900 focus:ring-2 focus:ring-blue-500"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {isLoading ? (
              <div className="h-5 w-5">
                <LoadingSpinner />
              </div>
            ) : !isAuthenticated ? (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-1 hover:text-gray-200"
              >
                <User className="h-5 w-5" />
                <span>Sign in</span>
              </Link>
            ) : null}
            <RoleBasedContent roles={["ADMIN"]}>
              <Link
                href={"/admin/"}
                className="flex justify-center items-center"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Link>
            </RoleBasedContent>
            {/* <button className="flex items-center space-x-1 hover:text-gray-200">
              <Globe className="h-5 w-5" />
              <span>EN</span>
            </button> */}
            <div className="hidden lg:flex items-center space-x-2 text-sm mr-4">
              <Link href={"/profile"} className="flex items-center space-x-2">
                <User></User>
                {/* <button className="hover:underline">Profile</button> */}
              </Link>
            </div>
            <Link
              href="/cart"
              className="flex items-center space-x-1 hover:text-gray-200"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg"
            >
              <div className="flex h-16 items-center justify-between px-4 border-b">
                <span className="text-xl font-bold text-gray-900">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="py-4">
                <div className="space-y-1 px-3">
                  {categories?.data?.data?.map((category) => (
                    <Link
                      key={category.Name}
                      href={"/products/?category=" + category.CategoryId}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                      {category.Name}
                    </Link>
                  ))}
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="space-y-1 px-3">
                    {!isAuthenticated && (
                      <Link
                        href="/auth/signin"
                        className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <User className="h-5 w-5" />
                        <span>Sign in</span>
                      </Link>
                    )}
                    <RoleBasedContent roles={["ADMIN"]}>
                      <Link
                        href={"/admin/"}
                        className="flex items-center space-x-2 px-3 py-2  text-base font-medium text-gray-900 hover:bg-gray-100"
                      >
                        <Settings className=" h-5 w-5 text-black" />
                        <span className="text-black">Admin</span>
                      </Link>
                    </RoleBasedContent>
                    <Link
                      href="/cart"
                      className="flex items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100"
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>Cart</span>
                    </Link>
                    <button className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100">
                      <Globe className="h-5 w-5" />
                      <span>Language: EN</span>
                    </button>
                    <button className="flex w-full items-center space-x-2 rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-100">
                      <MapPin className="h-5 w-5" />
                      <span>Update Location</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
