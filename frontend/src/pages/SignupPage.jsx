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
  MdPerson as PersonIcon,
  MdArrowForward as ArrowRightIcon,
} from "react-icons/md";

import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useRegisterUserMutation } from "../app/services/authApi";

const SignupSchema = Yup.object({
  name: Yup.string()
    .min(3, "Full Name must be minimum 3 characters")
    .max(50, "Full Name must be maximum 50 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid Email Address format")
    .min(6, "Email Address must be minimum 6 characters")
    .max(40, "Email Address must be maximum 40 characters")
    .required("Email Address is required"),
  gender: Yup.string()
    .oneOf(
      ["male", "female", "trans"],
      "Gender must be one of male, female, trans"
    )
    .required("Gender is required"),
  password: Yup.string()
    .min(6, "Password must be minimum 6 characters")
    .max(30, "Password must be maximum 40 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignupPage = () => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
  });

  const [registerUser, { data, error, isLoading, isError, isSuccess }] =
    useRegisterUserMutation();

  const userRegisterHandler = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Signup Failed",
        description: error?.data?.message,
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [isError]);

  return (
    <>
      <Heading>Signup.</Heading>
      <Text color="gray.600" mt="2" mb="6">
        Create a new account to get started.
      </Text>

      <form
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(userRegisterHandler)}
      >
        {/* ------ Name  Field ------- */}
        <FormControl
          mb="1"
          size="lg"
          isInvalid={Boolean(errors?.name?.message)}
        >
          <FormLabel m="0">Full Name</FormLabel>
          <InputGroup size="lg">
            <InputLeftElement
              color="gray.700"
              children={<PersonIcon color="inherit" size={24} />}
            />
            <Input
              _placeholder={{
                fontSize: 14,
                fontWeight: "500",
              }}
              {...register("name")}
              size="lg"
              type="text"
              variant="filled"
              placeholder="Type full name"
            />
          </InputGroup>
          {Boolean(errors?.name?.message) && (
            <FormErrorMessage fontWeight="500">
              {errors?.name?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        {/* ------ Email  Field ------- */}
        <FormControl
          mb="1"
          size="lg"
          isInvalid={Boolean(errors?.email?.message)}
        >
          <FormLabel mb="0.5">Email Address</FormLabel>
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
              type="email"
              variant="filled"
              placeholder="Type email address"
            />
          </InputGroup>
          {Boolean(errors?.email?.message) && (
            <FormErrorMessage fontWeight="500">
              {errors?.email?.message}
            </FormErrorMessage>
          )}
        </FormControl>

        {/* ------ Password Field ------- */}
        <FormControl
          mb="1"
          size="lg"
          isInvalid={Boolean(errors?.password?.message)}
        >
          <FormLabel mb="0.5">Password</FormLabel>
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
            <FormErrorMessage fontWeight="500">
              {errors?.password?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        {/* ------ Password Field ------- */}
        <FormControl
          mb="1"
          size="lg"
          isInvalid={Boolean(errors?.confirmPassword?.message)}
        >
          <FormLabel mb="0.5">Confirm Password</FormLabel>
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
              {...register("confirmPassword")}
              size="lg"
              variant="filled"
              type="password"
              placeholder="Confirm your password"
            />
          </InputGroup>
          {Boolean(errors?.confirmPassword?.message) && (
            <FormErrorMessage fontWeight="500">
              {errors?.confirmPassword?.message}
            </FormErrorMessage>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="green"
          mt="1"
          rightIcon={<ArrowRightIcon />}
          isLoading={isLoading}
          loadingText="Submitting..."
        >
          Submit
        </Button>
      </form>

      <HStack justifyContent="center" mt="2">
        <Text fontSize="sm">Already have an account?</Text>
        <Link to="/">
          <Text
            align="center"
            color="blue.500"
            fontWeight="600"
            textDecoration="underline"
            fontSize="sm"
          >
            Login here.
          </Text>
        </Link>
      </HStack>
    </>
  );
};

export default SignupPage;
