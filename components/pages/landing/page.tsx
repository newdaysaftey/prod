import Navbar from "@/components/molecules/navbar";
import Hero from "@/components/molecules/heroLanding";
import ProductCard from "@/components/molecules/productCard";
import DealHeading from "@/components/molecules/dealsHeading";
import Footer from "@/components/molecules/footer";
import ContactForm from "@/components/molecules/contactForm";
const Landing = () => {
  return (
    <section className="bg-tert w-[100%] overscroll-x-none overflow-x-hidden">
      <Navbar></Navbar>
      <Hero></Hero>
      <br />
      <section className="w-[80%] sm:w-[90%] mx-auto bg-tert">
        <DealHeading
          Heading="Hot Deals"
          subHeading="Limited Time offer"
        ></DealHeading>
      </section>
      <div className=" bg-tert pt-10 w-[100%]">
        <div className="w-[80%] sm:w-[95%]  mx-auto sm:gap-y-6 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  bg-tert">
          <ProductCard
            title="Silver Safety Jacket - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948898/products/Product_images/71cd967d-8870-4f8a-acc5-4a4b1de8f295-1731948894062.jpg.webp"
            rating={3.5}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Helmet - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948896/products/Product_images/87b81f85-d1a3-47f0-9713-c93d91c68e53-1731948894071.jpg.jpg"
            rating={4}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Jacket - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948898/products/Product_images/71cd967d-8870-4f8a-acc5-4a4b1de8f295-1731948894062.jpg.webp"
            rating={3.5}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Helmet - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948896/products/Product_images/87b81f85-d1a3-47f0-9713-c93d91c68e53-1731948894071.jpg.jpg"
            rating={4}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
        </div>
      </div>
      <section className="mt-20 w-[80%] sm:w-[90%] mx-auto bg-tert">
        <DealHeading Heading="Best Sellers" subHeading={""}></DealHeading>
      </section>
      <div className=" bg-tert pt-10 ">
        <div className="w-[80%] sm:w-[95%] gap-y-6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  bg-tert">
          <ProductCard
            title="Silver Safety Jacket - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948898/products/Product_images/71cd967d-8870-4f8a-acc5-4a4b1de8f295-1731948894062.jpg.webp"
            rating={3.5}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Helmet - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948896/products/Product_images/87b81f85-d1a3-47f0-9713-c93d91c68e53-1731948894071.jpg.jpg"
            rating={4}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Jacket - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948898/products/Product_images/71cd967d-8870-4f8a-acc5-4a4b1de8f295-1731948894062.jpg.webp"
            rating={3.5}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
          <ProductCard
            title="Silver Safety Helmet - Reflective, Lightweight, Waterproof, and Breathable"
            image="https://res.cloudinary.com/daunghoty/image/upload/v1731948896/products/Product_images/87b81f85-d1a3-47f0-9713-c93d91c68e53-1731948894071.jpg.jpg"
            rating={4}
            reviews={3654}
            price={105}
            mrp={150}
            discount={30}
            deliveryDate="Thu, 7 Nov"
            deliveryTime="7:00am - 9:00pm"
          />
        </div>
      </div>
      <section className="mt-20 w-[100%] mx-auto bg-tert">
        <DealHeading
          Heading="Contact Us"
          subHeading={""}
          noRadius={true}
        ></DealHeading>
      </section>
      <ContactForm></ContactForm>
      <Footer></Footer>
    </section>
  );
};
export default Landing;
