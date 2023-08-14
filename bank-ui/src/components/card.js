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

        <Button onClick={() => navigate(`${props.cardName}`)} >
            <Card className="m-2 mt-6 w-96 p-2 bg-indigo-200 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
                <CardHeader className="bg-white-100 place-items-center relative h-56">
                    <img src="data:image/png;base64,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"
                        alt="card"
                    />

                </CardHeader>

                {/* <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                   Add Customer Details
                  </Typography>
                  
                </CardBody> */}
                <CardFooter className="pt-0 mt-6">

                    {props.cardName}
                </CardFooter>
            </Card>
        </Button>
    );
}