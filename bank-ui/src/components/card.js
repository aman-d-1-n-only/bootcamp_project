// import React from "react";
// import { useNavigate } from 'react-router-dom';

// export const CustomerCard = (props) => {
//     const navigate = useNavigate()
//     return (
//         <div className="grid m-2 h-15 w-15 border-4 border-black-500 p-2">


//             <button className="mb-2"
//                 onClick={() => navigate(`${props.cardName}`)}>
//                 {props.cardName}
//             </button>



//         </div>
//     );
// }

import React from "react";
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";


export const CustomerCard = (props) => {
    const navigate = useNavigate()
    return (

        <Button onClick={() => navigate(`${props.cardName}`)} className="shadow-none bg-transparent">

<Card className="mt-6 w- bg-gradient-to-t from-gray-800">
      <CardHeader color="blue-gray" className="relative min-h-fit">
        <img 
          src={props.img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
      
        <Typography>
          {props.para}
        </Typography>
      </CardBody>
                <CardFooter className="mb-4">
                <Button>{props.cardName}</Button>
                    
                </CardFooter>
            </Card>
        </Button>
    );
}