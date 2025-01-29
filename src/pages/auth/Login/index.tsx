import { Box, Button, Flex, FormControl, FormErrorMessage, Input, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { loginSchema } from "../../../constants.ts";
import axios from "../../../axios/interceptor.ts";

const Login: React.FC = () => {
    const toast = useToast();
  
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        try {
          await axios.post("/api/login", values);
        } catch (err: any) {
          toast({
            title: "Login Failed!",
            description: "Something went wrong!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      },
    });
  
  return (
    <>
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
                {typeof formik.errors.password === "string" &&
                  formik.errors.password}
              </FormErrorMessage>
            </FormControl>

            <Button
              type="submit"
              width="fit-content"
              isDisabled={
                !formik.isValid || !formik.dirty || formik.isSubmitting
              }
            >
              Login
            </Button>
            </Flex>
        </form>
      </Flex>
    </>
  );
};

export default Login;
