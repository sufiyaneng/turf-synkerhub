import { Box, Flex, Image, Tag, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";
import EditTurf from "./EditTurf/index.tsx";
import { getDay } from "@/constants.ts";

const TrufProfile: React.FC = () => {
  const [turfData, setTurfData] = useState<any>(null);
  const [refresh, setRefresh] = useState(false);
  const toast = useToast();

  const fetchtTurfData = async () => {
    try {
      const resp = await axios.get("/api/turfprofile");
      setTurfData(resp?.data);
      console.log(resp.data);
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchtTurfData();
  }, [refresh]);

  return (
    <Flex
      height="430px"
      p={5}
      gap={5}
      bg="#FFFFFF"
      justifyContent="center"
      align="center"
    >
      <Flex>
        <Image
          width="650px"
          height="400px"
          objectFit="cover"
          src={
            turfData?.turfImage ||
            "https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          }
          alt="Caffe Latte"
        />
      </Flex>
      <Flex width="500px" height="400px" flexDirection="column" gap={6}>
        <Box fontSize="26px" fontWeight="600">
          {turfData?.name}
        </Box>

        <Box>{turfData?.address}</Box>

        <Box>+91 1234567890</Box>

        <Box>
          <Flex flexDirection="column" alignItems="flex-start">
            <Flex justifyContent="center" alignItems="center" gap={10}>
              <Box fontSize="15px" color="gray">
                Open At
              </Box>
              <Box fontSize="15px" color="gray">
                Close At
              </Box>
            </Flex>
            <Flex justifyContent="center" alignItems="center" gap={10}>
              <Box marginLeft={2}>{turfData?.openAt}</Box>
              <Box marginLeft={6}>{turfData?.closeAt}</Box>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Box fontSize="15px" color="gray">
            Days Open
          </Box>
          <Flex gap={2}>
            {turfData?.daysOpen?.sort().map((day: string) => {
              return (
                <Tag
                  key={day}
                  size="md"
                  variant="solid"
                  colorScheme="green"
                  borderRadius="2px"
                >
                  {getDay(day)}
                </Tag>
              );
            })}
          </Flex>
        </Box>

        <Flex width="65%">{turfData && <EditTurf turfData={turfData} setRefresh={setRefresh} />}</Flex>
      </Flex>
    </Flex>
  );
};

export default TrufProfile;
