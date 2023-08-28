import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm} from "react-hook-form";
import LeftProfileCard from "./LeftProfileCard";
import AboutSection from "./AboutSection";
import Info from "./Info";
import AddAccountModal from "./AddAccountModal";
import { useLocation } from "react-router-dom";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import AccountTable from "./AccountTable";

function Profile() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
    register
  } = useForm({});

  const location = useLocation();
  const customerData = location.state.data1;
  const custId = customerData.custId;
  const accntType = ["Current", "Savings"];

  const [accountDetails, setAccountDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
    reset();
  };
  const jwtToken = sessionStorage.getItem("jwtToken");
  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5165/api/customer/${custId}/account`,
          {
            headers: {
              Authorization: "bearer " + jwtToken,
            },
          }
        );
        setAccountDetails(response.data);
      } catch (error) {
        console.error("Error fetching account details:", error);
      }
    };
    fetchAccountDetails();
  // }, [custId, jwtToken, accountDetails]);
}, [accountDetails]);

  const SubmitAccount = async (data) => {
    try {
      data.enable = true;
      const response = await axios.post(
        `http://localhost:5165/api/customer/${custId}/account`,
        data,
        {
          headers: {
            Authorization: "bearer " + jwtToken,
          },
        }
      );
      if (response.data) {
        toast.success(
          `Account Details Added successfully for ${customerData.name}`
        );
        toggleModal();
      }
    } catch (error) {
      console.error("Error submitting account:", error);
      toast.error("Error submitting account");
    }
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        <div className="container mx-auto my-5 p-0">
          <div className="md:flex no-wrap md:-mx-2">
            <LeftProfileCard custId={custId} customerData={customerData}/>

            {/* <!-- Right Side --> */}
            <div className="w-full md:w-9/12 mx-2 h-64">
              <AboutSection
                customerData={customerData}
                custId={custId}
                jwtToken={jwtToken}
              />

              <div className="my-4 "></div>

              <div className="bg-white p-5 shadow-sm rounded-sm ">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <ClipboardDocumentListIcon className="h-7" />
                    <span className="tracking-wide text-lg text-gray-800">
                      Account Details
                    </span>
                  </div>

                  <div className="flex items-center gap-x-2">
                    <Button
                      className="mt-4 ml-8 z-0 "
                      type="button"
                      variant="gradient"
                      onClick={toggleModal}
                    >
                      Add Account
                    </Button>
                    <Info />
                  </div>

                  {showModal && (
                    <AddAccountModal
                      showModal={showModal}
                      toggleModal={toggleModal}
                      control={control}
                      register={register}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      trigger={trigger}
                      accntType={accntType}
                      SubmitAccount={SubmitAccount}
                    />
                  )}

                  <AccountTable
                    accountDetails={accountDetails}
                    custId={custId}
                    setAccountDetails={setAccountDetails}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer position="top-center" />
      </div>
    </>
  );
}

export default Profile;
