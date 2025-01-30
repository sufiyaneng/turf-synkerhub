import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import RadioButton from "./RadioButton";
import axios from "../../../axios/interceptor.ts";
import { useFormik } from "formik";
import { createBookingSchema } from "@/constants.ts";
import moment from 'moment'

const CreateEditDrawer: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>();
  const [availableSlots, setAvailableSlots] = useState([]);

  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      bookerName: "",
      slotDate:  moment().format('YYYY-MM-DD'),
      slotTime: "1",
      amount: "",
    },
    validationSchema: createBookingSchema,
    onSubmit: async (values) => {
      console.log('inside')
      try {
        await axios.post("/api/createbooking", {...values,amount:Number(values.amount),slotTime:Number(values.slotTime),startTime:selectedSlot?.startTime,endTime:selectedSlot?.endTime});
        toast({
          title: "Booking Successful",
          description: "Your booking has been confirmed!",
          status: "info",
          duration: 9000,
          isClosable: true,
        });
      } catch (err: any) {
        toast({
          title: "Booking Failed!",
          description: "Something went wrong!",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
  const checkAvailability = async () => {
    
    try {
      const response = await axios.post("/api/check-availability", {
        slotDate: formik.values.slotDate || '',
        hours: Number(formik.values.slotTime )|| null,
      });
      setAvailableSlots(response?.data?.slots);
    } catch (err: any) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    if (isOpen) checkAvailability();
  }, [isOpen,formik.values.slotDate, formik.values.slotTime]);
  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size={"lg"}
      >
        <DrawerOverlay />
        <DrawerContent>
        <form onSubmit={formik.handleSubmit}>

          <DrawerCloseButton />
          <DrawerHeader>Booking</DrawerHeader>

          <DrawerBody>
              <Box p={5}>
                <VStack align="start" spacing={4}>
                  <Box>
                    <FormControl
                      isInvalid={
                        !!formik.errors.bookerName && formik.touched.bookerName
                      }
                    >
                      <Text fontWeight="bold">Booker Name</Text>
                      <Input
                        name="bookerName"
                        placeholder="Booker Name"
                        value={formik.values.bookerName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {typeof formik.errors.bookerName === "string" &&
                          formik.errors.bookerName}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <HStack spacing={4}>
                    <Box>
                      <FormControl
                        isInvalid={
                          !!formik.errors.slotDate && formik.touched.slotDate
                        }
                      >
                        <Text fontWeight="bold">Slot Date</Text>
                        <Input
                          name="slotDate"
                          type={"date"}
                          placeholder="2hr"
                          value={formik.values.slotDate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                          {typeof formik.errors.slotDate === "string" &&
                            formik.errors.slotDate}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl
                        isInvalid={
                          !!formik.errors.slotTime && formik.touched.slotTime
                        }
                      >
                        <Text fontWeight="bold">Slot Time</Text>
                        <Input type="number" min={1} max={5}  placeholder="2" value={formik.values.slotTime} name="slotTime"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}  onKeyDown={(e) => {
                            if (!["ArrowUp", "ArrowDown", "Tab"].includes(e.key)) {
                              e.preventDefault();
                            }
                          }}/>
                        <FormErrorMessage>
                          {typeof formik.errors.slotTime === "string" &&
                            formik.errors.slotTime}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl
                        isInvalid={
                          !!formik.errors.amount &&
                          formik.touched.amount
                        }
                      >
                        <Text fontWeight="bold">Amount Paid</Text>
                        <Input placeholder="0" value={formik.values.amount} name="amount"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}/>
                        <FormErrorMessage>
                          {typeof formik.errors.amount === "string" &&
                            formik.errors.amount}
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  </HStack>
                </VStack>
              </Box>
          
            {/* Slot Grid */}
            <Box mt={5}>
              <Flex wrap="wrap" gap={4}>
                {availableSlots?.map((slot: any) => {
                  return (
                    <RadioButton
                    name="radio"
                    key={slot?.label}
                    label={slot?.label}
                    value={slot?.value}
                    checked={selectedSlot?.value === slot?.value}
                    onChange={() => {
                      setSelectedSlot(slot);
                    }}
                  />
                  );
                })}
              </Flex>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              width="fit-content"
              isDisabled={
                !formik.isValid || !formik.dirty || formik.isSubmitting
              }
              colorScheme="blue"
            >
              Create Booking
            </Button>
            
          </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Open
      </Button>
    </>
  );
};

export default CreateEditDrawer;
