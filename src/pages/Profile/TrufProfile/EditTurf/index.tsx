import { createTurfProfileUpdateSchema, days, getDay } from "@/constants";
import {
  Box,
  Button,
  Checkbox,
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
import axios from "../../../../axios/interceptor";

const EditTurf: React.FC<{ turfData: any; setRefresh: any }> = (props) => {
  const [file, setFile] = useState<File | null>(null);
  const [daysOpen, setDaysOpen] = useState<string[]>([]);
  const [preview, setPreview] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toast = useToast();

  const { name, address, openAt, closeAt } = props?.turfData;

  useEffect(()=>{
    setDaysOpen(props.turfData.daysOpen);
  },[props.turfData])

  const formik = useFormik({
    initialValues: {
      name,
      address,
      openAt,
      closeAt,
    },
    validationSchema: createTurfProfileUpdateSchema,
    onSubmit: async (values: any) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("address", values.address);
      formData.append("openAt", values.openAt);
      formData.append("closeAt", values.closeAt);
      formData.append("daysOpen", JSON.stringify(daysOpen));
      if (file) formData.append("Image", file);
      try {
        await axios.put("/api/editturfprofile", formData);
        props.setRefresh((prev: boolean) => !prev);
        toast({
          title: "Update",
          description: "udate successfully",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onClose();
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

  const handleCheckboxChange = (day: string) => {
    if (daysOpen.includes(day)) {
      const days = daysOpen.filter((d: string) => d !== day);
      setDaysOpen(days)
    } else {
        setDaysOpen([...daysOpen, day])
    }
  };

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  console.log(daysOpen);
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Turf Profile</ModalHeader>
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
                      width="350px"
                      height="190px"
                      src={
                        preview ||
                        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                      }
                      alt="Green double couch with wooden legs"
                      borderRadius="5px"
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
                      name="name"
                      value={formik.values.name}
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

                  <FormControl>
                    <Input
                      name="address"
                      placeholder="address"
                      value={formik.values.address}
                      onChange={(e) =>
                        formik.setFieldValue("address", e.target.value)
                      }
                      onBlur={formik.handleBlur}
                    />
                    <FormErrorMessage>
                      {typeof formik.errors.address === "string" &&
                        formik.errors.address}
                    </FormErrorMessage>
                  </FormControl>

                  <Flex justifyContent="space-between" align="center" gap={20}>
                    <FormControl>
                      <Input
                        name="openAt"
                        placeholder="openAt"
                        type="time"
                        value={formik.values.openAt}
                        onChange={(e) =>
                          formik.setFieldValue("openAt", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {typeof formik.errors.openAt === "string" &&
                          formik.errors.openAt}
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl>
                      <Input
                        name="closeAt"
                        placeholder="closeAt"
                        type="time"
                        value={formik.values.closeAt}
                        onChange={(e) =>
                          formik.setFieldValue("closeAt", e.target.value)
                        }
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {typeof formik.errors.closeAt === "string" &&
                          formik.errors.closeAt}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>

                  <Flex
                    flexDirection="column"
                    justifyContent="flex-start"
                    gap={2}
                  >
                    <Box>Days Open</Box>
                    <Flex gap={5}>
                      
                        {days?.map((day: string) => {
                            console.log(daysOpen.includes(day))
                          return (
                            <Checkbox
                            key={String(day)}
                            name={String(day)}
                            value={String(day)}
                            onChange={() => handleCheckboxChange(String(day))}
                            isChecked={daysOpen.includes(String(day))}
                            >
                              {getDay(day)}
                            </Checkbox>
                          );
                        })}
                 
                    </Flex>
                  </Flex>

                  <Flex justifyContent="center" alignItems="center" gap={5}>
                    <Button
                      variant="ghost"
                      colorScheme="blue"
                      mr={3}
                      onClick={onClose}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" colorScheme="blue">
                      Update
                    </Button>
                  </Flex>
                </Flex>
              </form>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
      <Button
        onClick={onOpen}
        width="fit-content"
        variant="outline"
        colorScheme="blue"
      >
        Edit Truf Profile
      </Button>
    </>
  );
};

export default EditTurf;
