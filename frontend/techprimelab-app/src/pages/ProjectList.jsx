import { Box, Image, Text } from '@chakra-ui/react';
import React from 'react';
import loginbg from '../utills/Header-bg.svg';
import Logo from '../utills/Logo.svg';
import List from '../componet/List';

const ProjectList = () => {
  return (
    <Box
      bgImg={loginbg}
      position="absolute"
      bgRepeat="no-repeat"
      w={{ base: '100%', md: 'calc(100% - 80px)' }}
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      padding={"20px"}
    >
      <Box w={{ base: '100%', md: 'calc(100% - 80px)' }} display={"flex"} >
        <Text
          color="white"
          textAlign="left"
          fontSize={{ base: '20px', md: '20px' }}
          fontWeight={"bold"}
        >
          {'< Create Project'}
        </Text>
        <Box margin={"auto"} ><Image src={Logo} alt="logo" mt={"-15px"} mb={"15px"} /></Box>
      </Box>
      <List />
    </Box>
  );
};

export default ProjectList;
