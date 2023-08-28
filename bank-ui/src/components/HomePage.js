import React from "react";
import LoginImage from "../img/LoginImage.png";
import { Button } from "@material-tailwind/react";
import { Dashboard } from "./Dashboard";

export const Customer = () => {
  return (
    <>
    {/* <Nav/> */}
    <div className=" lg:h-full sm:min-h-screen max-w-full bg-gray-100 overflow-x-none">
  <div className="py-[8.5rem] bg-cover bg-no-repeat bg-fixed relative " 
  
  style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${LoginImage})` }}>
    {/* style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')" }}> */}
    <div className="container m-auto text-center opacity-100 ">
      <h1 className="text-4xl font-bold mb-2 text-gray-200">Welcome to</h1>
      
      <h1 className="text-4xl font-bold mb-2 text-gray-200">NAMMA BANK!!!</h1>
      <h3 className="text-2xl mb-8 text-gray-400 ont-normal leading-wide ">Thank you for choosing Namma Bank for your financial needs.</h3>
      <a href="#services">
              <Button size="lg" className="rounded-full">
                View Services
              </Button>
            </a>
    </div>
  </div>
        <div className="w-full h-full bg-gray-100 pt-6 overflow-x-none">
        <section id="services" className="container mx-auto p-10 bg-white  shadow-md my-8 overflow-x-none">
          <h4 className="text-3xl font-bold text-center text-gray-600 mb-8">Our Services</h4>
          <Dashboard/>
        </section>
        <footer className="bg-gray-200 text-center lg:text-left p-2">
            <div className="text-gray-700 text-center p-1 z-100">
              &copy; {new Date().getFullYear()} Namma Bank. All rights reserved.
            </div>
          </footer>
         {/* <footer className="bbg-gray-200 text-center lg:text-left fixed bottom-0 w-full shadow-shade justify-center flex items-center h-10">
        <div className="text-gray-700 text-center p-1 z-100 ">
          &copy; Copyright: {new Date().getFullYear()}
        </div>
      </footer> */}
        </div>
        
     
 </div>
        </>
  );
};