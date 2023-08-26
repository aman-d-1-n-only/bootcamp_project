import React, { useState } from "react";
import { Card, Switch, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import {
  CurrencyRupeeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteCustomer from "../services/DeleteCustomer";
import DeleteAccnt from "../services/DeleteAccnt";
import UserDisable from "./UserDisable";
import axios from "axios";

export default function AccntTable(props) {
  const navigate = useNavigate();

  const TABLE_HEAD = [
    "Account Number",
    "Account Type",
    "Card Number",
    "Balance",
    "Edit Pin",
    "Delete",
    "Withdraw Cash",
    "Enable User"
  ];

  // const [isDisabled, setIsDisabled] = useState(true);
  
    const handleSwitchChange = (account) => {
      account.enable=!(account.enable)
      const jwtToken=sessionStorage.getItem('jwtToken')
      axios.post(`/api/customer/${props.custId}/account/${account.accId}/`, account, {
        headers: {
            'Authorization': 'bearer ' + jwtToken
        }

    }).then(res => {
        console.log(res.data);
      // setIsDisabled(!isDisabled);
    });
  }
  return (
    <div>
      {props.accountDetails.length > 0 ? (
        <>
          <Card className="h-full w-full overflow-auto mt-6">
            <table className="w-full min-w-max table-auto ">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-80"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="">
                {/* {console.log(props.accountDetails)} */}
                {props.accountDetails.map((item, index) => {
                  return (
                    <>
                      <tr key={item.accId}>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {item.accId}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.accType}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.cardNo}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {item.balance}
                          </Typography>
                        </td>

                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                           
                            variant="small"
                            color="blue-gray"
                            className="font-medium flex items-center justify-center" 
                          >
                           
                              <PencilSquareIcon className="w-6 h-6 hover:scale-110 text-blue-900 cursor-pointer" onClick={() => navigate("/customer/changepin")}/>
                           
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            
                            variant="small"
                            color="blue-gray"
                            className="font-medium flex items-center justify-center" 
                                                    >
                            <DeleteAccnt
                             custId={props.custId} accId={item.accId}
                             />
                        </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 text-center justify-center">
                          <Typography
                            as="a"
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            <button
                              onClick={() =>
                                navigate("/customer/cash-withdraw")
                              }
                            >
                              <CurrencyRupeeIcon className="w-6 h-6 hover:scale-110 cursor-pointer text-green-800" />{" "}
                            </button>
                          </Typography>
                          </td>
                          <td className="p-3 border-b border-blue-gray-50 ">
                            

                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium w-full items-center ml-8"
                          >
                            {/* <UserDisable/> */}
                            <Switch 
                            id={`Switch${item.accId}`}
                            className=""
        checked={item.enable}
        onChange={()=>{
          item.enable=!(item.enable)
          const jwtToken=sessionStorage.getItem('jwtToken')
          console.log(item);
          axios.put(`http://localhost:5165/api/customer/${props.custId}/account/${item.accId}/`, item, {
            headers: {
                'Authorization': 'bearer ' + jwtToken
            }
    
        }).then(res => {
            console.log(res.data);
          // setIsDisabled(!isDisabled);
        })
        .catch((e)=>{
          console.log(e.response);
        })
        }}
         />
                              
                          </Typography>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
