import React from "react";
import { Flex } from "@chakra-ui/react";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";
const AppPage = () => {
  return (
    <Flex h="100vh" bgColor="gray.200">
      <LeftPanel />
      <RightPanel />
    </Flex>
  );
};

export default AppPage;
