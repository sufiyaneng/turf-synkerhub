import { Box, Button, Flex, Image, Tag } from "@chakra-ui/react";
import React from "react";

const TrufProfile: React.FC = () => {
  return (
    <Flex p={5} gap={5} justifyContent="center" align="center">
      <Flex>
        <Image
          width="650px"
          height="400px"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
      </Flex>
      <Flex width='500px' height='400px' flexDirection="column" gap={6}>
        <Box fontSize="26px" fontWeight="600">
          The perfect latte
        </Box>

        <Box>
          Dummy Area Near Dummy Landmark Behind xyz shope. <br />
          Parbhani - 431401
        </Box>

        <Box>+91 1234567890</Box>

        <Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Flex gap={10}>
              <Box fontSize="15px" color="gray">
                Open At
              </Box>
              <Box fontSize="15px" color="gray">
                Close At
              </Box>
            </Flex>
            <Flex gap={10}>
              <Box>08:00AM</Box>
              <Box>10:00PM</Box>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Box fontSize="15px" color="gray">
            Days Open
          </Box>
          <Flex gap={2}>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Mon
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Tue
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Wed
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Thu
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Fri
            </Tag>
            <Tag
              size="md"
              variant="solid"
              colorScheme="green"
              borderRadius="2px"
            >
              Sat
            </Tag>
            <Tag size="md" variant="solid" colorScheme="red" borderRadius="2px">
              Sun
            </Tag>
          </Flex>
        </Box>

        <Button width="fit-content" variant="outline" colorScheme="blue">
          Edit Truf Profile
        </Button>
      </Flex>
    </Flex>
  );
};

export default TrufProfile;
