import React from "react";
import { Avatar, Flex, HStack } from "@chakra-ui/react";
import { MdGroups, MdDonutLarge, MdChat, MdMoreVert } from "react-icons/md";

import CustomTooltip from "./CustomTooltip";

const iconsData = [
  {
    icon: <MdGroups size={24} />,
    label: "community chat",
  },
  {
    icon: <MdDonutLarge size={24} />,
    label: "Status",
  },
  {
    icon: <MdChat size={24} />,
    label: "New Chat",
  },
  {
    icon: <MdMoreVert size={24} />,
    label: "Menu",
  },
];

const Header = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="gray.200"
      py="2"
      px="4"
      borderRight="1px solid #dfdede"
    >
      <Avatar
        size="md"
        name="Alex"
        src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg"
      />
      <HStack spacing={3}>
        {iconsData.map(({ icon, label }, ind) => (
          <CustomTooltip icon={icon} label={label} key={ind} />
        ))}
      </HStack>
    </Flex>
  );
};

export default Header;
