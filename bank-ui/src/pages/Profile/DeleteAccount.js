import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
 

export default function DeleteAccount(props) {
  const [open, setOpen] = useState(false);
 
  const handleOpen = () => setOpen(!open);
  const jwtToken=sessionStorage.getItem('jwtToken')
  const handleDelete=()=>{
    axios
    .delete(`http://localhost:5165/api/customer/${props.custId}/account/${props.accId}`, {
      headers: {
        Authorization: "bearer " + jwtToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      if(res)
      {
        
        toast.success("Account has been deleted successfully");
        handleOpen();
      }
    });


  }
 
  return (
    <>
    
    <ToastContainer position="top-center"/>
    <TrashIcon
                                className="w-6 h-6 text-red-900 hover:scale-110 cursor-pointer"
                                fill="none"
                                onClick={handleOpen} 
                              />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="flex items-center justify-center text-center">Delete Confirmation</DialogHeader>
        
        <DialogBody divider className="flex items-center justify-center text-center text-lg">

        Are you sure you want to delete the account?
        </DialogBody>
        <DialogFooter divider className="flex items-center justify-around m-4">
        <Button
            color="red"
            onClick={handleOpen}
            className=" bg-gray-400 hover:scale-105 hover:bg-gray-500 cursor-pointer 
            text-gray-900 "
          >
            <span>Cancel</span>
          </Button>
          <Button  color="green" onClick={handleDelete} className="shadow-lowshade bg-red rounded-lg hover:scale-105 bg-[#aa0000] 
              text-gray-200 cursor-pointer">
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}