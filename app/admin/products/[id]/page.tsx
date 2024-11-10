import { ProductView } from "@/components/molecules/productView";

export default function ViewProduct({ params }: { params: { id: string } }) {
  return <ProductView id={params.id} />;
}

export async function generateStaticParams() {
  // Replace this with logic to get all possible product IDs
  const productIds = ["1", "2", "3"]; // Example IDs; replace with actual IDs from your data source

  return productIds.map((id) => ({
    id: id,
  }));
}
