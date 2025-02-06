import {
  Button,
  Flex,
  FormErrorMessage,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Counter from "./Counter";
import { useFormik } from "formik";
import { checkAvailabilitySchema } from "@/constants";
import axios from "../../../../axios/interceptor";
import { SlotBox } from "@/styles";

const CheckAvailability: React.FC = () => {
  const [count, setCount] = useState<number>(1);
  const [availabaleSlots, setAvailabaleSlots] = useState<any[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      slotDate: "",
    },
    validationSchema: checkAvailabilitySchema,
    onSubmit: async (values) => {
      try {
        const resp = await axios.post("/api/check-availability", {
          ...values,
          hours: count,
        });
        setAvailabaleSlots(resp?.data?.slots);
      } catch (err: any) {
        toast({
          title: "Failed",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
  console.log(availabaleSlots);
  return (
    <>
      <Flex justifyContent="center" alignItems="flex-end">
        <Flex>
          <Modal onClose={onClose} size="3xl" isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <form onSubmit={formik.handleSubmit}>
                  <Flex gap={4} alignItems="center">
                    <Input
                      name="slotDate"
                      width="250px"
                      type="date"
                      value={formik.values.slotDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>
                      {typeof formik.errors.slotDate === "string" &&
                        formik.errors.slotDate}
                    </FormErrorMessage>
                    <Counter count={count} setCount={setCount} />
                    <Button type="submit" colorScheme="blue">
                      Get Slots
                    </Button>
                  </Flex>
                </form>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Flex flexWrap="wrap">
                  {availabaleSlots?.map((slot: any) => {
                    return (
                      <>
                        <SlotBox>{slot.label}</SlotBox>
                      </>
                    );
                  })}
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
        <Button onClick={onOpen} variant="outline" colorScheme="blue">
          Check Availability
        </Button>
      </Flex>
    </>
  );
};

export default CheckAvailability;
