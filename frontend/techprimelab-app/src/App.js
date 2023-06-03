import React from 'react';
import MainRoutes from './AllRoutes/MainRoutes';
import Navbar from './componet/Navbar';
import { Box, Flex } from '@chakra-ui/react';

function App() {
  return (
    <div className="App">
      <Flex direction={{base:"row",md:"column"}}>
        <Box w={{base:"",md:"80px"}} >
          <Navbar />
        </Box>
        <Flex direction="column" w={{base:"100%",md:"calc(100% - 80px)" }} ml={{md:"80px"}}>
          <MainRoutes />
        </Flex>
      </Flex>
    </div>
  );
}

export default App;
