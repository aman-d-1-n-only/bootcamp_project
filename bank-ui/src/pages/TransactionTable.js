import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Card } from "@material-tailwind/react";
import {
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);

  const [searchInput, setSearchInput] = useState();
  const [t, setT] = useState([]);

  const TABLE_HEAD = [
    "Transaction ID",
    "Status",
    "Amount",
    "Debited From",
    "Credited To",
    "Date",
  ];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (e.target.value) {
      filterList(e.target.value);
    }
  };

  let transac;
  const filterList = (searchInput) => {
    transac = [...transactions];
    transac = transac.filter(function (transaction) {
      console.log(typeof searchInput);
      return parseInt(transaction.debitedFrom) === parseInt(searchInput);
    });
    setT([...transac]);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/txns")
      .then((response) => {
        console.log(response.data);
        const filteredData=response.data.filter(obj=>{
          return obj.debitedFrom!=-1
        })
        setTransactions(filteredData);
        console.log("response");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center gap-y-5">
        <div className="min-w-fit w-1/3 ">
       
          <Input
            label="Enter Sender's Account Number"
            className="w-full "
            size="lg"
            value={searchInput}
            onChange={handleChange}
            icon={<
              MagnifyingGlassIcon className=" border-l-2 border-blue-gray-100" />}
          />
          {/* <input  placeholder="Enter Customer ID"className="w-72 items-center"
            size="lg"
            value={searchInput}
            onChange={handleChange}
             >
              
            </input>
            <SearchIcon/> */}
        </div>

        <div className="w-full h-full bg-white py-5 px-10">
          <Card className="h-full w-full overflow-auto rounded-none">
            <table className="w-full min-w-max table-auto text-center">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      variant="gradient"
                      className="border-b border-gray-300 bg-gray-900 p-5 font-normal leading-none  text-gray-50 text-center"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-center text-sm">
                {(searchInput ? t : transactions).slice(0, 9).map((row) => (
                 <tr key={row.txnId} className="even:bg-gray-100/100 border-b border-blue-gray-50">
                 <td className="p-3">
                   {row.txnId}
                 </td>
                 <td className="p-3">
                   {row.status}
                 </td>
                 <td className="p-3">{row.amount}</td>
                 <td className="p-3">{row.debitedFrom}</td>
                 <td className="p-3">{row.creditTo}</td>
                 <td className="p-3">{row.createdAt.split('T')[0]}</td>
                 
               </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </>
  );
}
