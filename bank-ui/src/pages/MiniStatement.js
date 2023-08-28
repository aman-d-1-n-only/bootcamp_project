import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import axios from "axios";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PinInput from "../components/PinInput";

const MiniStatement =  (props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const TABLE_HEAD = [
    "Transaction ID",
    "Status",
    "Amount",
    "Debited From",
    "Credited To",
    "Date",
  ];
  // const accountInitalValues = {
  //  accType: "",
  //   balance: 0,
  //   cardNo: "",
  //   pin: "",
  //   enable: true
  // };
  const [accountData, setAccountData] = useState();
  const [errorMessage, setErrorMessage] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [visible , setVisible] = useState(false);

  const handleStatement = async (data) => {
    console.log("this is data", data);
    // console.log(errors)
    const { accNo, pin } = data;
    let postData = {
      "accNo": accNo,
      "pin": pin
    }
    try {
      const response = await axios.post(
        `http://localhost:5165/miniStatement`, postData,
        {
          headers: {
            Authorization: "bearer " + props.jwtToken,
          },
        }
      );
      console.log(response.data)
      setTransactions(response.data);
      
      reset({
        accNo: "",
        pin : "",
      });
      setVisible(true)
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // toast.error(error.response.data);
        setErrorMessage(error.response.data);
       
        console.log(error.response.data);
      } else if (error.response && error.response.status === 400) {
        Object.keys(error.response.data.errors).forEach((key) => {
          console.log(error.response.data.errors);
          error.response.data.errors[key].forEach((val) => {
        
            toast.error(val);
            setErrorMessage(val);
          });
        });
      }
    }
  };
  return (
    
      <div>
        <div className="flex flex-col items-center justify-center gap-y-4">
      <form
        className="mt-4 mb-2 w-80 max-w-screen-lg sm:w-96 gap-y-6 flex flex-col"
        onSubmit={handleSubmit(handleStatement)}
      >
        <Controller
          name="accNo"
          control={control}
          rules={{ required: "Account Number is required" }}
          render={({ field }) => (
            <>
              <Input
                label="Enter Account Number"
                size="lg"
                id="accNo"
                {...field}
                type="number"
                error={errors.accNo?.message}
                required
                onKeyUp={() => {
                  trigger("accNo");
                }}
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
          name="pin"
          control={control}
          rules={{ required: "Pin is required",
          pattern: {
            
            value: /^[1-9][0-9]*$/,
            message: "Enter a valid pin",
          }, }}
          render={({ field }) => (
            <>
              <Input
                label="Enter Pin"
                size="lg"
                id="pin"
                type="password"
                {...field}
                error={errors.pin?.message}
                required
                onKeyUp={() => {
                  trigger("pin");
                }}
              />
              {errors.pin && (
                <span className="-mt-3 flex items-center gap-1 font-normal text-red-600 text-sm">
                  {errors.pin?.message}
                </span>
              )}
            </>
          )}
        />
        {errorMessage && (
          <div className="text-red-600 text-sm">{errorMessage}</div>
        )}
        <Button type="submit" fullWidth className="mt-2">
          Check Mini Statement
        </Button>
      </form>
      </div>
      {(visible&&transactions.length>0)  && <div className="w-full h-full bg-white py-5 px-10">
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
          {transactions?.slice(0, 9).map((row) => (
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
 }
</div>

  );
};

export default MiniStatement;
