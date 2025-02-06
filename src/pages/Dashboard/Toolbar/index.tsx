import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Tabs from "./Tabs";
import CheckAvailability from "./CheckAvailability";

const Toolbar: React.FC<{
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
}> = (props) => {
    

  return (
    <Flex
      justifyContent={"space-between"}
      alignItems="flex-end"
      background="white"
      boxShadow={"sm"}
    >
      <Box display="flex" alignItems="flex-end" alignSelf="flex-end">
        <Tabs type={props.type} setType={props.setType} />
      </Box>

      <Flex justifyContent='center' alignItems='center' gap={4} p={2}>
      <Stack>
        <Text fontSize="xs">Search By Booker Name</Text>
        <Input
          name="bookerName"
          size="sm"
          type={"text"}
          placeholder="Search By Booker Name"
          value={""}
          onChange={() => {
            ("");
          }}
        />
        </Stack>
      <Stack>
        <Text fontSize="xs">Slot Date</Text>
        <Input
          name="slotDate"
          size="sm"
          type={"date"}
          placeholder="Slot Date"
          value={""}
          onChange={() => {
            ("");
          }}
        />
        </Stack>

        <Stack>
          <Text fontSize="xs">Booking Date</Text>
          <Input
            name="bookingDate"
            size="sm"
            type={"date"}
            placeholder="Booking Date"
            value={""}
            onChange={() => {
              ("");
            }}
          />
        </Stack>
        <Stack>
          <CheckAvailability/>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default Toolbar;
