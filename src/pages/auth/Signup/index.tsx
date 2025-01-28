import { Box, Button, Flex, Input, FormErrorMessage, FormControl, useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../../../constants.ts";
import axios from '../../../axios/interceptor.ts';

const Signup: React.FC = () => {

  const naviagate = useNavigate();
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      name: "",
      turfName: "",
      email: "",
      password: "",
    },
    validationSchema:signupSchema,
    onSubmit:async (values) => {
      try{
        await axios.post('/api/users',values);
        naviagate('/auth/verify')
      }catch(err:any){
        toast({
          title: 'Signup Failed!',
          description: "Something went wrong!",
          status: 'error',
          duration: 9000,
          isClosable: true,
          
        })
      }
    },
  });

  return (
    <>
      <Flex height="100%" direction="column" justifyContent="center" px="50px">
        <Box fontSize="36" fontWeight="500">Get Started!</Box>
        <Box>
          Access your dashboard, manage bookings, and streamline turf operations all in one place.<br />Sign up to keep your turf running smoothly!
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Flex direction="column" gap={10} mt={10}>
            <FormControl isInvalid={!!formik.errors.name && formik.touched.name}>
              <Input
                name="name"
                placeholder="Name"
                size="lg"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{typeof formik.errors.name === "string" && formik.errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.turfName && formik.touched.turfName}>
              <Input
                name="turfName"
                placeholder="Turf Name"
                size="lg"
                value={formik.values.turfName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{typeof formik.errors.turfName === "string" && formik.errors.turfName}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.email && formik.touched.email}>
              <Input
                name="email"
                placeholder="Email"
                size="lg"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{typeof formik.errors.email === "string" && formik.errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!formik.errors.password && formik.touched.password}>
              <Input
                name="password"
                type="password"
                placeholder="Password"
                size="lg"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{typeof formik.errors.password === "string" && formik.errors.password}</FormErrorMessage>
            </FormControl>

            <Button type="submit" width="fit-content" isDisabled={!formik.isValid || !formik.dirty || formik.isSubmitting}>
              Signup
            </Button>
          </Flex>
        </form>
        <Box mt={10}>
          Already have an account? <Link to="/auth/login">Login now.</Link>
        </Box>
      </Flex>
    </>
  );
};

export default Signup;
