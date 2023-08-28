import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export const CustomerCard = (props) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(`/customer/${props.cardName}`)}
      className="shadow-none bg-transparent "
    >
      <Card className="mt-6 max-w-[10rem] lg:max-w-[12rem] bg-gradient-to-t from-gray-800">
        <CardHeader color="blue-gray" className="relative ">
          <img className="w-fit h-fit" src={props.img} alt="card-image" />
        </CardHeader>
        <CardBody></CardBody>
        <CardFooter className=" mb-4">
          <Button>{props.cardName}</Button>
        </CardFooter>
      </Card>
    </Button>
  );
};
