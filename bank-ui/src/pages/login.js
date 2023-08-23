import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button,
} from "@material-tailwind/react";
import axios from 'axios';
import LoginImage from "../img/LoginImage.png";

export const Login = () => {
    const navigate = useNavigate();
    const [loginCredentials, setloginCredentials] = useState({
        username: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const handleChange = (e) => {
        setloginCredentials({ ...loginCredentials, [e.target.name]: e.target.value });
        if (e.target.id === "password")
        { 
       if (e.target.value.length < 8) {
         setErrorMessage("Password length should not be less than 8.")};
         if (e.target.value.length >= 8) {
            setErrorMessage("")};
        }
    };
    const handleClick = (e) => {
        
        if (loginCredentials.username === "" || loginCredentials.password === "") {

        }
        else {
            e.preventDefault();
            // console.log(loginCredentials);
            // axios.post('http://localhost:5165/api/admin/signUp', loginCredentials).then(res => {
            //     // console.log(res.data);
            //     setvalidloginCredentials(res.data);
            // console.log(validloginCredentials);

            axios.post('http://localhost:5165/api/admin/login', loginCredentials).then(response => {
                // console.log(response.data);
                sessionStorage.setItem('jwtToken', response.data)

                if (response.data) {
                    navigate('customer');
                    console.log(response.data,"here");
                    // if (e.target.value.length === 0) {
                        
                    //     setErrorMessage("Both username and password are required ")};
                }
            }).catch(function (error) {
                if (error.response) {
                    if (error.response.status) {
                        // alert("Invalid Credentials. Please Try again");
                        setErrorMessage("Invalid Credentials. Please Try again");
                        if (e.target.value.length === 0) {
            // console.log(e.target,"here")
            setErrorMessage("Both username and password are required ")};
                    }
                }
            })

        }

    };
    // })
    return (<>
        <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8  bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(${LoginImage})`}}>
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
                        <Input label="Username" size="lg" id="username" onChange={handleChange}
                            required
                            name="username"
                            type="username"
                            autoComplete="email"
                        />
                        <Input label="Password" size="lg" onChange={handleChange}
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required />
                        <div className='text-red-600 mt-3 text-sm'> {errorMessage} </div>
                           
                    </CardBody>
                    <CardFooter className="pt-0 mb-4">
                        <Button variant="gradient" type="submit" fullWidth onClick={handleClick}>
                            Sign In
                        </Button>        
                    </CardFooter>
                </form>
            </Card>
        </div>
        </>
    )
}