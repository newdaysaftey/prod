"use client";

import { useQuery } from "@tanstack/react-query";
import { getOrders } from "@/lib/FE/api";
import { AdminOrderList } from "@/components/molecules/orders/OrderList";

export default function AdminOrdersPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: getOrders,
  });

  if (error) {
    return <div className="text-red-500">Error loading orders</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminOrderList orders={data?.data || []} isLoading={isLoading} />
    </div>
  );
}
