import React from "react";
import {
  HStack,
  Flex,
  Avatar,
  Box,
  Divider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { chatData } from "./../chatData";
import { MdDoneAll } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";

const ChatItem = ({ chat }) => {
  return (
    <Flex direction="column">
      <HStack
        px="4"
        py="2"
        _hover={{
          bgColor: "gray.100",
          cursor: "pointer",
        }}
        transition="all 200ms ease"
        className="chat-item"
      >
        {/* ------ Avatar to display user profile image ----- */}
        <Avatar name={chat.name} src={chat.src} mr="4" />

        {/* ------- Chat Content Section ----- */}
        <Flex flex="1" justifyContent="space-between" align="baseline">
          {/* ------- Chat Name and Message Section */}
          <Box>
            <Text fontWeight="500">{chat.name}</Text>
            <HStack>
              <MdDoneAll color={chat.seen ? "#0BC5EA" : "#718096"} />
              <Text fontSize="sm" color="gray.600">
                {chat.message}
              </Text>
            </HStack>
          </Box>

          {/* ------- Date & More Action Section ------ */}
          <VStack alignItems="flex-end">
            <Text fontSize="xs" color="gray.500">
              {chat.date}
            </Text>
            <Box
              opacity="0"
              transition="all 200ms ease-out"
              className="more-icon"
            >
              <FiChevronDown size={24} color="#718096" />
            </Box>
          </VStack>
        </Flex>
      </HStack>
      <Divider w="80%" alignSelf="flex-end" />
    </Flex>
  );
};

const ChatsList = () => {
  return (
    <Flex
      direction="column"
      overflowY="auto"
      className="scroll-bar"
      bgColor="gray.50"
    >
      {chatData.map((data, ind) => (
        <ChatItem key={ind} chat={data} />
      ))}
    </Flex>
  );
};

export default ChatsList;
