import { Avatar, Flex, HStack, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { MdSearch as SearchIcon, MdMoreVert as MenuIcon } from "react-icons/md";
import { useSelector } from "react-redux";

const ChatBoxHeader = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  if (!selectedChat) return <ChatBoxBanner />;
  return (
    <Flex px="4" py="2" bgColor="gray.50" w="100%" alignItems="center" gap="4">
      <Avatar name={selectedChat?.chatName} src="" />
      <Flex direction="column" flex="1">
        <Text fontSize="md" fontWeight="500" flex="1">
          {selectedChat?.chatName}
        </Text>
      </Flex>
      <HStack>
        <IconButton isRound>
          <SearchIcon size={24} />
        </IconButton>
        <IconButton isRound>
          <MenuIcon size={24} />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default ChatBoxHeader;
