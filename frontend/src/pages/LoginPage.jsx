import React, { useEffect } from "react";
import {
  FormControl,
  Heading,
  Text,
  Input,
  FormLabel,
  Button,
  InputGroup,
  InputLeftElement,
  HStack,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  MdEmail as EmailIcon,
  MdLock as LockIcon,
  MdArrowForward as ArrowRightIcon,
} from "react-icons/md";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useLoginUserMutation } from "../app/services/authApi";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email Address format")
    .min(6, "Email Address must be minimum 6 characters")
    .max(40, "Email Address must be maximum 40 characters")
    .required("Email Address is required"),
  password: Yup.string()
    .min(6, "Password must be minimum 6 characters")
    .max(30, "Password must be maximum 40 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(LoginSchema) });

  const [loginUser, { data, error, isLoading, isError }] =
    useLoginUserMutation();

  const userLoginHanlder = async (data) => {
    console.log(data);
    await loginUser({ ...data });
  };

  useEffect(() => {
    if (isError)
      toast({
        title: "Error",
        description: error?.data?.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });
  }, [isError]);

  return (
    <>
      <Heading>Login.</Heading>
      <Text color="gray.600" mt="2" mb="6">
        Login to your account to get started.
      </Text>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(userLoginHanlder)}
      >
        <FormControl
          mb="3"
          size="lg"
          isInvalid={Boolean(errors?.email?.message)}
        >
          <FormLabel>Email Address</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement
              color="gray.700"
              children={<EmailIcon color="inherit" size={24} />}
            />
            <Input
              _placeholder={{
                fontSize: 14,
                fontWeight: "500",
              }}
              {...register("email")}
              size="lg"
              type="text"
              variant="filled"
              placeholder="Type email address"
            />
          </InputGroup>
          {Boolean(errors?.email?.message) && (
            <FormErrorMessage fontSize="sm" fontWeight="500">
              {errors?.email?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <FormControl
          mb="3"
          size="lg"
          isInvalid={Boolean(errors?.password?.message)}
        >
          <FormLabel>Password</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement
              color="gray.700"
              children={<LockIcon color="inherit" size={24} />}
            />
            <Input
              _placeholder={{
                fontSize: 14,
                fontWeight: "500",
              }}
              {...register("password")}
              size="lg"
              variant="filled"
              type="password"
              placeholder="Type password"
            />
          </InputGroup>
          {Boolean(errors?.password?.message) && (
            <FormErrorMessage fontSize="sm" fontWeight="500">
              {errors?.password?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          isLoading={isLoading}
          loadingText="Submitting.."
          rightIcon={<ArrowRightIcon />}
        >
          Submit
        </Button>
      </form>

      <HStack justifyContent="center" mt="4">
        <Text fontSize="sm">Don't have an account?</Text>
        <Link to="/signup">
          <Text
            align="center"
            color="blue.500"
            fontWeight="600"
            textDecoration="underline"
            fontSize="sm"
          >
            Register here.
          </Text>
        </Link>
      </HStack>
    </>
  );
};

export default LoginPage;
