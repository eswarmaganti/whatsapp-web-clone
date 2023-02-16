import React from "react";
import { Avatar, Box, Divider, HStack, Flex, Text } from "@chakra-ui/react";

const SearchResultItem = ({ user, onClick }) => {
  const { name, about, image, ...rest } = user;
  return (
    <React.Fragment>
      <HStack
        cursor="pointer"
        _hover={{ bgColor: "gray.200" }}
        p="2"
        onClick={() => onClick(user)}
      >
        <Avatar name={name} src={image} mr="3" />
        <Box justifyContent="center">
          <Text fontWeight="500">{name}</Text>
          <Text fontSize="sm" color="gray.600">
            {about}
          </Text>
        </Box>
      </HStack>
      <Divider />
    </React.Fragment>
  );
};

const SearchResultsPanel = ({ users, onClick }) => {
  return (
    <Flex direction="column">
      {users.map((user) => (
        <SearchResultItem user={user} key={user._id} onClick={onClick} />
      ))}
    </Flex>
  );
};

export default SearchResultsPanel;
