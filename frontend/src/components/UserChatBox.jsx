import React, { useState, useEffect } from "react";
import {
  HStack,
  Flex,
  IconButton,
  Input,
  useToast,
  Spinner,
  Text,
  Tag,
  Stack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  MdSentimentVerySatisfied as EmojiIcon,
  MdOutlineAttachFile as AttachmentIcon,
  MdMic as MicrophoneIcon,
} from "react-icons/md";
import dayjs from "dayjs";
import io from "socket.io-client";

import {
  useSendNewMessageMutation,
  useFetchMessagesQuery,
} from "../app/services/messageApi";
import ChatBoxHeader from "./ChatBoxHeader";

import { getCurrentSender, isUserSender } from "../util";

const ENDPOINT = "http://localhost:5000";
var socket;

const UserChatBox = () => {
  const toast = useToast();
  // state hook to hold message
  const [message, setMessage] = useState("");
  // const [messagesList, setMessagesList] = useState([]);

  const { selectedChat } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.whatsAppUserInfo);

  const {
    data: messagesList,
    isError: isFetchMessagesError,
    isLoading: isFetchMessagesLoading,
    error: fetchMessagesError,
    isFetching: isMessagesFetching,
  } = useFetchMessagesQuery({ chatId: selectedChat?._id, user });

  const [
    sendNewMessage,
    {
      data: newMessageData,
      isError: isSendNewMessageError,
      isLoading: isSendNewMessageLoading,
      error: sendNewMessageError,
      isSuccess: isSendNewMessageSuccess,
    },
  ] = useSendNewMessageMutation();

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendNewMessage = async (e) => {
    if (e.key.toLowerCase() !== "enter") return;
    if (!message)
      return toast({
        title: "Invalid Message",
        description: "Please type a message to send",
        position: "top-right",
        isClosable: true,
        duration: 4000,
        status: "warning",
      });

    setMessage("");
    // saending a new message
    await sendNewMessage({
      content: message,
      chatId: selectedChat._id,
      token: user.token,
    });
  };

  // initialize the socket connection on component mount
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
  }, []);

  // hook for handling sending new messages error
  useEffect(() => {
    if (isSendNewMessageError)
      toast({
        title: "Error",
        description: sendNewMessageError?.data?.message,
        position: "top-right",
        isClosable: true,
        duration: 4000,
        status: "error",
      });
  }, [isSendNewMessageError]);

  // sockeet to emit send message
  useEffect(() => {
    if (isSendNewMessageSuccess) {
      socket.emit("join chat", selectedChat._id);
      socket.emit("new message", newMessageData);
    }
  }, [isSendNewMessageSuccess]);

  return (
    <Flex direction="column" w="100%" h="100%">
      {/* --------- Chat Box Header Section --------- */}
      <ChatBoxHeader />
      {/* ---------- Messages Section ----------- */}
      <Stack direction="column" flex="1" overflowY="auto" px="10" py="3">
        {isFetchMessagesLoading || isMessagesFetching ? (
          <Flex height="100%" alignItems="center" justifyContent="center">
            <Spinner size="lg" color="green.600" />
          </Flex>
        ) : (
          messagesList.map((msg) => (
            <Flex
              key={msg._id}
              direction="column"
              alignSelf={
                isUserSender(msg.sender, user) ? "flex-start" : "flex-end"
              }
            >
              <Tag
                borderRadius="full"
                size="lg"
                colorScheme={isUserSender(msg.sender, user) ? "gray" : "green"}
                px="4"
              >
                {msg.content}
              </Tag>
              <Text fontSize="xs" color="gray.500" align="right">
                {dayjs(msg.createdAt).format("DD/MM HH:mm")}
              </Text>
            </Flex>
          ))
        )}
      </Stack>
      {/* --------- New Message Input Section ----------- */}
      <HStack spacing="2" bgColor="gray.50" px="4" py="2">
        <IconButton isRound>
          <EmojiIcon size={24} />
        </IconButton>
        <IconButton isRound>
          <AttachmentIcon size={24} />
        </IconButton>

        <Input
          _placeholder={{
            color: "gray.800",
            fontWeight: "500",
          }}
          type="text"
          bgColor="gray.200"
          placeholder="Type a message..."
          variant="filled"
          onKeyDown={handleSendNewMessage}
          onChange={handleMessageChange}
          value={message}
        />

        <IconButton>
          <MicrophoneIcon size={24} />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default UserChatBox;
