import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
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

export const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5165/api/admin/login",
        data
      );

      if (response.data) {
        sessionStorage.setItem("jwtToken", response.data);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response, "here");
        setErrorMessage("Invalid Credentials! Please Try again.");
      }
    }
  };

  return (
    <>
      {/* -------!!! if login image doesn't work please comment it and uncomment below link ----- */}
      <div
        className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${LoginImage})` }}
      >
        {/* style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')" }}>  */}

        <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className=" mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardBody className="flex flex-col gap-4">
              <Controller
                control={control}
                name="username"
                rules={{ required: "Username is required" }}
                render={({ field }) => (
                  <Input
                    label="Username"
                    size="lg"
                    id="username"
                    required
                    {...field}
                    onKeyUp={() => {
                      trigger("username");
                    }}
                  />
                )}
              />
              {errors.username && (
                <Typography
                  variant="small"
                  color="red"
                  className="text-sm -mt-2"
                >
                  {errors.username.message}
                </Typography>
              )}
              <Controller
                control={control}
                name="password"
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password should be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Password"
                    size="lg"
                    id="password"
                    required
                    {...field}
                    type="password"
                    onKeyUp={() => {
                      trigger("password");
                    }}
                  />
                )}
              />
              {errors.password && (
                <Typography
                  variant="small"
                  color="red"
                  className="text-sm -mt-2"
                >
                  {errors.password.message}
                </Typography>
              )}
              <div className="text-red-600 mt-2 text-sm">{errorMessage}</div>
            </CardBody>
            <CardFooter className="pt-0 mb-4">
              <Button variant="gradient" fullWidth type="submit">
                Sign In
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
};
