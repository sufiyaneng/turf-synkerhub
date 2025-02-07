import { Tile } from "@/styles";
import { Box, Flex, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";
import { MdGroupWork, MdOutlineRadioButtonChecked } from "react-icons/md";
import { CgMediaLive } from "react-icons/cg";
import moment from "moment";

const Statistics: React.FC = () => {
  const [bookingData, setBookingData] = useState<any>();
  const toast = useToast();
  console.log(bookingData, "booking data");
  const fetchBookingData = async () => {
    try {
      const resp = await axios.get("/api/statistics");
      setBookingData(resp.data);
    } catch (err: any) {
      toast({
        title: "Login Failed!",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchBookingData();
  }, []);

  return (
    <>
      <Flex justifyContent="center" alignItems="center" gap={4}>
        <Tile to="#">
          <Flex flexDirection="column">
            <Box fontSize="25px" fontWeight="500">
              {bookingData?.[0]?.count || 0}
            </Box>
            <Box width="100px" fontSize="10px">
              {bookingData?.[0]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
        <Tile to="#">
          <Flex flexDirection="column">
            <Box fontSize="25px" fontWeight="500">
              {bookingData?.[1]?.count || 0}
            </Box>
            <Box width="100px" fontSize="10px">
              {bookingData?.[1]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
        <Tile to="#">
          <Flex flexDirection="column">
            <Box fontSize="25px" fontWeight="500">
              {bookingData?.[2]?.count || 0}
            </Box>
            <Box width="100px" fontSize="10px">
              {bookingData?.[2]?.title || "N/A"}
            </Box>
          </Flex>
        </Tile>
        {bookingData?.[3]?.status && (
          <Tile to="#">
            <Flex flexDirection="column">
              <Flex justifyContent={"space-between"} alignItems="center">
                <HStack>
                  <Box
                    width="15px"
                    height="15px"
                    borderRadius={50}
                    backgroundColor="red"
                  ></Box>
                  <Text fontSize="3xl" color="tomato">
                    {bookingData?.[3]?.status || ""}
                  </Text>
                </HStack>

                <Text fontSize="md">
                  {" "}
                  {moment(bookingData?.[3]?.startTime, "HH:mm").format(
                    "hh:mm A"
                  )}
                </Text>
                
                <Text fontSize="md">
              {"-"}
                </Text>
                <Text fontSize="md">
                  {" "}
                  {moment(bookingData?.[3]?.endTime, "HH:mm").format("hh:mm A")}
                </Text>
              </Flex>

              <Box width="100px" fontSize="10px">
                {bookingData?.[3]?.bookerName || "N/A"}
              </Box>
            </Flex>
          </Tile>
        )}
      </Flex>
    </>
  );
};

export default Statistics;
