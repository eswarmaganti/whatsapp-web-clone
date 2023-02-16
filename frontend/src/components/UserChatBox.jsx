import React from "react";
import {
  HStack,
  Flex,
  Avatar,
  Stack,
  Text,
  IconButton,
  Box,
  Input,
} from "@chakra-ui/react";
import {
  MdSearch as SearchIcon,
  MdMoreVert as MenuIcon,
  MdSentimentVerySatisfied as EmojiIcon,
  MdOutlineAttachFile as AttachmentIcon,
  MdMic as MicrophoneIcon,
} from "react-icons/md";

const UserChatBox = () => {
  return (
    <Flex direction="column" w="100%" h="100%">
      {/* --------- Chat Box Header Section --------- */}
      <Flex
        px="4"
        py="2"
        bgColor="gray.50"
        w="100%"
        alignItems="center"
        gap="4"
      >
        <Avatar
          name="Alex"
          src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg"
        />
        <Text fontSize="md" fontWeight="500" flex="1">
          Alex Wilson
        </Text>
        <HStack>
          <IconButton isRound>
            <SearchIcon size={24} />
          </IconButton>
          <IconButton isRound>
            <MenuIcon size={24} />
          </IconButton>
        </HStack>
      </Flex>
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
