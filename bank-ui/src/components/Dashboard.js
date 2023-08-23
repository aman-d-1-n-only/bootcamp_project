import React from "react";
import { CustomerCard } from "../components/Cards";
import Card1 from "../img/Card1.png";
import Card2 from "../img/Card2.png";
import Card3 from "../img/Card3.png";
import Card4 from "../img/Card4.png";
import Card5 from "../img/Card5.png";
import Card6 from "../img/Card6.png";
import Card7 from "../img/Card7.png";

export const Customer = () => {
  return (
    <>
              <div className=" lg:h-full sm:min-h-screen max-w-full py-8">
     <div className="flex flex-wrap items-center justify-center">  <CustomerCard
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
     </div>  </div>
      {/* </div> */}
     
    </>
  );
};
