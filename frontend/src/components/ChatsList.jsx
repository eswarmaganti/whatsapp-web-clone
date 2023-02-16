import React, { useEffect } from "react";
import {
  HStack,
  Flex,
  Avatar,
  Box,
  Divider,
  Text,
  VStack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
// import { chatData } from "./../chatData";
import { MdDoneAll } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";

import { setSelectedChat } from "../app/slice/chatSlice";
import { useFetchChatsQuery } from "../app/services/chatApi";

const ChatItem = ({ chat, onClick, selectedChat, ...rest }) => {
  return (
    <Flex direction="column" onClick={() => onClick(chat)}>
      <HStack
        px="4"
        py="2"
        _hover={{
          bgColor: "gray.100",
          cursor: "pointer",
        }}
        bgColor={selectedChat?._id === chat._id ? "gray.100" : ""}
        transition="all 200ms ease"
        className="chat-item"
      >
        {/* ------ Avatar to display user profile image ----- */}
        <Avatar name={chat.chatName} src={""} mr="4" />

        {/* ------- Chat Content Section ----- */}
        <Flex flex="1" justifyContent="space-between" align="baseline">
          {/* ------- Chat Name and Message Section */}
          <Box>
            <Text fontWeight="500">{chat.chatName}</Text>
            <HStack>
              <MdDoneAll
                color={chat?.latestMessage?.seen ? "#0BC5EA" : "#718096"}
              />
              <Text fontSize="sm" color="gray.600">
                {chat?.latestMessage?.content}
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
  const toast = useToast();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.whatsAppUserInfo);
  const { selectedChat } = useSelector((state) => state.chat);
  const {
    data: chatData,
    isError,
    isLoading,
    isSuccess,
    isFetching,
    error,
  } = useFetchChatsQuery(user.token);

  const handleSelectChat = (chat) => {
    dispatch(setSelectedChat(chat));
  };

  useEffect(() => {
    if (isError)
      toast({
        title: "Error",
        description: error?.data?.message,
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
  }, [isError]);

  if (isLoading)
    return (
      <Flex
        bgColor="gray.50"
        flex="1"
        alignItems="center"
        justifyContent="center"
      >
        <Spinner size="lg" color="green.600" />
      </Flex>
    );

  return (
    <Flex
      direction="column"
      overflowY="auto"
      className="scroll-bar"
      bgColor="gray.50"
      flex="1"
    >
      {chatData.map((data, ind) => (
        <ChatItem
          key={ind}
          chat={data}
          selectedChat={selectedChat}
          onClick={handleSelectChat}
        />
      ))}
    </Flex>
  );
};

export default ChatsList;
