import { recoverMailSchema } from "@/constants";
import { Box, Button, Flex, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios/interceptor.ts";


const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  
    const formik = useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: recoverMailSchema,
      onSubmit: async (values) => {
        try {
          await axios.post("/api/forgot-password", values);
          toast({
            title: 'Verify Email',
            description: "The Reset Password link is sent to your email.",
            status: 'info',
            duration: 9000,
            isClosable: true,
            
          })
          navigate('/auth/login')
        } catch (err: any) {
          toast({
            title: "Enter Valide Mail!",
            description: 'Something went wrong',
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    });

  return (
    <Flex height='100%' direction="column" justifyContent='center' px= '50px'>
        <Box fontSize="36" fontWeight="500">
          Welcome Back!
        </Box>
        <Box>
        Access your dashboard, manage bookings, and streamline turf operations all in one place. <br /> Log in to keep your turf running smoothly!
        </Box>
        <form onSubmit={formik.handleSubmit}>
            <Flex direction="column" gap={10} mt={10}>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <Input
                name="email"
                placeholder="Email"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>
                {typeof formik.errors.email === "string" && formik.errors.email}
              </FormErrorMessage>
            </FormControl>
        
            <Button
              type="submit"
              width="fit-content"
              isDisabled={
                !formik.isValid || !formik.dirty || formik.isSubmitting
              }
            >
              Recover
            </Button>
            </Flex>
        </form>
      </Flex>
  );
};

export default ForgotPassword;
