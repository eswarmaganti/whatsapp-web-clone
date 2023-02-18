import React from "react";
import { Box, Flex, Image, Center, Text } from "@chakra-ui/react";
import UserChatBox from "./UserChatBox";
import { useSelector } from "react-redux";
import ChatBoxBanner from "./layout/ChatBoxBanner";

const RightPanel = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  return (
    <Flex direction="column" w="70%">
      {!selectedChat ? <ChatBoxBanner /> : <UserChatBox />}
    </Flex>
  );
};

export default RightPanel;
