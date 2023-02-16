import React from "react";
import { Box, Flex, Image, Center, Text } from "@chakra-ui/react";
import UserChatBox from "./UserChatBox";

const RightPanel = () => {
  return (
    <Flex direction="column" w="70%">
      <UserChatBox />
    </Flex>
  );
};

export default RightPanel;
