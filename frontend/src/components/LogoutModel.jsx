import React, { useRef } from "react";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  Text,
  AlertDialogFooter,
  Button,
  AlertDialogHeader,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { MdLogout as LogoutIcon } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { setUserInfo } from "../app/slice/userSlice";
const LogoutModel = ({ isOpen, onClose }) => {
  const cancelBtnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoutUser = () => {
    dispatch(setUserInfo({}));
    navigate("/");
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="slideInBottom"
      isCentered
      leastDestructiveRef={cancelBtnRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Logout ?</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>
          <Text>Are you reallu want to logout?</Text>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" ref={cancelBtnRef} mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleLogoutUser}
            colorScheme="green"
            leftIcon={<LogoutIcon size={24} />}
          >
            Logout
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LogoutModel;
