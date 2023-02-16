import React from "react";
import { Flex, Image, Center, Text } from "@chakra-ui/react";
import bannerImage from "../../assets/banner.svg";

const ChatBoxBanner = () => {
  return (
    <Flex alignItems="center" justifyContent="center" flex="1">
      <Center flexDirection="column">
        <Image src={bannerImage} h="200" />
        <Text fontWeight="bold" fontSize="xl" mt="4">
          WhatsApp Web
        </Text>
        <Text fontSize="sm">select a chat to start the conversation.</Text>
      </Center>
    </Flex>
  );
};

export default ChatBoxBanner;
