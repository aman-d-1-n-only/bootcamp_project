import React from "react";
import {
    Card,
    Typography
  } from "@material-tailwind/react";




export default function AccntTable({accountDetails}, {showModal}) {
    
    const TABLE_HEAD = ["Account Number", "Card Number", "Balance", "Edit Pin","Delete","Withdraw Cash"];
  return (
    <div>
        
       {accountDetails.length > 0 && !showModal ? (
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
                        {/* {console.log(accountDetails)} */}
                        {accountDetails.map((item, index) => {
                            // const isLast = index === accountDetails.length - 1;
                            // const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
                          return (
                            <>           
              <tr key={item.accNo} >
                <td className="p-3 border-b border-blue-gray-50">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal "
                  >
                  {item.accNo}
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
               
                <td className="p-3 border-b border-blue-gray-50" >
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  
  <button ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 hover:scale-105 text-blue-900 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg></button>


                </Typography>
              </td>
              <td className="p-3 border-b border-blue-gray-50">
              <Typography
                as="a"
                href="#"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
            <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-red-900 hover:scale-105 ">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
            </button>
                

              </Typography>
            </td>
            <td className="p-3">
            <Typography
              as="a"
              href="#"
              variant="small"
              color="blue-gray"
              className="font-medium"
            >
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-green-800">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg></button>    

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
  )
}
