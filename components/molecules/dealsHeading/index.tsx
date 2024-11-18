import React from "react"
import Image from "next/image";

const DealHeading:React.FC<{Heading:string,subHeading:string,noRadius?:boolean}> = ({Heading,subHeading,noRadius=false}:{Heading:string,subHeading:string,noRadius?:boolean}) => {
    return <section  className={`bg-lightBlue  h-[80px] flex items-center justify-center relative ${noRadius?"":"rounded-3xl"} ` }>
        <Image src={"/images/images/Group1.png"} height={89} width={71} className="absolute left-0" alt={""}></Image>
        <Image src={"/images/images/Group2.png"} height={89} width={71} className="absolute left-[45px] bottom-0" alt={""}></Image>
        <Image src={"/images/images/Group3.png"} height={89} width={71} className="absolute right-2 top-1" alt={""}></Image>
        <Image src={"/images/images/Group4.png"} height={89} width={71} className="absolute right-[80px] bottom-0" alt={""}></Image>

        <div  className="flex items-center justify-center gap-3 ">
            <h1 className="text-[36px] text-white font-500">{Heading}</h1>
            <p className="text-[16px] text-white font-500">{subHeading}</p>
        </div>
    </section>
}
export default DealHeading;