import { Box, Flex, Input, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Tabs from "./Tabs";
import moment from "moment";

const Toolbar: React.FC<{
  type: string;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setSlotDate: React.Dispatch<React.SetStateAction<string>>;
  setSearchedByBooker: React.Dispatch<React.SetStateAction<string>>;
  slotDate: string;
  searchedByBooker: string;
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

      <Flex gap={4} p={2}>
        <Stack>
          <Text fontSize="xs">Search By Booker Name</Text>
          <Input
            name="bookerName"
            size="sm"
            type={"text"}
            placeholder="Search By Booker Name"
            value={props.searchedByBooker || ""}
            onChange={(e) => {
              props.setSearchedByBooker(e.target.value);
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
            value={
              props.slotDate
                ? moment(props.slotDate, "DD-MM-YYYY").format("YYYY-MM-DD")
                : ""
            }
            onChange={(e) => {
              const formattedDate = moment(e.target.value, "YYYY-MM-DD").format(
                "DD-MM-YYYY"
              );
              props.setSlotDate(formattedDate);
            }}
          />
        </Stack>

        {/* <Stack>
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
        </Stack> */}
      </Flex>
    </Flex>
  );
};

export default Toolbar;
