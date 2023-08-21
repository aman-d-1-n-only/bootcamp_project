import React from "react";
import { Card, Typography } from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import {
  CurrencyRupeeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import DeleteCustomer from "../services/DeleteCustomer";
import DeleteAccnt from "../services/DeleteAccnt";

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
  ];
  return (
    <div>
      {props.accountDetails.length > 0 ? (
        <>
          <Card className="h-full w-full overflow-auto mt-6">
            <table className="w-full min-w-max table-auto text-center justify-center">
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
              <tbody>
                {/* {console.log(props.accountDetails)} */}
                {props.accountDetails.map((item, index) => {
                  return (
                    <>
                      <tr key={item.accId}>
                        <td className="p-3 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {item.accId}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.accType}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {item.cardNo}
                          </Typography>
                        </td>
                        <td className="p-3 border-b border-blue-gray-50">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal "
                          >
                            {item.balance}
                          </Typography>
                        </td>

                        <td className="p-3 border-b border-blue-gray-50">
                          <Typography
                           
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            <button>
                              <PencilSquareIcon className="w-6 h-6 hover:scale-105 text-blue-900 " />
                            </button>
                          </Typography>
                        </td>
                        <td>
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
                        <td className="p-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-medium"
                          >
                            <button
                              onClick={() =>
                                navigate("/customer/cash-withdraw")
                              }
                            >
                              <CurrencyRupeeIcon className="w-6 h-6 text-green-800" />{" "}
                            </button>
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
