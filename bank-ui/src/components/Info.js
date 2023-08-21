import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { List, ListItem, Tooltip, Typography } from "@material-tailwind/react";
import React from "react";

export default function Info() {
  return (
    <Tooltip
      placement="right"
      className="border border-blue-gray-50 bg-white w-min lg:w-1/4 shadow-xl shadow-black/10"
      content={
        // <div className="w-1/2">
        //   <Typography
        //     variant="small"
        //     color="blue-gray"
        //     className="font-normal opacity-80"
        //   >
            <List className="">
              <ListItem>
                Account Number: Account Number must be 10 characters. The
                Account Number should only contain number from 0 to 9.
              </ListItem>
              <ListItem>
                {" "}
                Card Number: Card Number must be 8 characters. The Card Number
                should only contain number from 0 to 9.
              </ListItem>
              <ListItem> Balance: Balance should be more than 5000.</ListItem>
              <ListItem>
                {" "}
                Pin: Pin must be 4 characters. The PIN should only contain
                numbers from 0 to 9.
              </ListItem>
            </List>
        //   </Typography>
        // </div>
      }
    >
      <InformationCircleIcon className="h-5 w-5 cursor-pointer text-blue-gray-500" />
    </Tooltip>
  );
}
