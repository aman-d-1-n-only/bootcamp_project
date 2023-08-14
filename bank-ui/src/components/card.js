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


        <Card className="mt-6 w-96 p-2 bg-white rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
            <CardHeader color="blue-gray" className="relative h-56">
                <img src={props.img}
                    alt="card-image"
                />
            </CardHeader>
            {/* <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                   Add Customer Details
                  </Typography>
                  
                </CardBody> */}
            <CardFooter className="pt-0 mt-6">
                <Button onClick={() => navigate('customerDetails')}>
                    {props.cardName}</Button>
            </CardFooter>
        </Card>
    );
}