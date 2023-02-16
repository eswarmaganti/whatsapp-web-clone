import React, { useRef } from "react";
import {
  Avatar,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import {
  MdGroups,
  MdDonutLarge,
  MdChat as ChatIcon,
  MdMoreVert as MenuIcon,
} from "react-icons/md";

import CustomTooltip from "./CustomTooltip";
import LogoutModel from "./LogoutModel";
import CreateChatGroup from "./CreateChatGroup";
import CreateNewChat from "./CreateNewChat";

const menuData = [
  {
    icon: <MdGroups size={24} />,
    label: "community chat",
  },
  {
    icon: <MdDonutLarge size={24} />,
    label: "Status",
  },
  // {
  //   icon: <MdChat size={24} />,
  //   label: "New Chat",
  // },
  // {
  //   icon: <MdMoreVert size={24} />,
  //   label: "Menu",
  // },
];

const Header = () => {
  const createGroupBtnRef = useRef();
  const createChatBtnRef = useRef();
  const {
    onClose: onLogoutModalClose,
    isOpen: isLogoutModalOpen,
    onOpen: onLogoutModalOpen,
  } = useDisclosure();

  const {
    onClose: onCreateGroupClose,
    isOpen: isCreateGroupOpen,
    onOpen: onCreateGroupOpen,
  } = useDisclosure();
  const {
    onClose: onCreateChatClose,
    isOpen: isCreateChatOpen,
    onOpen: onCreateChatOpen,
  } = useDisclosure();

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
        {menuData.map(({ icon, label }, ind) => (
          <CustomTooltip icon={icon} label={label} key={ind} />
        ))}
        <CustomTooltip
          icon={<ChatIcon size={24} />}
          label="New Chat"
          onClick={onCreateChatOpen}
        />
        <Menu>
          <MenuButton as={Box}>
            <IconButton>
              <MenuIcon size={24} />
            </IconButton>
          </MenuButton>
          <MenuList>
            <MenuItem ref={createGroupBtnRef} onClick={onCreateGroupOpen}>
              New Group
            </MenuItem>
            <MenuItem>New Community</MenuItem>
            <MenuItem>Archived</MenuItem>
            <MenuItem>Starred Messages</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={onLogoutModalOpen}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      <LogoutModel onClose={onLogoutModalClose} isOpen={isLogoutModalOpen} />
      <CreateChatGroup
        onClose={onCreateGroupClose}
        isOpen={isCreateGroupOpen}
        btnRef={createGroupBtnRef}
      />
      <CreateNewChat
        onClose={onCreateChatClose}
        isOpen={isCreateChatOpen}
        btnRef={createChatBtnRef}
      />
    </Flex>
  );
};

export default Header;
