import { Tile } from "@/styles";
import { Box, Flex, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";

const Statistics: React.FC = () => {
    const [bookingData, setBookingData] = useState<any>()
    const toast = useToast()

    const fetchBookingData = async()=>{ 
        try{

            
        const resp = await axios.get('/api/statistics')
        setBookingData(resp.data)

        }catch(err:any){
            toast({
                title: "Login Failed!",
                description: err.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
        }

    }

    useEffect(()=>{
        fetchBookingData()
    },[])
    console.log(bookingData)

  return (
    <>
      <Flex justifyContent='center' alignItems='center' gap={4}>
        <Tile to="#">
          <Flex flexDirection='column' >
            <Box fontSize="25px" fontWeight="500">
            {bookingData?.[0]?.count || 0}
            </Box>
            <Box width='100px' fontSize='10px'>
            {bookingData?.[0]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
        <Tile to="#">
          <Flex flexDirection='column'  >
            <Box fontSize="25px" fontWeight="500">
            {bookingData?.[1]?.count || 0}
            </Box>
            <Box width='100px' fontSize='10px'>
            {bookingData?.[1]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
        <Tile to="#">
          <Flex flexDirection='column'  >
            <Box fontSize="25px" fontWeight="500">
            {bookingData?.[2]?.count || 0}
            </Box>
            <Box width='100px' fontSize='10px'>
            {bookingData?.[2]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
      </Flex>
    </>
  );
};

export default Statistics;
