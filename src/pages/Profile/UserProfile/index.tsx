import { Box, Button, Flex, Image, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState();
  const toast = useToast();

  const fetchtUserData = async () => {
    try {
      const resp = await axios.get("/api/userprofile");
      console.log(resp,'response');
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }

    useEffect(()=>{
        fetchtUserData()
    },[])
  };
  return (
    <Flex
      width="300px"
      p={5}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Box>
        <Image
          width="175px"
          height="175px"
          src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt="Green double couch with wooden legs"
          borderRadius="50%"
        />
      </Box>
      <Flex flexDirection="column">
        <Box fontSize="25px" fontWeight="500">
          Owesome Name
        </Box>
        <Box fontSize="15px">teamspartan012@gmail.com</Box>
      </Flex>
      <Button p="15px" width="fit-content" variant="outline" colorScheme="blue">
        Edit Profile
      </Button>
    </Flex>
  );
};

export default UserProfile;
