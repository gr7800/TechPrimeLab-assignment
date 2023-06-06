import { Box, Flex, Table, Thead, Tbody, Tr, Th, Td, Input, Button, Select, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetProject, UpdateProject } from '../redux/Project/project.action';
import Paginations from './Pagination';

const List = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [field, setField] = useState('Priority');
  const [screensize,setScreensize] =useState(window.innerWidth)

  const dispatch = useDispatch();
  const currentdata = useSelector((store) => store.projectReducer.data);
  const totalPage = useSelector((store) => store.projectReducer.totalPage)
  const isLoading = useSelector((store) => store.projectReducer.loading)


  const handleSorList = (event) => {
    setField(event.target.value);
  };

  const sortlist = [
    "Priority", "Projecttheme", "Reason", "Type", "Division", "Category",
    "Department", "Startdate", "Enddate", "LocationL", "Status"
  ];

  useEffect(() => {
    dispatch(GetProject(searchTerm, page, field));
  }, [])

  useEffect(() => {
    if (currentdata.length > 0) {
      setData(currentdata)
    }
  }, [currentdata])

  let timer = null;

  useEffect(() => {
    clearTimeout(timer); // Clear the previous timer

    if (searchTerm !== "") {
      timer = setTimeout(() => {
        setPage(1);
        dispatch(GetProject(searchTerm, page, field));
      }, 2000);
    } else {
      dispatch(GetProject(searchTerm, page, field));
    }

    return () => {
      clearTimeout(timer); // Clear the timer when the component unmounts or searchTerm changes
    };
  }, [searchTerm, page, field, dispatch]);

  const handleClose = (id) => {
    let url = `/statusclose/${id}`
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });

  }
  const handleStart = (id) => {
    let url = `/statusrun/${id}`
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });
  }

  const handleCancel = (id) => {
    let url = `/statuscancel/${id}`
    dispatch(UpdateProject(url)).then((res) => {
      if (res) {
        dispatch(GetProject(searchTerm, page, field));
      }
    });
  }

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  }

  console.log(page);

  const handleNext = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setScreensize(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <Box
      w={{ base: '100%', md: '100%', lg: '100%' }}
      m="auto"
      borderRadius="lg"
      mb={'50px'}
    >
      <Flex p={"20px"} flexDirection={"column"} bg={"white"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }} zIndex={1} borderRadius={"15px"}>
        <Flex justify={"space-between"}>
          <Input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            mb={4}
            w={"200px"}
            border={"none"}
            borderBottom={"1px solid gray"}
          />
          <Box color={"red"} fontWeight={"bold"}>
            {isLoading ? "....Loading" : ""}
          </Box>
          <Flex >
            <Text color={"gray"} mt={"6px"}>Sort By :</Text>
            <Select p={"0px"} m={"0px"} value={field} onChange={handleSorList} border={"none"}>
              {sortlist.map((el, index) => (
                <option key={index} value={el}>{el}</option>
              ))}
            </Select>
          </Flex>
        </Flex>
        {screensize >= 1024 ?
          (<Table variant="striped" colorScheme="gray" overflowX="auto">
            <Thead bg={"blue.100"}>
              <Tr >
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Project Name</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Reason</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Type</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Division</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Category</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Priority</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Dept</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Location</Th>
                <Th p={"10px 5px 10px 5px"} textAlign={"center"}>Status</Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.length > 0 && data.map(item => (
                <Tr key={item._id} fontSize={"14px"}>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>
                    <Flex direction={"column"}>
                      <Box fontSize={"14px"}>{item.Projecttheme}</Box>
                      <Box fontSize={"10px"} >{item.Startdate} to {item.Enddate}</Box>
                    </Flex>
                  </Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Reason}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Type}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Division}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Category}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Priority}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Department}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Location}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>{item.Status}</Td>
                  <Td p={"10px 5px 10px 5px"} textAlign={"center"} m={"0px"}>
                    <Button onClick={() => handleStart(item._id)}
                      type="submit"
                      borderRadius="20px"
                      colorScheme="blue"
                      fontSize={"14px"}
                    >
                      Start
                    </Button>
                  </Td>
                  <Td p={"0px"} m={"0px"}>
                    <Button
                      onClick={() => handleClose(item._id)}
                      type="submit"
                      borderRadius="20px"
                      border={"1px solid #3182ce"}
                      color={"#3182ce"}
                      fontSize={"14px"}
                    >
                      Close
                    </Button>
                  </Td>
                  <Td p={"0px"} m={"0px"}>
                    <Button
                      onClick={() => handleCancel(item._id)}
                      type="submit"
                      borderRadius="20px"
                      border={"1px solid #3182ce"}
                      color={"#3182ce"}
                      fontSize={"14px"}
                    >
                      Cancel
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>) :
          <Box padding={"20px"} display={"grid"} gridTemplateColumns={{md:"repeat(2,1fr)",base:"repeat(1,1fr)"}} gap={"20px"} rowGap={"20px"} >
            {data.length > 0 && data.map(item => (
              <Box key={item._id} margin={"auto"} w={"100%"} padding={"20px"} borderRadius={"20px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }} >
                <Flex textAlign={"center"} m={"0px"} justify={"space-evenly"}>
                  <Flex direction={"column"}>
                    <Box fontSize={"16px"} fontWeight={"bold"}>{item.Projecttheme}</Box>
                    <Box color={"gray"} fontSize={"10px"} >{item.Startdate} to {item.Enddate}</Box>
                  </Flex>
                  <Box fontWeight={"bold"}>
                    {item.Status}
                  </Box>
                </Flex>
                <Box  textAlign={"left"} m={"0px"} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} color={"gray"} >
                  <Text textAlign={"left"} >Reason: {item.Reason}</Text>
                  <Text textAlign={"left"} >Type: {item.Type} . Category{item.Category}</Text>
                  <Text textAlign={"left"} >Div: {item.Division} . Dept{item.Department}</Text>
                  <Text textAlign={"left"} >Location: {item.Location}</Text>
                  <Text textAlign={"left"} >Priority: {item.Priority}</Text>
                </Box>
                <Box display={"flex"} gap={"20px"} justifyContent={"center"}>
                <Button onClick={() => handleStart(item._id)}
                    type="submit"
                    borderRadius="20px"
                    colorScheme="blue"
                    fontSize={"14px"}
                  >
                    Start
                  </Button>
                  <Button
                    onClick={() => handleClose(item._id)}
                    type="submit"
                    borderRadius="20px"
                    border={"1px solid #3182ce"}
                    color={"#3182ce"}
                    fontSize={"14px"}
                  >
                    Close
                  </Button>
                  <Button
                    onClick={() => handleCancel(item._id)}
                    type="submit"
                    borderRadius="20px"
                    border={"1px solid #3182ce"}
                    color={"#3182ce"}
                    fontSize={"14px"}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        }
      </Flex>
      <Box display={"flex"} justifyContent={"center"} mt={"20px"}>
        <Paginations handlePrevious={handlePrevious} handleNext={handleNext} page={page} pageCount={totalPage} setPage={setPage} />
      </Box>
    </Box>
  );
};

export default List;
