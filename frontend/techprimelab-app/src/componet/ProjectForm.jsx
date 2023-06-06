import { Box, Button, Card, Flex, FormControl, FormLabel, Input, Select, SimpleGrid, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProjectCreateData } from '../redux/Project/project.action';

const ProjectForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        Startdate: "",
        Enddate: "",
        Reason: "For Business",
        Type: "internal",
        Division: "Filters",
        Category: "Quality A",
        Priority: "High",
        Department: "Strategy",
        Location: "Pune",
        Projecttheme: "",
    });

    let message = useSelector((store) => store.projectReducer.message)

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputStartDateChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            Startdate: e.target.value,
        }));
    };

    const handleInputEndDateChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            Enddate: e.target.value,
        }));
    };

    const handleSubmit = () => {
        console.log(formData)
        if (formData.Projecttheme !== "" && formData.Startdate !== "" && formData.Enddate !== "") {
            dispatch(ProjectCreateData(formData))
                .then((res) => {
                    alert(res.message);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("Please fill the required feild first!")
        }
    };

    return (
        <Card
            w={{ base: "90%", md: "97%", lg: "97%" }}
            m="auto"
            ml="20px"
            borderRadius="lg"
            p="6"
            style={{ boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px" }}
            mb={"50px"}
        >
            <Flex flexDirection={{ base: "column", lg: "row" }}>
                <Box spacing="4" w={{ base: "100%", lg: "98%" }} mb={5} >
                    <Box >
                        <Input
                            align="start"
                            w={{ base: "100%", lg: "70%" }}
                            borderWidth="1px"
                            borderColor="black"
                            h="70px"
                            p="5"
                            placeholder="Enter Project Theme"
                            name="Projecttheme"
                            type="Projecttheme"
                            onChange={handleInputChange}
                        />
                        {formData.Projecttheme === "" && (
                            <Text mt={2} color="red.500" textAlign="left">
                                Project theme is required!
                            </Text>
                        )}
                    </Box>

                    <SimpleGrid columns={[1, 2, 3]} gap={{ base: "3", lg: "8" }}>
                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Reason
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Reason"
                                type="Reason"
                                value={formData.Reason}
                            >
                                <option value="For Business">For Business</option>
                                <option value="Dealership">Dealership</option>
                                <option value="Transport">Transport</option>
                            </Select>

                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Type
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Type"
                                type="Type"
                                value={formData.Type}
                            >
                                <option value="Internal">Internal</option>
                                <option value="External">External</option>
                                <option value="Vendor">Vendor</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Division
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Division"
                                type="Division"
                                value={formData.Division}
                            >
                                <option value="Filters">Filters</option>
                                <option value="Compressor">Compressor</option>
                                <option value="Pumps">Pumps</option>
                                <option value="Glass">Glass</option>
                                <option value="Water Heater">Water Heater</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Category
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Category"
                                type="Category"
                                value={formData.Category}
                            >
                                <option value="Quality A">Quality A</option>
                                <option value="Quality B">Quality B</option>
                                <option value="Quality C">Quality C</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Priority
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Priority"
                                type="Priority"
                                value={formData.Priority}
                            >
                                <option value="High">High</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Department
                            </FormLabel>
                            <Select
                                h="50px"
                                border="1px solid black"
                                onChange={handleInputChange}
                                name="Department"
                                type="Department"
                                value={formData.Department}
                            >
                                <option value="Strategy">Strategy</option>
                                <option value="Finance">Finance</option>
                                <option value="Quality">Quality</option>
                                <option value="Stores">Stores</option>
                                <option value="Maintenance">Maintenance</option>
                            </Select>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Start Date as per Project Plan
                            </FormLabel>
                            <Box>
                                <Input
                                    h="50px"
                                    type="date"
                                    onChange={handleInputStartDateChange}
                                    border="1px solid black"
                                />
                                {formData.Startdate === "" && (
                                    <Text mt={2} color="red.500" textAlign="left">
                                        StartDate is required!
                                    </Text>
                                )}
                            </Box>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                End Date as per Project Plan
                            </FormLabel>
                            <Box>
                                <Input
                                    h="50px"
                                    type="date"
                                    border="1px solid black"
                                    onChange={handleInputEndDateChange}
                                />
                                {formData.Enddate === "" && (
                                    <Text mt={2} color="red.500" textAlign="left">
                                        EndDate is required!
                                    </Text>
                                )}
                            </Box>
                        </FormControl>

                        <FormControl>
                            <FormLabel fontWeight={400} color="gray">
                                Location
                            </FormLabel>
                            <Select
                                border="1px solid black"
                                h="50px"
                                onChange={handleInputChange}
                                name="Location"
                                type="Location"
                                value={formData.Location}
                            >
                                <option value="Pune">Pune</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Kolkata">Kolkata</option>
                                <option value="Bangluru">Bangluru</option>
                            </Select>
                        </FormControl>
                    </SimpleGrid>
                    <Flex
                        justifyContent={{ base: "start", md: "end", lg: "end" }}
                        mr={{ lg: "21%" }}
                        mt="20px"
                    >
                        <Text color="gray">Status:</Text>
                        <Text fontWeight={600}> Registered </Text>
                    </Flex>
                </Box>

                <Box>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        borderRadius="20px"
                        colorScheme="blue"
                        p="5"
                        w="180px"
                    >
                        Save Project
                    </Button>
                </Box>
            </Flex>
            {message && <Text mt={2} color="red.500" textAlign="left">
                {message}
            </Text>}
        </Card>
    );
};

export default ProjectForm;
