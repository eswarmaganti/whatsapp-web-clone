import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { MdLogout as LogoutIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { setUserInfo } from "../app/slice/userSlice";
const LogoutModel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    dispatch(setUserInfo({}));
    navigate("/");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Logout ?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Are you reallu want to logout?</Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutUser}
            colorScheme="green"
            leftIcon={<LogoutIcon size={24} />}
          >
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModel;
