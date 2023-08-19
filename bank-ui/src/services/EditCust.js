// import React from 'react'

// export default function EditCust() {
//   return (
//     <>
//     <Button
//                       onClick={() => {
//                         // console.log(location.state.data1);
//                         setDisabled(false);
//                         setName("Done");
//                         if (name === "Done") {
//                           axios
//                             .put(
//                               `http://localhost:5165/api/Customer/${custId}`,
//                               updatedData,
//                               {
//                                 headers: {
//                                   Authorization: "bearer " + jwtToken,
//                                 },
//                               }
//                             )
//                             .then((res) => {
//                               console.log(res.data);
//                               setUpdatedData(res.data);
//                               setDisabled(true);
//                               setName("Edit");
//                               alert("Customer Details Updated Successfully");
//                               // delete customerData['custId'];
//                               // customerData = res.data;
//                               // setcustomerData(res.data);
//                             });
//                           // console.log(updatedData)
//                         }
//                       }}
//                       // type="submit"
//                       className="mt-4 mx-10 hover:scale-105 bg-blue-900 
//                       text-gray-200 cursor-pointer"
//                     >
//                       {name}
//                     </Button></>>
//   )
// }
