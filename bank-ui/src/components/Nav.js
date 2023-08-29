import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  Button,
  IconButton,
  Collapse,
  Menu,
  MenuList,
  MenuItem,
  MenuHandler,
} from "@material-tailwind/react";

import { useNavigate } from "react-router";
import {
  Bars3Icon,
  UserIcon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export function Nav() {
  const [openNav, setOpenNav] = useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);

  // const [expanded, setExpanded] = useState(false);
  const [loginName, setLoginName] = useState(
    sessionStorage.getItem("jwtToken")
  );
  const navigate = useNavigate();
  const navRef = useRef(null);

  const handleClick = () => {
    console.log(loginName);
    if (loginName) {
      sessionStorage.removeItem("jwtToken");
      sessionStorage.setItem("token", false);
      setLoginName("");
      // window.location.reload();
      navigate("/");
    } else {
      console.log("hi");
      navigate("/login");
    }
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );

    const handleClickOutside = (event) => {
      // console.log(navRef);
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenNav(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navList = (
    <ul className="mb-8 mt-2 flex flex-col items-center justify-center lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-base space-x-2 ">
      <Link
        to="/customer/add-customer"
        className="p-2 text-blue-gray-800 flex items-center hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-200 rounded-2xl ml-2"
      >
        Add Customer
      </Link>
      <Link
        to="/customer/view-customer"
        className="p-2 text-blue-gray-800 flex items-center hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-200 rounded-2xl "
      >
        View Customer
      </Link>
      <Link
        to="/customer/transactions"
        className="p-2 text-blue-gray-800 flex items-center hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-200 rounded-2xl "
      >
        Transaction
      </Link>
      <Link
        to="/customer/mini-statement"
        className="p-2 text-blue-gray-800 flex items-center hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-200 rounded-2xl "
      >
        Mini Statement
      </Link>
    </ul>
  );

  const moreNavList = (
    <ul className="mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-col lg:items-center text-base text-center ">
      {/* {navList.props.children} Include the first 3 options */}
      <Link
        to="/customer/cash-withdraw"
        className="p-2  hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-300 rounded-2xl w-full"
      >
        Withdraw Money
      </Link>
      <Link
        to="/customer/changepin"
        className="p-2  hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-300 rounded-2xl w-full"
      >
        Change Pin
      </Link>
      <Link
        to="/customer/fund-transfer"
        className="p-2  hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-300 rounded-2xl w-full"
      >
        Fund Transfer
      </Link>
      <Link
        to="/customer/currency-change"
        className="p-2  hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-300 rounded-2xl w-full"
      >
        Change Currency
      </Link>
      <Link
        to="/customer/cheque-deposit"
        className="p-2  hover:scale-105 hover:bg-gradient-to-b focus:bg-gradient-to-b from-gray-300 rounded-2xl w-full"
      >
        Deposit Check
      </Link>
    </ul>
  );

  const expandedNavList = (
    <ul className="ml-4 mb-4 mt-2 flex flex-col lg:mb-0 lg:mt-0 lg:flex-row lg:items-center text-base text-center space-x-2 ">
      {navList.props.children}
      <Link
        to="/customer/cash-withdraw"
        className="p-2 text-blue-gray-800 flex items-center  hover:bg-gradient-to-bfrom-gray-300 rounded-2xl hover:scale-105 "
      >
        Withdraw Money
      </Link>
      <Link
        to="/customer/changepin"
        className="p-2  text-blue-gray-800 flex items-center  hover:bg-gradient-to-b from-gray-300 rounded-2xl hover:scale-105 "
      >
        Change Pin
      </Link>
      <Link
        to="/customer/fund-transfer"
        className="p-2  text-blue-gray-800 flex items-center  hover:bg-gradient-to-b from-gray-300 rounded-2xl hover:scale-105 "
      >
        Fund Transfer
      </Link>
      <Link
        to="/customer/currency-change"
        className="p-2  text-blue-gray-800 flex items-center  hover:bg-gradient-to-b from-gray-300 rounded-2xl hover:scale-105 "
      >
        Change Currency
      </Link>
      <Link
        to="/customer/cheque-deposit"
        className="p-2  text-blue-gray-800 flex items-center  hover:bg-gradient-to-b from-gray-300 rounded-2xl hover:scale-105 "
      >
        Deposit Cheque
      </Link>
    </ul>
  );
  return (
    <Navbar
      ref={navRef}
      className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-3"
    >
      <div className="flex items-center justify-between text-blue-gray-900 ">
        <Link
          to="/"
          className="lg:text-lg mr-4 py-1.5 font-medium flex items-center justify-center gap-x-4  hover:scale-105"
        >
          {/* <HomeIcon
            variant="text"
            className="ml-auto h-7 w-7 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent hover:scale-105"
            ripple={false}
          /> */}
          <img
            className="ml-auto h-8 w-8 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent hover:scale-105"
            src="/BankLogo.png"
            alt="bank_logo"
          />
          <div className="text-xl">Namma Bank</div>
        </Link>

        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center">
            {window.innerWidth > 960 &&
              (openMenu ? (
                <>
                  {" "}
                  <div className="mr-4 hidden lg:flex items-center justify-center">
                    {" "}
                    {navList}{" "}
                  </div>
                  <Menu
                    open={openMenu}
                    handler={setOpenMenu}
                    allowHover
                    className="w-1/2 "
                  >
                    <MenuHandler>
                      <ChevronDoubleDownIcon
                        className={`h-6 w-6 hidden lg:flex 
                 
            `}
                        onClick={() => setOpenMenu(!openMenu)}
                        title="Show less"
                      />
                    </MenuHandler>
                    <MenuList className="w-fit">
                      <MenuItem>{moreNavList}</MenuItem>
                    </MenuList>
                  </Menu>
                </>
              ) : (
                <>
                  <div className="mr-4 hidden lg:flex items-center justify-center">
                    {" "}
                    {navList}{" "}
                  </div>
                  <ChevronDoubleUpIcon
                    className={`h-6 w-6 transition-transform hidden lg:flex${
                      openMenu ? "rotate-180" : ""
                    }`}
                    title="Show more"
                    onClick={() => setOpenMenu(!openMenu)}
                  />
                </>
              ))}
          </div>
          <Button
            variant="gradient"
            onClick={handleClick}
            size="sm"
            className="hidden lg:inline-block"
          >
            <span className=" flex items-center justify-center ">
              <UserIcon className="w-6 h-6 mr-2" />
              {loginName ? "Logout" : "Login"}
            </span>
          </Button>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              // <ChevronDownIcon  className="h-6 w-6"/>
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </IconButton>
        </div>
      </div>
      <Collapse open={openNav}>
        {expandedNavList}
        <Button
          variant="gradient"
          size="sm"
          fullWidth
          className="mb-2"
          onClick={handleClick}
        >
          <span className=" flex items-center justify-center ">
            <UserIcon className="w-5 h-5 mr-2" />
            {loginName ? "Logout" : "Login"}
          </span>
        </Button>
      </Collapse>
    </Navbar>
  );
}
