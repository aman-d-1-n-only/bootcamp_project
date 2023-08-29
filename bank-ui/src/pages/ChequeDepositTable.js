import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ChequeDeposit() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const [chequeTransactions, setChequeTransactions] = useState([]);
  const [showTable, setShowTable] = useState(true);
  const [searchInput, setSearchInput] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchList, setSearchList] = useState([]);
  const itemsPerPage = 9;

  const TABLE_HEAD = [
    "Cheque Number",
    "Account Number",
    "Cheque Status",
    "Amount",
    "Date",
  ];

  const handleDeposit = (data) => {
    console.log(chequeTransactions);
    console.log("data", data);
    const txnData = {
      status: "Success",
      amount: parseInt(data.amount),
      debitedFrom: -1,
      creditTo: data.accNo,
    };
    axios
      .post("http://localhost:5165/api/txns", txnData)
      .then((response) => {
        console.log(response.data);
        toast.success(
          <>
            Cheque deposited successfully
            <br />
            Click on 'View Cheque History' to view the details.
          </>
        );
        reset({
          accNo: "",
          amount: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // const chequeData = {
    //   accNo: data.accNo,
    //   amount: parseInt(data.amount),
    // };
    // axios
    //   .post("http://localhost:5165/chequeDeposit", chequeData)
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const handleHistory = () => {
    setShowTable(true);
    console.log("history");
    axios
      .get("http://localhost:5165/api/txns")
      .then((response) => {
        filterList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const filterList = (txns) => {
    let transac = [...txns];
    transac = transac.filter(function (transaction) {
      return parseInt(transaction.debitedFrom) === parseInt(-1);
    });

    if (searchInput) {
      transac = transac.filter(function (transaction) {
        return parseInt(transaction.txnId) === parseInt(searchInput);
      });
    }
    setChequeTransactions([...transac]);
  };
  const searchFilter = (input) => {
    let transac = [...chequeTransactions];
    if (input) {
      transac = transac.filter(function (transaction) {
        return parseInt(transaction.txnId) === parseInt(input);
      });
    }
    setSearchList([...transac]);
  };
  const handleInput = (event) => {
    setSearchInput(event.target.value);
    searchFilter(event.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = chequeTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <>
      <ToastContainer position="top-center" />
      <Card
        color="transparent"
        shadow={false}
        className="w-full my-6 flex justify-center items-center"
      >
        <div className="flex justify-center items-center flex-col shadow-lg w-fit p-6 rounded-lg">
          <div className="p-1 border-b-2 border-gray-800 mb-4">
            <Typography variant="h4" className="text-gray-800">
              Cheque Status
            </Typography>
          </div>
          <form
            className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96 gap-y-8 flex flex-col"
            onSubmit={handleSubmit(handleDeposit)}
          >
            <Controller
              name="accNo"
              control={control}
              rules={{
                required: "Account number is required",
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: "Enter a valid account number",
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    size="lg"
                    label="Enter Account Number"
                    error={errors.accNo?.message}
                    onKeyUp={() => {
                      trigger("accNo");
                    }}
                    required
                    {...field}
                  />
                  {errors.accNo && (
                    <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                      {" "}
                      {errors.accNo?.message}
                    </span>
                  )}
                </>
              )}
            />
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                pattern: {
                  value: /^[1-9][0-9]*$/,
                  message: "Enter a valid amount",
                },
              }}
              render={({ field }) => (
                <>
                  <Input
                    size="lg"
                    label="Enter Amount"
                    type="number"
                    min="0"
                    error={errors.amount?.message}
                    onKeyUp={() => {
                      trigger("amount");
                    }}
                    required
                    {...field}
                  />
                  {errors.amount && (
                    <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                      {" "}
                      {errors.amount?.message}
                    </span>
                  )}
                </>
              )}
            />

            <div className="flex flex-row space-x-4 items-center justify-center  whitespace-nowrap">
              <Button className="w-1/2" variant="gradient" type="submit">
                Deposit Cheque
              </Button>
              <Button
                className="w-1/2"
                type="button"
                onClick={handleHistory}
                variant="gradient"
              >
                View Cheque History
              </Button>
            </div>
          </form>
        </div>
      </Card>

      {chequeTransactions.length > 0 && showTable && (
        <div>
          <div className="w-full h-fit bg-white py-5 px-10  flex flex-col items-center justify-center ">
            <div className=" min-w-fit w-1/3 mb-6 ">
              <Input
                label="Enter Cheque Number"
                className="w-full "
                size="lg"
                value={searchInput}
                onChange={handleInput}
                icon={
                  <MagnifyingGlassIcon className=" border-l-2 border-blue-gray-100" />
                }
              />
              {/* <input  placeholder="Enter Customer ID"className="w-72 items-center"
          size="lg"
          value={searchInput}
          onChange={handleChange}
           >
            
          </input>
          <SearchIcon/> */}
            </div>

            <Card className="h-full w-full overflow-auto rounded-none">
              <table className="w-full min-w-max table-auto text-center">
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className="border-b border-gray-300 bg-gray-900 p-5 font-normal leading-none text-gray-50 text-center"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                {searchInput ? (
                  <tbody className="text-center text-sm">
                    {searchList?.map((row) => (
                      <tr
                        key={row.txnId}
                        className="even:bg-gray-100/100 border-b border-blue-gray-50"
                      >
                        <td className="p-3 ">{row.txnId}</td>
                        <td className="p-3 ">{row.creditTo}</td>
                        <td className="p-3 ">{row.status}</td>
                        <td className="p-3 ">{row.amount}</td>
                        <td className="p-3 ">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tbody className="text-center text-sm">
                    {currentItems?.map((row) => (
                      <tr
                        key={row.txnId}
                        className="even:bg-gray-100/100 border-b border-blue-gray-50"
                      >
                        <td className="p-3 ">{row.txnId}</td>
                        <td className="p-3 ">{row.creditTo}</td>
                        <td className="p-3 ">{row.status}</td>
                        <td className="p-3 ">{row.amount}</td>
                        <td className="p-3 ">{row.date}</td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </Card>

            <div className="flex justify-center mt-4">
              {currentPage > 1 && (
                <Button
                  onClick={() => setCurrentPage(currentPage - 1)}
                  variant="gradient"
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
              )}
              {indexOfLastItem < chequeTransactions.length && (
                <Button
                  onClick={() => setCurrentPage(currentPage + 1)}
                  variant="gradient"
                  disabled={indexOfLastItem >= chequeTransactions.length}
                  className="ml-2"
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
