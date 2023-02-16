import React from "react";
import { Outlet } from "react-router-dom";
import { Flex, Box, Image } from "@chakra-ui/react";

import loginBanner from "../../assets/loginBanner.jpg";
import Navbar from "./Navbar";

const AuthLayout = () => {
  return (
    <Flex direction="column" h="100vh">
      <Navbar />
      <Flex px="20" flex="1" bg="gray.50" height="calc(100% - 65px)">
        <Flex direction="column" justifyContent="center" w="50%" px="14">
          <Outlet />
        </Flex>
        <Box w="50%">
          <Image
            src={loginBanner}
            objectFit="cover"
            height="100%"
            w="100%"
            borderRadius="20"
          />
        </Box>
      </Flex>
    </Flex>
  );
};

export default AuthLayout;
