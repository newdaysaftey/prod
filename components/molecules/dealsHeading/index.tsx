import React from "react";
import Image from "next/image";

const DealHeading: React.FC<{
  Heading: string;
  subHeading: string;
  noRadius?: boolean;
}> = ({
  Heading,
  subHeading,
  noRadius = false,
}: {
  Heading: string;
  subHeading: string;
  noRadius?: boolean;
}) => {
  return (
    <section
      className={`bg-lightBlue  h-[80px] sm:h-[120px] flex items-center justify-center relative ${
        noRadius ? "" : "rounded-3xl sm:rounded-lg "
      } `}
    >
      <Image
        src={"/images/images/Group1.png"}
        height={89}
        width={71}
        className="absolute left-0 sm:top-0"
        alt={""}
      ></Image>
      <Image
        src={"/images/images/Group2.png"}
        height={89}
        width={71}
        className="absolute left-[45px] sm:left-[10px] bottom-0"
        alt={""}
      ></Image>
      <Image
        src={"/images/images/Group3.png"}
        height={89}
        width={71}
        className="absolute right-2 top-1"
        alt={""}
      ></Image>
      <Image
        src={"/images/images/Group4.png"}
        height={89}
        width={71}
        className="absolute right-[80px] bottom-0 sm:right-0"
        alt={""}
      ></Image>

      <div className="flex items-center justify-center gap-3 sm:flex-col">
        <h1 className="text-[36px] text-white font-500  sm:text-[24px]">
          {Heading}
        </h1>
        <p className="text-[16px] text-white font-500  sm:text-[16px]">
          {subHeading}
        </p>
      </div>
    </section>
  );
};
export default DealHeading;
