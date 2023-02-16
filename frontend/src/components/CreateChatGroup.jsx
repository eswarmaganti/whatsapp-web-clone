import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Input,
  InputGroup,
  InputLeftElement,
  DrawerHeader,
  Box,
  Spinner,
  Flex,
  Button,
  DrawerFooter,
  useToast,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import {
  MdSearch as SearchIcon,
  MdArrowForward as ArrowIcon,
  MdGroups as GroupIcon,
} from "react-icons/md";
import { useSelector } from "react-redux";

import { useCreateGroupChatMutation } from "../app/services/chatApi";

import { useLazySearchUsersQuery } from "../app/services/authApi";
import SearchResultsPanel from "./SearchResultsPanel";
import GroupParticipantsPanel from "./GroupParticipantsPanel";
import { useForm } from "react-hook-form";

const CreateChatGroup = ({ isOpen, onClose, btnRef }) => {
  const toast = useToast();

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // state to hold the group participants data
  const [selectedGroupParticipants, setSelectedGroupParticipants] = useState(
    []
  );

  const { user } = useSelector((state) => state.whatsAppUserInfo);

  const [trigger, { data: searchResults, isLoading, isFetching, isError }] =
    useLazySearchUsersQuery();

  const [
    createGroupChat,
    {
      data: createGroupChatData,
      isError: isCreateGroupChatError,
      isSuccess: isCreateGroupChatSuccess,
      isLoading: isCreateGroupChatLoading,
      error: createGroupChatError,
    },
  ] = useCreateGroupChatMutation();

  const handleSearchParticipants = (e) => {
    trigger({ searchText: e.target.value.trim(), token: user.token });
  };

  const handleAddGroupParticipant = (user) => {
    const participantNotExists = (participant) => participant._id !== user._id;

    console.log(selectedGroupParticipants.every(participantNotExists));
    if (selectedGroupParticipants.every(participantNotExists))
      setSelectedGroupParticipants([...selectedGroupParticipants, user]);
  };

  const handleRemoveGroupParticipant = (userId) => {
    const participants = selectedGroupParticipants.filter(
      (participant) => participant._id !== userId
    );
    setSelectedGroupParticipants([...participants]);
  };

  const handleCreateGroupChat = async (data) => {
    if (!selectedGroupParticipants.length) {
      return toast({
        title: "Error",
        description: "Please select group participants",
        status: "error",
        position: "top-right",
        duration: 4000,
        isClosable: true,
      });
    }

    // creating a new group chat
    await createGroupChat({
      name: data.name,
      users: selectedGroupParticipants,
      token: user.token,
    });
  };

  // triggering the search results api call when component mounted
  useEffect(() => {
    trigger({ searchText: "", token: user.token });
  }, []);

  useEffect(() => {
    if (isCreateGroupChatError)
      toast({
        title: "Error",
        description: createGroupChatError?.data?.message,
        position: "top-right",
        status: "error",
        isClosable: true,
        duration: 4000,
      });
  }, [isCreateGroupChatError]);

  useEffect(() => {
    if (isCreateGroupChatSuccess) {
      toast({
        title: "Create Group Chat",
        description: "Successfully created group chat",
        position: "top-right",
        status: "success",
        isClosable: true,
        duration: 4000,
      });
      setValue("name", "");
      setSelectedGroupParticipants([]);
    }
  }, [isCreateGroupChatSuccess]);

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
      size="sm"
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box h="100px" bgColor="green.600">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Add group participants</DrawerHeader>
        </Box>

        <DrawerBody pt="3" display="flex" flexDirection="column">
          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(handleCreateGroupChat)}
          >
            <GroupParticipantsPanel
              users={selectedGroupParticipants}
              onClose={handleRemoveGroupParticipant}
            />
            <FormControl mb="2">
              <FormLabel>Group Name</FormLabel>
              <InputGroup>
                <InputLeftElement children={<GroupIcon />} />
                <Input
                  {...register("name")}
                  variant="filled"
                  placeholder="Type group name"
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="green"
              variant="solid"
              rightIcon={<ArrowIcon size="24" />}
              size="sm"
              isLoading={isCreateGroupChatLoading}
              loadingText="Creating.."
            >
              Create
            </Button>
          </form>

          <Box flex="1" overflowY="auto" mt="4">
            <InputGroup mb="4">
              <InputLeftElement children={<SearchIcon size={24} />} />
              <Input
                placeholder="type username/email address"
                variant="filled"
                onChange={handleSearchParticipants}
              />
            </InputGroup>
            {isLoading && (
              <Flex>
                <Spinner color="green.600" m="auto" size="lg" />
              </Flex>
            )}

            {searchResults && (
              <SearchResultsPanel
                users={searchResults}
                onClick={handleAddGroupParticipant}
              />
            )}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateChatGroup;
