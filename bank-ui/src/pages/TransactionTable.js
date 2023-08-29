import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Card, Button } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const TABLE_HEAD = [
    "Transaction ID",
    "Status",
    "Amount",
    "Debited From",
    "Credited To",
    "Date",
  ];

  // const handleChange = (e) => {
  //   e.preventDefault();
  //   setSearchInput(e.target.value);
  //   if (e.target.value) {
  //     filterList(e.target.value);
  //   }
  // };

  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDateChange = (event, type) => {
    const value = event.target.value;
    if (type === "fromDate") {
      setFromDate(value);
    } else if (type === "toDate") {
      setToDate(value);
    }
  };

  const filterList = () => {
    let filteredData = transactions;
    if (fromDate && toDate) {
      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);
      filteredData = filteredData.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt.split("T")[0]);
        return transactionDate >= startDate && transactionDate <= endDate;
      });
    }
    // if (searchInput) {
    //   filteredData = filteredData.filter(function (transaction) {
    //     return (
    //       parseInt(transaction.debitedFrom) === parseInt(searchInput)
    //     );
    //   });
    // }
    // setT([...filteredData]);
    if (searchInput) {
      filteredData = filteredData.filter((transaction) =>
        transaction.debitedFrom.toString().includes(searchInput)
      );
    }
    setFilteredTransactions(filteredData);
    setCurrentPage(1);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5165/api/txns")
      .then((response) => {
        const filteredData = response.data.filter((obj) => {
          return obj.debitedFrom !== -1;
        });
        setTransactions(filteredData);
        // filterList();
        setFilteredTransactions(filteredData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    filterList();
  }, [searchInput, fromDate, toDate]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center gap-y-5">
        <div className="min-w-fit w-1/3 flex space-x-2">
          <Input
            label="From Date"
            type="date"
            size="lg"
            value={fromDate}
            onChange={(e) => handleDateChange(e, "fromDate")}
          />
          <Input
            label="To Date"
            type="date"
            size="lg"
            value={toDate}
            onChange={(e) => handleDateChange(e, "toDate")}
          />
          {/* <Button onClick={filterList} variant="gradient" className="min-w-fit">
            Search
          </Button> */}
        </div>
        <div className="min-w-fit w-1/3 flex space-x-4 ">
          <Input
            label="Search Sender Account"
            size="lg"
            value={searchInput}
            onChange={handleChange}
            icon={
              <MagnifyingGlassIcon className=" border-l-2 border-blue-gray-100" />
            }
          />
          {/* <Button onClick={filterList} variant="gradient" className="min-w-fit">
            Search
          </Button> */}
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
                {currentItems.map((row) => (
                  <tr
                    key={row.txnId}
                    className="even:bg-gray-100/100 border-b border-blue-gray-50"
                  >
                    <td className="p-3">{row.txnId}</td>
                    <td className="p-3">{row.status}</td>
                    <td className="p-3">{row.amount}</td>
                    <td className="p-3">{row.debitedFrom}</td>
                    <td className="p-3">{row.creditTo}</td>
                    <td className="p-3">{row.createdAt.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          {/* <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => paginate(index + 1)}
                variant={currentPage === index + 1 ? "gradient" : "outline"}
                ripple="dark"
                size="sm"
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}
          </div> */}
          <div className="flex justify-center mt-4">
            {currentPage > 1 && (
              <Button
                onClick={() => handlePageChange(currentPage - 1)}
                variant="gradient"
              >
                Previous
              </Button>
            )}
            {currentPage < totalPages && (
              <Button
                onClick={() => handlePageChange(currentPage + 1)}
                variant="gradient"
                className="ml-2"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
