import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
   

export const Login = () => {
    const navigate = useNavigate();
    return (<>
    {/* <div className="h-screen flex justify-center items-center"> */}
    <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-gray-500 bg-no-repeat bg-cover"
	style={{backgroundImage: "url('https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')",}}>
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
        <Input label="Username/Email" size="lg" id="email"
          required
                            name="email"
                            type="email"
                            autoComplete="email"
                          />
        <Input label="Password" size="lg" 
         id="password"
         name="password"
         type="password"
         autoComplete="current-password"
         required/>
        <div className="-ml-2.5">
          <Checkbox label="Remember Me" />
        </div>
      </CardBody>
      <CardFooter className="pt-0">
        <Button variant="gradient"   type="submit" fullWidth onClick={() => navigate('customer')}>
          Sign In
        </Button>
        {/* <Typography variant="small" className="mt-6 flex justify-center">
          Don&apos;t have an account?
          <Typography
            as="a"
            href="#signup"
            variant="small"
            color="blue-gray"
            className="ml-1 font-bold"
          >
            Sign up
          </Typography>
        </Typography> */}

<Typography variant="small" className="mt-6 flex justify-center">
        Forgot Passoword?
        </Typography>
      </CardFooter>
      </form>
    </Card>
    </div>
    </>)

}
