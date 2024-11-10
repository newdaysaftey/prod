import { ProductForm } from "@/components/molecules/ProductForm/ProductForm";

export async function generateStaticParams() {
  // Replace this with logic to get all possible product IDs
  const productIds = ["1", "2", "3"]; // Example IDs; replace with actual IDs from your data source

  return productIds.map((id) => ({
    id: id,
  }));
}

export default function EditProduct({ params }: { params: { id: string } }) {
  return <ProductForm id={params.id} />;
}
