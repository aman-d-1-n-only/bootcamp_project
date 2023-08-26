import React from "react";
import { useNavigate } from "react-router-dom";
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
import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";

const CashWithdraw = () => {
  const jwtToken = sessionStorage.getItem("jwtToken");
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    customerId: "",
    accountId: "",
    amount: "",
    pin: "",
  });

  const [type, setType] = React.useState("check balance");
  const [accountData, setAccountData] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);

  const handleBalance = (e) => {
    e.preventDefault();
    setSubmitted(false);

    if (!formData.customerId || !formData.accountId) {
      setErrorMessage("Both CustomerId and Account No. are required");
      setAccountData(null);
    } else {
      axios
        .get(
          `http://localhost:5165/api/customer/${formData.customerId}/account/${formData.accountId}`,
          {
            headers: {
              Authorization: "bearer " + jwtToken,
            },
          }
        )
        .then((res) => {
          setAccountData(res.data);
          setErrorMessage("");
          setSubmitted(true);
        })
        .catch((error) => {
          if (error.response?.data) {
            setErrorMessage(error.response.data);
          }
          setAccountData(null);
          setSubmitted(false);
        });
    }
  };

  const handleWithdraw = () => {
    const withData = {
      accNo: parseInt(formData.accountId),
      amount: parseInt(formData.amount),
      pin: formData.pin,
    };

    axios
      .post(`http://localhost:5165/cashWithdrawal`, withData, {
        headers: {
          Authorization: "bearer " + jwtToken,
        },
      })
      .then((response) => {
        alert(`Withdrawal Successful. Updated balance = ${response.data.balance}`);
        setSubmitted(true);
        setFormData({
          customerId: "",
          accountId: "",
          amount: "",
          pin: "",
        });
        setAccountData(null);
      })
      .catch((error) => {
        if (error.response?.data) {
          setErrorMessage(error.response.data);
        }
        setSubmitted(false);
      });
  };

  return (
    <div className="min-h-fit h-full flex justify-center items-center">
      <Card className="w-96">
        <CardHeader color="gray" className="py-6 mb-4 grid place-items-center">
          <div className="text-white mb-4">
            <CurrencyRupeeIcon className="h-16 w-16" />
          </div>
          <Typography variant="h3" color="white">
            Withdraw Money
          </Typography>
        </CardHeader>
        <CardBody className="px-10">
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0">
              <Tab value="check balance" onClick={() => setType("check balance")}>
                Check Balance
              </Tab>
              <Tab value="money withdraw" onClick={() => setType("money withdraw")}>
                Withdraw Money
              </Tab>
            </TabsHeader>
            <TabsBody>
              <TabPanel value="check balance" className="p-0">
                <form className="mt-8 flex flex-col gap-y-4">
                  <Input
                    label="Enter CustomerId"
                    size="lg"
                    id="customerId"
                    required
                    name="customerId"
                    type="number"
                    value={formData.customerId}
                    onChange={(e) =>
                      setFormData({ ...formData, customerId: e.target.value })
                    }
                  />
                  <Input
                    label="Enter Account Number"
                    size="lg"
                    id="accountId"
                    name="accountId"
                    type="number"
                    value={formData.accountId}
                    onChange={(e) =>
                      setFormData({ ...formData, accountId: e.target.value })
                    }
                    required
                  />
                  {errorMessage && <div className="text-red-600 mt-3 text-sm">{errorMessage}</div>}
                  {submitted && (
                    <div className="text-green-600 mt-3 text-sm">
                      Data submitted successfully!
                    </div>
                  )}
                  <Button fullWidth onClick={handleBalance} className="my-4">
                    Check Balance
                  </Button>
                  {accountData && (
                    <Card className="mb-2 mt-6 outline-double shadow-lg mx-4 bg-gradient-to-t from-gray-300">
                      <CardBody>
                        <Typography>Account Number : {accountData.accId}</Typography>
                        <Typography>Balance : {accountData.balance}</Typography>
                      </CardBody>
                    </Card>
                  )}
                </form>
              </TabPanel>
              <TabPanel value="money withdraw" className="p-0">
                <form className="mt-12 flex flex-col gap-4">
                  <Input
                    label="Enter Account Number"
                    size="lg"
                    id="amount"
                    name="balance"
                    type="number"
                    value={formData.accountId}
                    onChange={(e) =>
                      setFormData({ ...formData, accountId: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Enter Amount to withdraw"
                    size="lg"
                    id="amount"
                    name="balance"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                  <Input
                    label="Enter Pin"
                    size="lg"
                    id="amount"
                    name="balance"
                    value={formData.pin}
                    onChange={(e) =>
                      setFormData({ ...formData, pin: e.target.value })
                    }
                    required
                  />
                  <Button className="mt-4" fullWidth onClick={handleWithdraw}>
                    Withdraw
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default CashWithdraw;
