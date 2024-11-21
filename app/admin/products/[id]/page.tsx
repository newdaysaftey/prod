"use client";

import { ProductView } from "@/components/molecules/productView";
import { useQuery } from "@tanstack/react-query";
import { getAdminProduct } from "@/lib/FE/api";

export default function ViewProduct({ params }: { params: { id: string } }) {
  const {
    data: productData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getAdminProduct(params.id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product data</div>;

  return <ProductView product={productData.data} />;
}
