import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import {
  MobileNav,
  Typography,
  Button,
  IconButton,
  Card,
  Navbar
} from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/outline";


export default function Navbarlist() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  const Navlist=(
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">

      <Link to="/customer/add-customer" className="mx-4 hover:bg-gray-400 p-2 rounded- ">Add Customer</Link>
      <Link to="/customer/view-customer" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">View Customer</Link>
      <Link to="/customer/transactions" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">Transactions</Link>
      <Link to="/customer/cash-withdraw" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">Cash Withdrawal</Link>
      <Link to="/customer/changepin" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">Change Pin</Link>
      <Link to="/customer/fund-transfer" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">Fund Transfer</Link>
      <Link to="/customer/currency-change" className="mx-4 hover:bg-gray-400 p-2 rounded bg-gradient-to-t from-gray-200">Change Currency</Link>
    </ul>
  );
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
 
  const handleClick = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.setItem('token', false)
    navigate('/')
  }
  return (
    <>
     <div className="-m-6 max-h-[768px] w-[calc(100%+48px)] overflow-scroll">
     <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
      
        <Typography
            className="mr-4 cursor-pointer py-1.5 font-medium flex items-center justify-center gap-x-4"
          >
            <HomeIcon variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
              ripple={false}
              /> 
             <Link to="/customer/" >Dashboard</Link>
          </Typography>
      
          <div className="hidden lg:block">{Navlist}</div>
              <Button
               variant="gradient"
               size="sm"
                type="button"
                onClick={handleClick}
                className="hidden lg:inline-block"
               >
               <span>Logout</span>
              </Button>
              <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
               {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                   </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                   </svg>
            
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>
        <div className="container mx-auto">
          {Navlist}
          <Button variant="gradient" size="sm" fullWidth className="mb-2">
            <span>Logout</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
    </div>
  </>);
}