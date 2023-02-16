import { Flex, Stack } from "@chakra-ui/react";
import React from "react";
import Header from "./Header";
import SearchPanel from "./SearchPanel";
import ChatsList from "./ChatsList";

const LeftPanel = () => {
  return (
    <Flex direction="column" w="30%">
      <Header />
      <SearchPanel />
      <ChatsList />
    </Flex>
  );
};

export default LeftPanel;
