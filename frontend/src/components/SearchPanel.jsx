import React from "react";
import {
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import { MdFilterList, MdSearch } from "react-icons/md";
import CustomTooltip from "./CustomTooltip";
const SearchPanel = () => {
  return (
    <HStack
      bg="gray.50"
      py="2"
      px="4"
      spacing={2}
      borderBottom="1px solid #dfdede"
    >
      <InputGroup size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<MdSearch size={24} />}
        />
        <Input
          _placeholder={{
            fontSize: 14,
            color: "gray.800",
            paddingLeft: "16px",
          }}
          bg="gray.200"
          variant="filled"
          placeholder="Search or start new chat"
          borderRadius="md"
        />
      </InputGroup>

      <CustomTooltip label="filter chats" icon={<MdFilterList size={24} />} />
    </HStack>
  );
};

export default SearchPanel;
