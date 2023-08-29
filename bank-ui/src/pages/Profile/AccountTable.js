import React from "react";
import { Card, Switch} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import {
  CurrencyRupeeIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import DeleteAccount from "./DeleteAccount";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AccountTable(props) {
  const navigate = useNavigate();

  const TABLE_HEAD = [
    "Account Number",
    "Account Type",
    "Card Number",
    "Balance",
    "Edit Pin",
    "Delete",
    "Withdraw Cash",
    "Disable User",
  ];

  const handleSwitchChange = (account) => {
    account.enable = !account.enable;
    const jwtToken = sessionStorage.getItem("jwtToken");
    axios
      .post(
        `/api/customer/${props.custId}/account/${account.accId}/`,
        account,
        {
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
  };

  return (
    <>
    
    <ToastContainer position="top-center"/>
    <div>
      {props.accountDetails.length > 0 && (
        <>
          <Card className="h-full w-full overflow-auto mt-6">
            <table className="w-full min-w-max table-auto ">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      variant="gradient"
                      className="border-b border-blue-gray-100 bg-blue-gray-50 py-6 px-4 font-normal leading-none text-center opacity-80 "
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {props.accountDetails.map((item) => (
                
                      <tr key={item.accId}>
                        <td className="p-3 text-sm border-b border-blue-gray-50 text-center justify-center">
                          {item.accId}
                        </td>
                        <td className="p-3 text-sm border-b border-blue-gray-50 text-center justify-center">
                          {item.accType}
                        </td>
                        <td className="p-3 text-sm border-b border-blue-gray-50 text-center justify-center">
                          {item.cardNo}
                        </td>
                        <td className="p-3 text-sm border-b border-blue-gray-50 text-center justify-center">
                          {item.balance}
                        </td>

                        <td className="p-3 text-sm border-b border-blue-gray-50  ">
                          <div className="flex  justify-center items-center">
                            <PencilSquareIcon
                              className="w-6 h-6 hover:scale-110 text-blue-900 cursor-pointer "
                              onClick={() => navigate("/customer/changepin")}
                            />
                          </div>
                        </td>

                        <td className="p-3 text-sm border-b border-blue-gray-50">
                          <div className="flex justify-center items-center">
                            <DeleteAccount
                              custId={props.custId}
                              accId={item.accId}
                            />
                          </div>
                        </td>
                        <td className="p-3 text-sm border-b border-blue-gray-50 ">
                          <div className="flex  justify-center items-center">
                            <CurrencyRupeeIcon
                              className="w-6 h-6 hover:scale-110 cursor-pointer text-green-800"
                              onClick={() =>
                                navigate("/customer/cash-withdraw")
                              }
                            />
                          </div>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50 ">
                          <div className="flex justify-center items-center ">
                            <Switch
                              id={`Switch${item.accId}`}
                              className=""
                              checked={!item.enable}
                              onChange={() => {
                                item.enable = !item.enable;
                                const jwtToken =
                                  sessionStorage.getItem("jwtToken");
                                console.log(item);
                                axios
                                  .put(
                                    `http://localhost:5165/api/customer/${props.custId}/account/${item.accId}/`,
                                    item,
                                    {
                                      headers: {
                                        Authorization: "bearer " + jwtToken,
                                      },
                                    }
                                  )
                                  .then((res) => {
                                    console.log("this", res.data);
                                  {!item.enable &&  toast.success("Account disabled successfully")};
                                  
                                  {item.enable &&  toast.success("Account enabled successfully")};
       
                                    // setIsDisabled(!isDisabled);
                                  })
                                  .catch((e) => {
                                    console.log(e.response);
                                  });
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                 
                  ))}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
    </>
  );
}
