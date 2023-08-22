import React from "react";
import { CustomerCard } from "./card";
import Navbar from "../pages/Navbar"
import Navbarlist from "../pages/Navbar2";
export const Customer = () => {
  return (
    <>
    <Navbar/>
    {/* <Navbarlist/> */}
     
              <div className="gap-6  grid grid-cols-2 lg:grid-cols-4 items-center justify-center lg:h-screen sm:min-h-screen py-10">
        <CustomerCard
          cardName="add-customer"
          img="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg"
          />
        <CustomerCard
          cardName="view-customer"
          img="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CustomerCard
          cardName="transactions"
          img="https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CustomerCard
          cardName="cash-withdraw"
          img="https://images.pexels.com/photos/4475523/pexels-photo-4475523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CustomerCard
          cardName="changepin"
          img="https://images.pexels.com/photos/2988232/pexels-photo-2988232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CustomerCard
          cardName="fund-transfer"
          img="https://images.pexels.com/photos/4968382/pexels-photo-4968382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
         <CustomerCard
          cardName="currency-change"
          img="https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      {/* </div> */}
     
    </>
  );
};
