import { Box, Flex } from '@chakra-ui/react';
import dashboardactive from "../utills/Dashboard-active.svg"
import dashboardicon from "../utills/Dashboard.svg"
import projectlistactive from "../utills/Project-list-active.svg"
import projectlist from "../utills/Project-list.svg"
import createProjectactive from "../utills/create-project-active.svg"
import createProject from "../utills/create-project.svg"
import logouticon from "../utills/Logout.svg"
import { Link, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import authlogout from '../redux/Auth/auth.action';

const Navbar = () => {
    const location = useLocation();
    const isAuth = useSelector((store) => store.authReducer.isAuth);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(authlogout());
    }
    return (
        <Flex
            direction={{ base: 'row', md: 'column' }} // Set direction to row on smaller screens, column on larger screens
            bg={"whiteAlpha.400"}
            h={{ base: '50px', md: '100vh' }} // Set height to 50px on smaller screens, full height on larger screens
            w={{ base: '100%', md: '80px' }} // Set width to 100% on smaller screens, 80px on larger screens
            justify="center"
            align="center"
            color="gray"
            position="fixed"
            style={{"box-shadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}
            left={0}
            bottom={0}
            mt={{ base: '0', md: '0', lg: '0', xl: '0', '2xl': '80px' }}
            display={{ base: 'flex', md: 'flex', lg: 'flex', xl: 'flex', '2xl': 'block' }}
            zIndex={"1"}
        >
            <Flex direction={{ base: 'row', md: 'column' }} gap={"50px"} rowGap={"50px"} align="center">
                <Link to="/">
                    <Box mb={4}>
                        <img src={location.pathname === "/" ? dashboardactive : dashboardicon} alt="Dashboard" />
                    </Box>
                </Link>
                <Link to="/list">
                    <Box mb={4}>
                        <img src={location.pathname === "/list" ? projectlistactive : projectlist} alt="List" />
                    </Box>
                </Link>
                <Link to="/add-project">
                    <Box mb={4}>
                        <img src={location.pathname === "/add-project" ? createProjectactive : createProject} alt="Add Project" />
                    </Box>
                </Link>
                {isAuth && (<Box mb={4} onClick={handleLogout}>
                    <img src={logouticon} alt="logout" />
                </Box>)}
            </Flex>
        </Flex>
    );
};

export default Navbar;
