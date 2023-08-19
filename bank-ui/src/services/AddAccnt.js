// import React from "react";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Input,
//   Button,
//   Typography,
// } from "@material-tailwind/react";


// export default function AddAccnt2() {
//   const [showModal, setShowModal] = React.useState(false);
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };
  
//   return (
//     <>
//       <Button
//          className="mt-4 mx-10"
//         type="button"
//         onClick={() => setShowModal(true)}
//       >
//       Add Account
//       </Button>
//       {showModal ? (
//         <>
//         <Card className="m-2 p-2 lg:max-w-[35rem]  sm:w-1/2 ">
// <CardHeader
//   color="gray"
//   floated={false}
//   shadow={false}
//   className="m-0 grid place-items-center rounded-b-none py-8 px-4 text-center"
// >

//   <Typography variant="h4" color="white">
//    Add Account
//   </Typography>
// </CardHeader>
// <CardBody className="px-20">
//   {/* Add Account */}

//   <form className="mt-8 flex flex-col gap-y-4 ">
//     <Typography
//       variant="small"
//       color="blue-gray"
//       className="font-medium"
//     >
//       Account Details
//     </Typography>

//     <Input className="w-fit"
//       onChange={handleAccountChange}
//       name="accNo"
//       label="Account Number"
//       value={accountData.name}
//     />

//     <Input className="w-fit"
//       onChange={handleAccountChange}
//       name="cardNo"
//       label="Card Number"
//       value={accountData.name}
//     />

//     <Input className="w-fit"
//       onChange={handleAccountChange}
//       name="balance"
//       label="Balance"
//       value={accountData.name}
//     />

//     <Input className="w-fit"
//       onChange={handleAccountChange}
//       name="pin"
//       label="Pin"
//       type="password"
//       value={accountData.name}
//     />

//     <Button onClick={SubmitAccount} className="mt-4 mx-10">
//       Add Account
//     </Button>
//   </form>
// </CardBody>
// </Card>
//         </>
//       ) : null}
//     </>
//   );
// }