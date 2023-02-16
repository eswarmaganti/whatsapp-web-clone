import React from "react";
import { HStack, Text, Flex } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import {
  MdLogin as LoginIcon,
  MdPersonAdd as RegisterIcon,
} from "react-icons/md";

const links = [
  {
    icon: <LoginIcon size={24} />,
    label: "Login",
    path: "/",
  },
  {
    icon: <RegisterIcon size={24} />,
    label: "Signup",
    path: "/signup",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();

  const isActiveLink = (path) => {
    return pathname === path;
  };

  return (
    <Flex
      w="100%"
      bgColor="gray.200"
      alignItems="center"
      justifyContent="space-between"
      py="4"
      px="20"
    >
      <Link to="/">
        <HStack>
          <FaWhatsapp size={32} color="#2F855A" />
          <Text fontSize="xl" fontWeight="bold" color="green.600">
            WhatsApp Web
          </Text>
        </HStack>
      </Link>
      <HStack spacing={8}>
        {links.map((item, ind) => (
          <Link
            to={item.path}
            key={ind}
            className={isActiveLink(item.path) ? "nav-item active" : "nav-item"}
          >
            <HStack>
              {item.icon}
              <Text fontWeight="500">{item.label}</Text>
            </HStack>
          </Link>
        ))}
      </HStack>
    </Flex>
  );
};

export default Navbar;
