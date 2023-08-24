import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import  {Bars3Icon, ChevronDownIcon, UserIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.setItem('token', false)
    navigate('/')
  }

 useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const navList=(
    <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-base">

      <Link to="/customer/add-customer" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Add Customer</Link>
      <Link to="/customer/view-customer" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">View Customer</Link>
      <Link to="/customer/transactions" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Transactions</Link>
      <Link to="/customer/cash-withdraw" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Cash Withdrawal</Link>
      <Link to="/customer/changepin" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Change Pin</Link>
      <Link to="/customer/fund-transfer" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Fund Transfer</Link>
      <Link to="/customer/currency-change" className="p-3 text-blue-gray-800 flex items-center hover:bg-gradient-to-b from-gray-200 rounded-2xl ">Change Currency</Link>
    </ul>
  );
  return (

      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-2">
        <div className="flex items-center justify-between text-blue-gray-900">
            <Link to="/customer/" className="lg:text-lg mr-4 cursor-pointer py-1.5 font-medium flex items-center justify-center gap-x-4"><HomeIcon variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
              ripple={false}
              /> 
             Dashboard</Link>
          

          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <Button
              variant="gradient"
              onClick={handleClick}
              size="sm"
              className="hidden lg:inline-block"
            >
               <span className=" flex items-center justify-center "><UserIcon className="w-6 h-6 mr-2"/>Logout</span>
            </Button>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
               
                <ChevronDownIcon  className="h-6 w-6"/>
              ) : (
                <Bars3Icon  className="h-6 w-6"/>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button variant="gradient" size="sm" fullWidth className="mb-2"
           onClick={handleClick}>
          <span className=" flex items-center justify-center "><UserIcon className="w-5 h-5 mr-2"/>Logout</span>
          </Button> 
        </Collapse>
      </Navbar>
      
  );
}