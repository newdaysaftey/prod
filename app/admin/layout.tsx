"use client";

import { useAuth } from "@/lib/FE/hooks/useAuth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import {
  Package,
  Tags,
  Layout,
  Home,
  Menu,
  X,
  ShoppingBag,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { hasRole, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("products"); // Default active tab
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    // Extract the last segment of the path
    const pathSegments = pathname.split("/");
    const currentTab = pathSegments[pathSegments.length - 1];

    // Update active tab if it matches expected routes
    if (["products", "tags", "categories", "orders"].includes(currentTab)) {
      setActiveTab(currentTab);
    }
  }, [pathname]);

  if (isLoading) {
    return null;
  }

  if (!hasRole("ADMIN")) {
    redirect("/");
  }

  // Active tab styles
  const activeStyle = "text-blue-600 font-bold border-b-2 border-blue-600";
  const inactiveStyle = "text-gray-600 hover:text-gray-800";

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex  justify-between h-20 items-center sm:flex-col sm:items-start sm:pt-4 sm:h-24">
            {/* Home Link */}
            <div className="flex items-center">
              <Home className="h-6 w-6" />
              <span className="ml-2 font-semibold hidden sm:inline">
                Admin Panel
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="sm:hidden flex space-x-8 items-center justify-center sm:pb-2 ">
              <Link
                href="/admin/products"
                onClick={() => setActiveTab("products")}
                className={`flex items-center ${
                  activeTab === "products" ? activeStyle : inactiveStyle
                }`}
              >
                <Package className="mr-2 h-6 w-6" />
                <span>Products</span>
              </Link>
              <Link
                href="/admin/categories"
                onClick={() => setActiveTab("categories")}
                className={`flex items-center ${
                  activeTab === "categories" ? activeStyle : inactiveStyle
                }`}
              >
                <Layout className="mr-2 h-6 w-6" />
                <span>Categories</span>
              </Link>
              <Link
                href="/admin/tags"
                onClick={() => setActiveTab("tags")}
                className={`flex items-center ${
                  activeTab === "tags" ? activeStyle : inactiveStyle
                }`}
              >
                <Tags className="mr-2 h-6 w-6" />
                <span>Tags</span>
              </Link>
              <Link
                href="/admin/orders"
                onClick={() => setActiveTab("orders")}
                className={`flex items-center ${
                  activeTab === "orders" ? activeStyle : inactiveStyle
                }`}
              >
                <ShoppingBag className="mr-2 h-6 w-6" />
                <span>Orders</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <div className="flex gap-2">
                    <Menu className="h-6 w-6" />
                    <p>Admin pages</p>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className=" absolute left-0 right-0 bg-white shadow-lg">
              <div className="px-4 pt-2 pb-3 space-y-2">
                <Link
                  href="/admin/products"
                  onClick={() => {
                    setActiveTab("products");
                    toggleMobileMenu();
                  }}
                  className={`block py-2 ${
                    activeTab === "products" ? activeStyle : inactiveStyle
                  }`}
                >
                  <div className="flex items-center">
                    <Package className="mr-2 h-6 w-6" />
                    <span>Products</span>
                  </div>
                </Link>
                <Link
                  href="/admin/categories"
                  onClick={() => {
                    setActiveTab("categories");
                    toggleMobileMenu();
                  }}
                  className={`block py-2 ${
                    activeTab === "categories" ? activeStyle : inactiveStyle
                  }`}
                >
                  <div className="flex items-center">
                    <Layout className="mr-2 h-6 w-6" />
                    <span>Categories</span>
                  </div>
                </Link>
                <Link
                  href="/admin/tags"
                  onClick={() => {
                    setActiveTab("tags");
                    toggleMobileMenu();
                  }}
                  className={`block py-2 ${
                    activeTab === "tags" ? activeStyle : inactiveStyle
                  }`}
                >
                  <div className="flex items-center">
                    <Tags className="mr-2 h-6 w-6" />
                    <span>Tags</span>
                  </div>
                </Link>
                <Link
                  href="/admin/orders"
                  onClick={() => {
                    setActiveTab("orders");
                    toggleMobileMenu();
                  }}
                  className={`block py-2 ${
                    activeTab === "orders" ? activeStyle : inactiveStyle
                  }`}
                >
                  <div className="flex items-center">
                    <ShoppingBag className="mr-2 h-6 w-6" />
                    <span>Orders</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 sm:px-0 lg:px-8 mt-6">
        <div className="bg-white shadow rounded-lg p-4 sm:p-0">{children}</div>
      </div>
    </div>
  );
}
