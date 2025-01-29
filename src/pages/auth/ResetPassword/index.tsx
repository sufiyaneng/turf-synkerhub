import { Box, Button, Flex, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import React from "react";
import { resetPasswordSchema } from "@/constants";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios/interceptor.ts";
import { useFormik } from "formik";


const ResetPassword: React.FC = () => {
  const {userId,resetPassCode} = useParams()
  const navigate = useNavigate();
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/reset-password", {userId,resetPassCode,password:values.password});
        toast({
          title: "Success!",
          description: 'Password Reset Succesfully Plese login',
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate('/auth/login')
      } catch (err: any) {
        toast({
          title: "Failed!",
          description: err.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });


  return (
    <Flex height="100%" direction="column" justifyContent="center" px="50px">
      <Box fontSize="36" fontWeight="500">
        Reset Your Password
      </Box>
      <Box>
        Create a new password for your account. Make sure it’s strong and easy
        for you to remember.
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap={10} mt={10}>
          <FormControl
            isInvalid={!!formik.errors.password && formik.touched.password}
          >
            <Input
              name="password"
              type="password"
              placeholder="Password"
              size="lg"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>
              {typeof formik.errors.password === "string" && formik.errors.password}
            </FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!formik.errors.password && formik.touched.password}
          >
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              size="lg"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <FormErrorMessage>
              {typeof formik.errors.confirmPassword === "string" && formik.errors.confirmPassword}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            width="fit-content"
            isDisabled={!formik.isValid || !formik.dirty || formik.isSubmitting}
          >
            Reset
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default ResetPassword;
