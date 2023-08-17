import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";


export default function DeleteCustomer() {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <Button
         className="mt-4 mx-10 hover:scale-105 bg-[#aa0000] 
         text-gray-200 cursor-pointer"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Delete
      </Button>
      {showModal ? (
        <>
        <div className="flex items-center justify-center w-full top-0 right-0 left-0 inset-0 fixed  ">
          <div
            onClick={() => setShowModal(false)}
            
            className="bg-[rgba(49,49,49,0.8)] absolute w-full h-full inset-0 "
          ></div>
          <div
            className="rounded 
        bg-[#f1f1f1] max-w-[60%] md:w-fit
        pt-4 pb-6 px-8 z-50"
          >
            <form>
              <p className="text-gray-700 text-xl md:text-2xl font-semibold text-center">
                Delete Confirmation
                <div className="border-t-4 border-gray-700 flex  w-[40%] mb-4 mx-auto">
                  {" "}
                </div>
              </p>

              <div>
                <p className="text-center text-gray-600 font-medium ">
                  Are you sure you want to delete ?
                </p>
              </div>

              <div className="flex items-center justify-around mt-6">
                <input
                  type="submit"
                  className=" px-2 md:px-4 py-1.5  font-bold shadow-lowshade bg-red rounded-lg hover:scale-105 bg-[#aa0000] min-w-fit w-2/5
              text-gray-200 cursor-pointer"
                  value="Delete"
                  onClick={() => setShowModal(false)}
                  />

                <button
                  className="bg-gray-400  px-2 md:px-4 py-1.5 font-bold shadow-lowshade  rounded-lg hover:scale-105 hover:bg-gray-500 min-w-fit w-2/5 cursor-pointer 
              text-gray-900 "
              onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
              </form>
          </div>
        </div>
        </>
      ) : null}
    </>
  );
}