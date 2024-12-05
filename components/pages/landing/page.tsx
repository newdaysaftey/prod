import Hero from "@/components/molecules/heroLanding";
import ProductCard from "@/components/molecules/productCard";
import DealHeading from "@/components/molecules/dealsHeading";
import ContactForm from "@/components/molecules/contactForm";
import { ProductList } from "@/components/molecules/products/ProductList";

const Landing = () => {
  return (
    <section className="bg-tert w-[100%] overscroll-x-none overflow-x-hidden">
      <Hero></Hero>
      <br />
      <section className="w-[80%] sm:w-[90%] mx-auto bg-tert">
        <DealHeading
          Heading="Hot Deals"
          subHeading="Limited Time offer"
        ></DealHeading>
      </section>
      <div className=" bg-tert pt-10 w-[100%]">
        <ProductList pageSize={12} tags="Discount" />
      </div>
      <section className="mt-20 w-[80%] sm:w-[90%] mx-auto bg-tert">
        <DealHeading Heading="Best Sellers" subHeading={""}></DealHeading>
      </section>
      <div className=" bg-tert pt-10 ">
        <ProductList pageSize={12} tags="Best Sellers" />
      </div>
      <section className="mt-20 w-[100%] mx-auto bg-tert">
        <DealHeading
          Heading="Contact Us"
          subHeading={""}
          noRadius={true}
        ></DealHeading>
      </section>
      <ContactForm></ContactForm>
    </section>
  );
};
export default Landing;
