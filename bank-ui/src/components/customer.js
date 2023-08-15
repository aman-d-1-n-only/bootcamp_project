import React from "react";
import { CustomerCard } from "./card";
export const Customer = () => {
  return (
    <>
      {/* <div className="relative min-h-screen flex items-center justify-center bg-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
	style={{backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')",}}>
	<div className="absolute bg-black opacity-60 inset-0 z-0"></div> */}
      <div className="gap-6 flex items-center justify-center lg:flex-row lg:h-screen sm:flex-col sm:min-h-screen ">
        <CustomerCard
          cardName="add-customer"
          img="https://images.pexels.com/photos/1602726/pexels-photo-1602726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          // img="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
        />
        <CustomerCard
          cardName="view-customer"
          img="https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <CustomerCard
          cardName="transactions"
          img="https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      {/* </div> */}
    </>
  );
};
