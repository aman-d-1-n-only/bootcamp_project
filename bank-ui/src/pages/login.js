import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
import LoginImage from "../img/LoginImage.png";
import Profile1 from "../img/Profile1.png"

export const Login = () => {
  const navigate = useNavigate();
  const [loginCredentials, setloginCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    setloginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
    if (e.target.id === "password") {
      if (e.target.value.length < 8) {
        setErrorMessage("Password length should not be less than 8.");
      }
      if (e.target.value.length >= 8) {
        setErrorMessage("");
      }
    }
  };
  const handleClick = (e) => {
    if (loginCredentials.username === "" || loginCredentials.password === "") {
      setErrorMessage("Both username and password are required ");
    } else {
      e.preventDefault();

      axios
        .post("http://localhost:5165/api/admin/login", loginCredentials)
        .then((response) => {
          // console.log(response.data);
          sessionStorage.setItem("jwtToken", response.data);

          if (response.data) {
            navigate("customer");

            console.log(response.data, "here");
          }
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status) {
              // console.log(error.response,"here")
              console.log(e.target, "here");
              setErrorMessage("Invalid Credentials. Please Try again");
            }
          }
        });
    }
  };

  return (
    <>
      <div
        className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover"
        // style={{ backgroundImage: `url(${LoginImage})` }}
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')", }}>
           
      
        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <Card className="w-96 ">
          <CardHeader
            variant="gradient"
            color="gray"
            className=" mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form>
            <CardBody className="flex flex-col gap-4">
              <Input
                label="Username"
                size="lg"
                id="username"
                onChange={handleChange}
                required
                name="username"
                type="username"
                autoComplete="email"
              />
              <Input
                label="Password"
                size="lg"
                onChange={handleChange}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
              <div className="text-red-600 mt-3 text-sm"> {errorMessage} </div>
            </CardBody>
            <CardFooter className="pt-0 mb-4">
              <Button variant="gradient" fullWidth onClick={handleClick}>
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};
