import {
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import axios from "../../../axios/interceptor.ts";

const Header: React.FC = () => {
  const [turfName, setTurfName] = useState();
  const toast = useToast();
  const fetchTurfDetails = async () => {
    try {
      const resp = await axios.get("/api/turfname");
      setTurfName(resp.data.data.turfName);
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
    fetchTurfDetails();
  }, []);

  return (
    <Flex
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      bg="white"
      p={5}
      boxShadow="sm"
    >
      <Flex justifyContent="flex-start" alignItems="center" gap={4}>
        <Box fontSize="28px" fontWeight="700">
          Synkerhub
        </Box>
        <Box fontSize="16px">|</Box>
        <Box fontSize="16px" fontWeight="600">
          {turfName}
        </Box>
      </Flex>
      <Flex justifyContent="flex-end" alignItems="center" gap={3}>
        <Button width="fit-content">Explore Analytics</Button>
        <Menu>
          <MenuButton
            border={0}
            fontSize="36px"
            p={0}
            as={IconButton}
            aria-label="Options"
            icon={<CgProfile size="36px" />}
            variant="outline"
          />
          <MenuList>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default Header;
