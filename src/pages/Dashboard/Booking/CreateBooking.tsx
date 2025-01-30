import React, { useState } from "react";
import {
  Box,
  Input,
  Text,
  VStack,
  HStack,
  Flex,
  useRadioGroup 
} from "@chakra-ui/react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";

const CreateBooking = () => {
  const [selectedSlot, setSelectedSlot] = useState("08:00AM - 09:00AM");
  const [selectedDate, setSelectedDate] = useState(new Date());

  const slots = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "01:00 AM - 02:00 AM",
    "02:00 AM - 03:00 AM",
    "03:00 AM - 04:00 AM",
    "04:00 AM - 05:00 PM",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "slot",
    value: selectedSlot,
    onChange: setSelectedSlot,
  });
  const bookedSlot = "08:00AM - 09:00AM"; 

  return (
    <Box p={5}>
      <VStack align="start" spacing={4}>
        <Box >
          <Text fontWeight="bold">Booker Name</Text>
          <Input placeholder="Team Spartan" />
        </Box>
        <HStack spacing={4}>
          <Box>
            <Text fontWeight="bold">Slot Date</Text>
            <Box
              border="1px"
              borderColor="gray.300"
              borderRadius="md"
              p={2}
              cursor="pointer"
              w="fit-content"
            >
              <DateTimePicker
                // onChange={"setSelectedDate"}
                value={selectedDate}
                format="dd MMM yyyy"
                calendarIcon={null}
                clearIcon={null}
              />
            </Box>
          </Box>
          <Box>
            <Text fontWeight="bold">Slot Time</Text>
            <Input placeholder="2hr" />
          </Box>
          <Box>
            <Text fontWeight="bold">Amount Paid</Text>
            <Input placeholder="600" />
          </Box>
        </HStack>
      </VStack>

      {/* Slot Grid */}
      <Box mt={5}>
      <Flex wrap="wrap" gap={4} {...getRootProps()}>
        {slots.map((slot, index) => {
          const radio = getRadioProps({ value: slot });
          return (
            <Box
              as="label"
              key={index}
              w="23%"
              border="1px solid"
              borderColor={selectedSlot === slot ? "blue.500" : "gray.300"}
              backgroundColor={selectedSlot === slot ? "blue.500" : "gray.300"}
              borderRadius="md"
              p={2}
              cursor="pointer"
              textAlign="center"
              _hover={{
                borderColor: "blue.400",
              }}
              _checked={{
                borderColor: "blue.500",
                bg: "blue.50",
              }}
              {...radio}
            >
              <input
                {...radio}
                type="radio"
                style={{ display: "none" }} 
              />
              {slot}
            </Box>
          );
        })}
      </Flex>
    </Box>
    </Box>
  );
};

export default CreateBooking;
