import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Card,
} from "@material-tailwind/react";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router";

export default function CustomerTable() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [t, setT] = useState([]);
  
  const TABLE_HEAD = [
    "Customer Id",
    "Name",
    "Address",
    "City",
    "Email",
    "Contact",
    "Pincode",
    "View Profile",
  ];
  
  const handleChange = (event) => {
    event.preventDefault();
    setSearchInput(event.target.value);
    if (event.target.value) {
      filterList(event.target.value);
    }
  };
  
  let transac;
  
  const filterList = (searchInput) => {
    transac = [...data];
    transac = transac.filter(function (row) {
      return parseInt(row.custId) === parseInt(searchInput);
    });
    setT([...transac]);
  };
  
  useEffect(() => {
    const jwtToken = sessionStorage.getItem("jwtToken");
    axios
    .get("http://localhost:5165/api/Customer", {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center gap-y-5">
        <div className="min-w-fit w-1/3 ">
          <Input
            label="Enter Customer ID"
            className="w-full "
            size="lg"
            value={searchInput}
            onChange={handleChange}
            icon={ <SearchIcon className=" border-l-2 border-blue-gray-100"/>} />
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
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    varian="gradient"
                    className="border-b border-gray-300 bg-gray-900 p-5 font-normal leading-none  text-gray-50 text-center"
                  >
                   
                      {head}
                   
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-center">
              {(searchInput ? t : data).map((row) => (
                <tr key={row.custId} className="even:bg-gray-100/100 border-b border-blue-gray-50">
                  <td className="p-3 ">
                    {row.custId}
                  </td>
                  <td className="p-3 ">
                    {row.name}
                  </td>
                  <td className="p-3 ">{row.address}</td>
                  <td className="p-3 ">{row.city}</td>
                  <td className="p-3 ">{row.email}</td>
                  <td className="p-3 ">{row.contact}</td>
                  <td className="p-3 ">{row.pincode}</td>
                  <td className="p-3 ">
                    <Button
                      onClick={() =>
                        navigate("/customer/customer-profile", {
                          state: { data1: row },
                        })
                      }
                    >
                      View
                    </Button>
                  </td>
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
