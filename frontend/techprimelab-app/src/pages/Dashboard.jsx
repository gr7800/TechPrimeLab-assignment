import { Box, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import loginbg from '../utills/Header-bg.svg';
import Logo from '../utills/Logo.svg';
import { useDispatch } from 'react-redux';
import { GetProjectInfo } from '../redux/Project/project.action';
import Chart from '../componet/Chart';

const Dashboard = () => {
  let [info, setInfo] = useState({});

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetProjectInfo()).then((res) => setInfo(res)).catch((e) => console.log(e));
  }, [])

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
          {'Dashboard'}
        </Text>
        <Box margin={"auto"} ><Image src={Logo} alt="logo" mt={"-15px"} mb={"15px"} /></Box>
      </Box>
      <Box >
        <Box display={"grid"} gridTemplateColumns={"repeat(5,1fr)"} gap={"20px"} overflow={"auto"}
          sx={{
            '&::-webkit-scrollbar': {
              width: '0.6em',
              backgroundColor: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'transparent',
            },
          }}
          >
          <Box borderLeft={"5px solid aqua"} bg={"white"} padding={"15px"} borderRadius={"5px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
            <Text fontSize={"15px"} color={"gray"}>Total Projects</Text>
            <Text fontWeight={"bold"} fontSize={"20px"}>{info.total}</Text>
          </Box>
          <Box borderLeft={"5px solid aqua"} bg={"white"} padding={"15px"} borderRadius={"5px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
            <Text fontSize={"15px"} color={"gray"}>Closed</Text>
            <Text fontWeight={"bold"} fontSize={"20px"}>{info.closed}</Text>
          </Box>
          <Box borderLeft={"5px solid aqua"} bg={"white"} padding={"15px"} borderRadius={"5px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
            <Text fontSize={"15px"} color={"gray"}>Running</Text>
            <Text fontWeight={"bold"} fontSize={"20px"}>{info.running}</Text>
          </Box>
          <Box borderLeft={"5px solid aqua"} bg={"white"} padding={"15px"} borderRadius={"5px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
            <Text fontSize={"15px"} color={"gray"}>Closure Delay</Text>
            <Text fontWeight={"bold"} fontSize={"20px"}>{info.delayedRunning}</Text>
          </Box>
          <Box borderLeft={"5px solid aqua"} bg={"white"} padding={"15px"} borderRadius={"5px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
            <Text fontSize={"15px"} color={"gray"}>Canceled</Text>
            <Text fontWeight={"bold"} fontSize={"20px"}>{info.cancel}</Text>
          </Box>
        </Box>
        <Box m={"20px"}>
          <Chart />
        </Box>
      </Box>
    </Box>
  )
}

export default Dashboard