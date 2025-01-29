import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import VerifyEmail from "./VerifyEmail";
import ResetPassword from "./ResetPassword";
import ForgotPassword from "./ForgotPassword";

const Auth: React.FC = () => {
  return(
    <Flex justifyContent='space-between'  height='100vh'>
        <Box width={{base:'100%', lg:'50%'}}>
              <Routes>
                  <Route path="login" element={<Login/>}/>
                  <Route path="signup" element={<Signup/>}/>
                  <Route path="verify/:userId/:verificationCode" element={<VerifyEmail/>}/>
                  <Route path="forgot-password" element={<ForgotPassword/>}/>
                  <Route path="/reset-password/:userId/:resetPassCode" element={<ResetPassword/>}/>
                  <Route path="/" element={<Navigate to="login" />} />
              </Routes>
        </Box>
        <Box display={{base:'none', lg:'block'}}  width={{base:'100%', lg:'50%'}} >
           <Image src="https://media.istockphoto.com/id/171309616/photo/green-grass-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=YYveu5MDHek3HCBj3Y4jZjsgB9K8_Rgigv86n_-RGLE=" alt="grass_image" width='100%' height="100%" objectFit='cover'/>
        </Box>
    </Flex>
  )
};

export default Auth;
