import Image from "next/image";
import { Dropdown } from "primereact/dropdown";

import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import { MapPin, ShoppingCartIcon } from "lucide-react";

const Navbar = () => {
  const dropDownValues = [{ name: "sleeves" }, { name: "hats" }];
  return (
    <div className="bg-background h-[72px] flex  items-center justify-evenly md:justify-start md:pl-2 md:justify-between md:pr-2">
      <div className="relative">
        <Image
          src={"/images/icon.png"}
          alt="icon"
          height={43}
          width={117}
        ></Image>
      </div>
      <div className="flex items-center justify-between gap-2 text-secondary md:hidden ">
        {/* <i
          className="pi pi-map-marker items-center "
          style={{ fontSize: "32px" }}
        ></i> */}
        <MapPin></MapPin>
        <div>
          <p className="text-[12px] font-[500]">Delivering to New York 10001</p>
          <p className="text-[16px] font-[600]">Update Location</p>
        </div>
      </div>

      <Dropdown
        options={dropDownValues}
        optionLabel="name"
        placeholder="Categories"
        className="text-white flex items-center gap-[5px] p-dropdown md:hidden"
        panelStyle={{
          backgroundColor: "white",
          color: "grey",
          gap: "10px",
          padding: "5px",
          border: "1px solid grey",
          borderRadius: "10px",
        }}
      ></Dropdown>
      <div className="rounded-[10px] px-2 py-2 w-[45%] md:hidden">
        <IconField className="text-white bg-[white] gap-[5px] px-2 py-2   rounded-[10px]">
          <InputText
            placeholder="Search"
            className="w-[98%] text-black border border-transparent focus-visible:border-white peer outline-none"
          />
          <InputIcon className="pi pi-search text-[grey]"> </InputIcon>
        </IconField>
      </div>
      <div className="flex text-white flex-col md:hidden">
        <p className="text-[12px] font-[400] ">Sign in / Register</p>
        <p className="text-[16px] font-[600]">Orders & Account</p>
      </div>

      <div className="md:hidden">
        <i
          className=" pi pi-shopping-cart  text-white  "
          style={{ fontSize: "32px" }}
        ></i>
      </div>

      <div className="sm:visible md:visible lg:hidden">
        {/* <i
          className=" pi pi-bars  text-white  "
          style={{ fontSize: "32px" }}
        ></i> */}
        <ShoppingCartIcon></ShoppingCartIcon>
      </div>
    </div>
  );
};

export default Navbar;
