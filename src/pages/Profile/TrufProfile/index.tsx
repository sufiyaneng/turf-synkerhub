import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";
import { useFormik } from "formik";
import { createTurfProfileUpdateSchema } from "@/constants";
import { address } from "framer-motion/client";

const TrufProfile: React.FC = () => {
  const [turfData, setTurfData] = useState<any>();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: '',
      openAt : '',
      closeAt : '',
      daysOpen : []
    },
    validationSchema: createTurfProfileUpdateSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("openTime", values.openAt);
      formData.append("closeTime", values.closeAt);
      values.daysOpen.forEach((day) => formData.append("daysOpen[]", day));
      if (file) formData.append("Image", file);
      try {
        await axios.put("/api/edituserprofile", formData);
        toast({
          title: "Update",
          description: "udate successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } catch (err: any) {
        toast({
          title: "Update Failed!",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });

  const fetchtTurfData = async () => {
    try {
      const resp = await axios.get("/api/turfprofile");
      setTurfData(resp?.data);
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
  }, []);

  console.log(turfData, "turfdata");

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
          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
          alt="Caffe Latte"
        />
      </Flex>
      <Flex width="500px" height="400px" flexDirection="column" gap={6}>
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

        <Button
          onClick={onOpen}
          width="fit-content"
          variant="outline"
          colorScheme="blue"
        >
          Edit Truf Profile
        </Button>
        <Flex>
          <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Update Your Profile</ModalHeader>
              <ModalCloseButton />
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                gap={10}
              >
                <ModalBody pb={6} mb={8}>
                  <form onSubmit={formik.handleSubmit}>
                    <Flex
                      direction="column"
                      justifyContent="center"
                      alignItems="center"
                      gap={5}
                    >
                      <FormControl>
                        <Image
                          width="175px"
                          height="175px"
                          src={
                            preview ||
                            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                          }
                          alt="Green double couch with wooden legs"
                          borderRadius="50%"
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) => handleFileChange(e)}
                          width={75}
                          bg={"blue"}
                          placeholder="Update Image"
                        />
                      </FormControl>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          value={userName || formik.values.name}
                          onChange={(e) =>
                            formik.setFieldValue("name", e.target.value)
                          }
                          onBlur={formik.handleBlur}
                        />
                        <FormErrorMessage>
                          {typeof formik.errors.name === "string" &&
                            formik.errors.name}
                        </FormErrorMessage>
                      </FormControl>
                      <Flex justifyContent="center" alignItems="center" gap={5}>
                        <Button
                          variant="ghost"
                          colorScheme="blue"
                          mr={3}
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          colorScheme="blue"
                          onClick={onClose}
                        >
                          Update
                        </Button>
                      </Flex>
                    </Flex>
                  </form>
                </ModalBody>
              </Flex>
            </ModalContent>
          </Modal>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TrufProfile;
