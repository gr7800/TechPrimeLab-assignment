import React, { useEffect, useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Text,
  IconButton,
  InputGroup,
  InputRightElement,
  Image,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import loginbg from '../utills/loginbg.svg';
import Logo from "../utills/Logo.svg"
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isAuth = useSelector((store) => store.authReducer.isAuth);
  const message = useSelector((store) => store.authReducer.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValidEmail(email) && isValidPassword(password)) {
      dispatch(login({ email: email, password: password }));
    } else {
      setEmailError(!isValidEmail(email));
      setPasswordError(!isValidPassword(password));
    }
  };

  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    return password.length >= 5;
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  return (
    <Box bgImg={loginbg} position="absolute" bgRepeat="no-repeat" w={{ base: "100%", md: "calc(100% - 80px)" }} >
      <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} mt={"20px"} p={"20px"} >
        <Box >
          <Image src={Logo} alt="logo" />
        </Box>
        <Text color={"white"} fontSize={"20px"}>Online Project Management</Text>
      </Box>
      <Box
        width="325px"
        bgColor="white"
        p={10}
        pb={15}
        mx="auto"
        borderWidth={1}
        borderRadius="15px"
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        mb={"100px"}
      >
        <Text fontSize={"20px"} textAlign={"center"} p={5}>
          Login To Get Started
        </Text>
        <FormControl isInvalid={emailError}>
          <FormLabel color={emailError ? 'red.500' : undefined}>Email</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            borderColor={emailError ? 'red.500' : undefined}
          />
          {emailError && (
            <Text mt={2} color="red.500" textAlign="left">
              Email is required
            </Text>
          )}
        </FormControl>

        <FormControl mt={4} isInvalid={passwordError}>
          <FormLabel color={passwordError ? 'red.500' : undefined}>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              borderColor={passwordError ? 'red.500' : undefined}
            />
            <InputRightElement>
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                onClick={toggleShowPassword}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          {passwordError && (
            <Text mt={2} color="red.500" textAlign="left">
              Password is required
            </Text>
          )}
        </FormControl>

        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
          <Button m={4} borderRadius={"20px"} p={"0px"} w={"200px"} colorScheme="teal" bg={"#035fb2"} color={"white"} onClick={handleLogin}>
            Login
          </Button>
        </Box>

        <Box w={"100%"} display={"flex"} justifyContent={"center"}>
          {message && (
            <Text mt={2} color="red.500" textAlign="left">
              {message}
            </Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
