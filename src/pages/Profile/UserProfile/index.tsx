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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "../../../axios/interceptor.ts";
import { createUserProfileUpdateSchema } from "@/constants.ts";

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>();
  const [userName, setUsername] = useState();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createUserProfileUpdateSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
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

  useEffect(() => {
    if (userData?.name) {
      formik.setFieldValue("name", userData.name);
    }
  }, [userData]);
  

  const fetchtUserData = async () => {
    try {
      const resp = await axios.get("/api/userprofile");
      setUserData(resp?.data);
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
    fetchtUserData();
  }, []);

  console.log(userData)

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  console.log(userData);
  return (
    <Flex
      width="300px"
      bg='#FFFFFF'
      p={5}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
    >
      <Box>
        <Image
          width="175px"
          height="175px"
          src={ userData?.userImage ||
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          alt="Green double couch with wooden legs"
          borderRadius="50%"
        />
      </Box>
      <Flex flexDirection="column">
        <Box fontSize="25px" fontWeight="500">
          {userData?.name}
        </Box>
        <Box fontSize="15px">{userData?.email}</Box>
      </Flex>
      <Button
        onClick={onOpen}
        p="15px"
        width="fit-content"
        variant="outline"
        colorScheme="blue"
      >
        Edit Profile
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
                        onChange={(e) => formik.setFieldValue("name", e.target.value)}
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
                      <Button type="submit" colorScheme="blue" onClick={onClose}>
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
  );
};

export default UserProfile;
