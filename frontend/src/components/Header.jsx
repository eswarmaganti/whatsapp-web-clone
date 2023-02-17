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
import { useSelector } from "react-redux";

import CustomTooltip from "./CustomTooltip";
import LogoutModel from "./LogoutModel";
import CreateChatGroup from "./CreateChatGroup";
import CreateNewChat from "./CreateNewChat";
import UserProfileDrawer from "./UserProfileDrawer";

const menuData = [
  {
    icon: <MdGroups size={24} />,
    label: "community chat",
  },
  {
    icon: <MdDonutLarge size={24} />,
    label: "Status",
  },
];

const Header = () => {
  const { user } = useSelector((state) => state.whatsAppUserInfo);

  const createGroupBtnRef = useRef();
  const createChatBtnRef = useRef();
  const profileBtnRef = useRef();
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
  const {
    onClose: onProfileClose,
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
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
      <IconButton isRound onClick={onProfileOpen}>
        <Avatar
          size="md"
          name={user?.name}
          src={user?.image}
          ref={profileBtnRef}
        />
      </IconButton>
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
      <UserProfileDrawer
        onClose={onProfileClose}
        isOpen={isProfileOpen}
        btnRef={profileBtnRef}
      />
    </Flex>
  );
};

export default Header;
