import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";

export const CustomerCard = (props) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(`/customer/${props.cardName}`)}
      className="shadow-none bg-transparent min-w-fit "
    >
      <Card className="mt-6 max-w-[10rem] lg:max-w-[12rem] min-w-fit bg-gradient-to-t from-gray-800">
        <CardHeader color="blue-gray" className="relative ">
          <img className="w-fit h-fit" src={props.img} alt="card-image" />
        </CardHeader>
        <CardBody></CardBody>
        <CardFooter className=" mb-4">
          <Button className="">{props.cardName}</Button>
        </CardFooter>
      </Card>
    </Button>
  );
};
