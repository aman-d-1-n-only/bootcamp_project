import React, { useEffect, useState } from "react";
import Profile1 from "../../img/Profile1.png";
import Profile2 from "../../img/Profile2.png";
import Profile3 from "../../img/Profile3.png";
import Profile4 from "../../img/Profile4.png";
import UserProfile from "../../img/UserProfile.png";
import { Button, Switch, Tab, Typography } from "@material-tailwind/react";
import axios from "axios";
import UserDisable from "./UserDisable";

export default function LeftProfileCard(props) {
  const [total, setTotal] = useState(0);
  const [visible, setVisible] = React.useState(false);
  const jwtToken=sessionStorage.getItem('jwtToken');
  const image = [

   {Profile1},
   {Profile2},
   {Profile3},
   {Profile4}
  ];

  const [randomImage, setRandomImage] = useState("");

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * image.length);
    setRandomImage(image[randomIndex]);
  };

  useEffect(() => {
    let sum=0;
    axios
      .get(`http://localhost:5165/api/customer/${props.custId}/account`, {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((res) => {
        console.log("Inside left profile",res.data);
        res.data.map((item)=>{
          // console.log(item);
          sum+=item.balance;
         
        })
        setTotal(sum);
        getRandomImage();
        // setAccountDetails(res.data);
        // customerData = res.data;
        // setcustomerData(res.data);
      });

    // accountDetails.map((item) => {
    //   setTotal(total + item.balance)
    // })
  },[]);

  return (
    <>
      <div className="w-full mx-2 my-4 md:w-3/12 md:mx-2">
        <div className="bg-white p-3 border-t-4 border-gray-800 py-8">
          <h1 class="text-lg md:text-xl text-gray-800 font-semibold tracking-wide uppercase  w-full text-center">
            Customer Profile
          </h1>

          <div className="image overflow-hidden "></div>

          <div className="w-full flex items-center justify-center p-8 md:p-4">
            <img
              src={Profile1}
              alt="user_profile_icon"
              className="rounded-full 
                  "
            />
          </div>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-5 mt-3 divide-y rounded shadow-sm w-full">
            <li className=" py-3 flex flex-col">
              <Button  variant="gradient" onClick={() => setVisible(!visible)}>
                {visible ? "Hide Bank Balance" : "Check Bank Balance"}{" "}
              </Button>
              {visible && (
                <span className="pt-4 grid grid-cols-2 ">
                  <span>Bank Balance</span>
                  <span className="ml-auto text-sm">{total}</span>
                </span>
              )}
            </li>
            <li className=" md:text-sm ">
              
            </li>
          </ul>
        </div>
        </div>
      </>
  );
}