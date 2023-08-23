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

        <Button onClick={() => navigate(`${props.cardName}`)} className="shadow-none bg-transparent ">
<Card className="mt-6 w- max-w-xs bg-gradient-to-t from-gray-800">
      <CardHeader color="blue-gray" className="relative">
        <img className="w-fit h-fit"
          src={props.img}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
      </CardBody>
                <CardFooter className=" mb-4">
                <Button>{props.cardName}</Button>
                    
                </CardFooter>
            </Card>
        </Button>
    );
}