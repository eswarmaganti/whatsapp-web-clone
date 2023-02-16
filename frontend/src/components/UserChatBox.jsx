import React from "react";
import { HStack, Flex, IconButton, Box, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  MdSentimentVerySatisfied as EmojiIcon,
  MdOutlineAttachFile as AttachmentIcon,
  MdMic as MicrophoneIcon,
} from "react-icons/md";

import ChatBoxBanner from "./layout/ChatBoxBanner";
import ChatBoxHeader from "./ChatBoxHeader";

const UserChatBox = () => {
  const { selectedChat } = useSelector((state) => state.chat);

  if (!selectedChat) return <ChatBoxBanner />;

  return (
    <Flex direction="column" w="100%" h="100%">
      {/* --------- Chat Box Header Section --------- */}
      <ChatBoxHeader />
      {/* ---------- Messages Section ----------- */}
      <Box flex="1" overflowY="auto"></Box>
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
          bgColor="gray.200"
          placeholder="Type a message..."
          variant="filled"
        />

        <IconButton>
          <MicrophoneIcon size={24} />
        </IconButton>
      </HStack>
    </Flex>
  );
};

export default UserChatBox;
