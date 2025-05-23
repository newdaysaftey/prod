import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <section className="bg-lightBlue h-[480px] sm:h-[350px] relative">
      <div className="w-[80%] sm:w-[90%] mx-auto h-[100%] flex flex-row ">
        <div className="w-[60%] sm:w-[90%] flex flex-col   pt-[120px] sm:pt-[70px] ">
          <p className=" sm:text-[28px] sm:text-red text-white text-[48px] font-[600]">
            Stay Safe and Save Big:
          </p>
          <p className="text-[40px] sm:text-[20px] text-white font-[600]">
            Enjoy 30% Off All Safety Gear!
          </p>
          <Link href={"/products"}>
            <button className="h-[64px] w-[154px] bg-background text-white rounded-[15px] mt-8">
              Explore now
            </button>
          </Link>
        </div>
        <div className="w-[40%] relative  mt-[60px] sm:hidden">
          <Image
            src={"/images/images/3.webp"}
            width={256}
            height={256}
            alt="Img"
            className="absolute top-20 left-[60%] rounded-[100%] w-[256px] h-[256px] object-cover"
          ></Image>
          <Image
            src={"/images/images/1.jfif"}
            width={256}
            height={256}
            alt="Img"
            className="absolute top-0 left-[30%] rounded-[100%] w-[256px] h-[256px] object-cover"
          ></Image>

          <Image
            src={"/images/images/2.jfif"}
            width={256}
            height={256}
            alt="Img"
            className="absolute top-20 rounded-[100%] w-[256px] h-[256px] object-cover"
          ></Image>
        </div>
      </div>
    </section>
  );
};

export default Hero;
