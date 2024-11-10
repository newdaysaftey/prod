import Navbar from "@/components/molecules/navbar";
import Hero from "@/components/molecules/heroLanding";
import { ProductForm } from "@/components/molecules/ProductForm/ProductForm";
import { ProductList } from "@/components/molecules/listView";
const First = () => {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <ProductForm></ProductForm>
      {/* <ProductList></ProductList> */}
    </>
  );
};
export default First;
