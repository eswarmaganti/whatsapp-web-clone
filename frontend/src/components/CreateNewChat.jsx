import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  useToast,
  DrawerCloseButton,
  Flex,
  Text,
  InputGroup,
  Input,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import SearchResultsPanel from "./SearchResultsPanel";
import { useCreateChatMutation } from "../app/services/chatApi";
import { useLazySearchUsersQuery } from "../app/services/authApi";
import { useSelector } from "react-redux";
import { MdSearch as SearchIcon } from "react-icons/md";

const CreateNewChat = ({ isOpen, onClose, btnRef, ...rest }) => {
  const toast = useToast();
  const { user } = useSelector((state) => state.whatsAppUserInfo);

  const [trigger, { data: searchResults, isError, isSuccess, isLoading }] =
    useLazySearchUsersQuery();

  const [
    createChat,
    {
      data: createChatData,
      isLoading: isCreateChatLoading,
      isError: isCreateChatError,
      isSuccess: isCreateChatSuccess,
      error: createChatError,
    },
  ] = useCreateChatMutation();

  const handleCreateNewChat = async (userData) => {
    await createChat({ userId: userData._id, token: user.token });
  };

  useEffect(() => {
    if (isCreateChatError)
      toast({
        title: "Error",
        description: createChatError?.data?.message,
        status: "error",
        isClosable: true,
        duration: 4000,
      });
  }, [isCreateChatError]);

  const handleSearchUsers = (e) => {
    trigger({ searchText: e.target.value.trim(), token: user.token });
  };

  useEffect(() => {
    // close the dialog after creating a new chat
    if (isCreateChatSuccess) onClose();
  }, [isCreateChatSuccess]);

  // trigger effect hook to load users data
  useEffect(() => {
    trigger({ searchText: "", token: user.token });
  }, []);
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      finalFocusRef={btnRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box h="100px" bgColor="green.600">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Create New Chat</DrawerHeader>
        </Box>
        <Text px="4" py="2">
          Click on the user to start chat
        </Text>

        <DrawerBody mt="4" flex="1" overflowY="auto">
          <InputGroup mb="4">
            <InputLeftElement children={<SearchIcon size={24} />} />
            <Input
              placeholder="type username/email address"
              variant="filled"
              onChange={handleSearchUsers}
            />
          </InputGroup>
          {isCreateChatLoading && (
            <Flex>
              <Spinner m="auto" color="green.600" size="lg" />
            </Flex>
          )}
          {searchResults && (
            <SearchResultsPanel
              users={searchResults}
              onClick={handleCreateNewChat}
            />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateNewChat;
