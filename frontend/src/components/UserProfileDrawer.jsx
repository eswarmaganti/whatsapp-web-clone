import React, { useEffect, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerOverlay,
  DrawerContent,
  Avatar,
  InputGroup,
  FormControl,
  FormLabel,
  Input,
  Button,
  DrawerHeader,
  InputLeftElement,
  Box,
  Center,
  useToast,
  InputRightElement,
  IconButton,
} from "@chakra-ui/react";
import {
  MdPerson as UserIcon,
  MdInfo as InfoIcon,
  MdCameraAlt as CameraIcon,
  MdSave as SaveIcon,
  MdEdit as EditIcon,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

import { setUserInfo } from "../app/slice/userSlice";
import { useUpdateUserProfileMutation } from "../app/services/authApi";

const UserProfileDrawer = ({ isOpen, onClose, btnRef, ...rest }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.whatsAppUserInfo);

  // state hooks to handle editing and disabling inputs
  const [editName, setEditName] = useState(true);
  const [editAbout, setEditAbout] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name,
      about: user?.about,
      image: user?.image,
    },
  });

  const [updateUserProfile, { data, isError, isSuccess, isLoading, error }] =
    useUpdateUserProfileMutation();

  const handleUpdateUserProfile = (data) => {
    const { name, about, image } = data;
    // function to upload the image to cloudinary
    uploadProfilePicture(image, async (imageUrl) => {
      await updateUserProfile({
        name,
        about,
        image: imageUrl,
        token: user.token,
      });
    });
  };

  const uploadProfilePicture = async (image, callBack) => {
    // if image is not selected just run the callBack

    if (!image[0]?.type) return callBack();

    if (image[0].type !== "image/jpeg" && image[0].type !== "image/png") {
      return toast({
        title: "Image Error",
        description: "Image should be of type image/jpeg or image/png",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    }

    if (!(image[0].size / Math.pow(1024, 2) <= 2)) {
      return toast({
        title: "Image Error",
        description: "Image size is too large, should be less than 2MB",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
    }

    setIsImageUploading(true);
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "whatsapp-web-clone");
    formData.append("cloud_name", "whatsapp-web-clone");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/eswar-krishna-maganti/image/upload",
        formData
      );

      const { data } = await response;
      setIsImageUploading(false);
      return callBack(data.url);
    } catch (error) {
      toast({
        title: "Image Upload Error",
        description: "Failed to upload image, please try again later",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (isError)
      toast({
        title: "Profile Update Failed",
        description: error?.data?.message,
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Profile Update Successful",
        description: "User profile updated successfully",
        status: "success",
        position: "top-right",
        isClosable: true,
        duration: 4000,
      });
      dispatch(setUserInfo(data));

      setValue("image", null);
      setEditAbout(true);
      setEditName(true);
    }
  }, [isSuccess]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="left"
      size="sm"
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <Box color="white" bgColor="green.600" h="100px">
          <DrawerCloseButton />
          <DrawerHeader>Profile</DrawerHeader>
        </Box>

        <DrawerBody mt="4">
          <Center>
            <Avatar size="2xl" src={user?.image} alignSelf="center" mb="4" />
          </Center>
          <form
            autoComplete="off"
            onSubmit={handleSubmit(handleUpdateUserProfile)}
          >
            <FormControl mb="2">
              <FormLabel>Your Name</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<UserIcon size="24" color="#2D3748" />}
                />
                <Input
                  name="name"
                  placeholder="your name..."
                  size="lg"
                  variant="filled"
                  {...register("name")}
                  disabled={editName}
                />
                <InputRightElement
                  children={
                    <IconButton isRound onClick={() => setEditName(!editName)}>
                      <EditIcon size="24" />
                    </IconButton>
                  }
                />
              </InputGroup>
            </FormControl>

            <FormControl mb="2">
              <FormLabel>About</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<InfoIcon size="24" color="#2D3748" />}
                />
                <Input
                  name="about"
                  placeholder="about yourself..."
                  size="lg"
                  variant="filled"
                  {...register("about")}
                  disabled={editAbout}
                />
                <InputRightElement
                  children={
                    <IconButton
                      isRound
                      onClick={() => setEditAbout(!editAbout)}
                    >
                      <EditIcon size="24" />
                    </IconButton>
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Profile Picture</FormLabel>
              <InputGroup size="lg">
                <InputLeftElement
                  children={<CameraIcon size="24" color="#2D3748" />}
                />
                <Input
                  {...register("image")}
                  type="file"
                  size="lg"
                  pt="2"
                  variant="filled"
                />
              </InputGroup>
            </FormControl>
            <Button
              type="submit"
              colorScheme="green"
              leftIcon={<SaveIcon size={24} />}
              isLoading={isLoading || isImageUploading}
              loadingText="Updating..."
            >
              Save
            </Button>
          </form>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default UserProfileDrawer;
