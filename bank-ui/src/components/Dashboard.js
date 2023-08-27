import React from "react";
import { CustomerCard } from "../components/Cards";
import Card1 from "../img/Cards/Card1.png";
import Card2 from "../img/Cards/Card2.png";
import Card3 from "../img/Cards/Card3.png";
import Card4 from "../img/Cards/Card4.png";
import Card5 from "../img/Cards/Card5.png";
import Card6 from "../img/Cards/Card6.png";
import Card7 from "../img/Cards/Card7.png";
import Card8 from "../img/Cards/Card8.png";
import { Nav } from "./Nav";

export const Customer = () => {
  return (
    <>
    {/* <Nav/> */}
              <div className=" lg:h-full sm:min-h-screen max-w-full py-8">
     <div className="flex flex-wrap items-center justify-center ">  <CustomerCard
          cardName="add-customer"
          img={Card1}
          />
        <CustomerCard
          cardName="view-customer"
          img={Card2}
        />
        <CustomerCard
          cardName="transactions"
          img={Card3}
        />
        <CustomerCard
          cardName="cash-withdraw"
          img={Card4}
        />
        <CustomerCard
          cardName="changepin"
          img={Card5}
        />
        <CustomerCard
          cardName="fund-transfer"
          img={Card6}
        />
         <CustomerCard
          cardName="currency-change"
          img={Card7}
        />
        <CustomerCard
          cardName="cheque-deposit"
          img={Card8}
          />
     </div>  </div>
      {/* </div> */}
     
    </>
  );
};
