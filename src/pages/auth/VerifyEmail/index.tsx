import { Flex, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from '../../../axios/interceptor.ts';


const VerifyEmail: React.FC = () => {
  const {userId, verificationCode} = useParams();
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
  const toast = useToast()

  const verifyEmail = async () => {
    try {
        await axios.post("/api/verify-email", {
        userId,
        verificationCode,
      });
      //toast
      toast({
        title: 'Verification Succes',
        description: "The verification Succesfully.",
        status: 'info',
        duration: 9000,
        isClosable: true,
        
      })
      setTimeout(() => navigate("/auth/login"), 2000);
    } catch (err:any) {
     //toast
     toast({
        title: 'Varification Failed!',
        description: "Something went wrong!",
        status: 'error',
        duration: 9000,
        isClosable: true,
        
      })
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center" flexDirection="column">
      {loading && (
        <Spinner
          thickness="7px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      )}
    </Flex>
  );
};

export default VerifyEmail;
