import { Box, calc } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { GetDashboardChart } from '../redux/Project/project.action';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import { Bar } from "react-chartjs-2"
import { faker } from 'react-fakers'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: '',
        },
    },
};

var labels;


const Chart = () => {
    const [data, setData] = useState([]);

    labels = data.map((el) => el.department.slice(0,5));

    let chartdata = {
        labels,
        datasets: [
            {
                label: 'Total',
                data: data.map((el) => el.registeredCount),
                backgroundColor: 'blue',
            },
            {
                label: 'Closed',
                data: data.map((el) => el.closedCount),
                backgroundColor: 'green',
            }
        ]
    }


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(GetDashboardChart()).then((res) => setData(res)).catch((e) => console.log(e));
    }, [])

    return (
        <Box>
            <Box>Department wise - Total Vs Closed</Box>
            <Box w={{base:"100%",md:"50%",sm:"100%"}} borderRadius={"15px"} p={"20px"} style={{ boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px 0px' }}>
                <Bar options={options} data={chartdata}  />
            </Box>
        </Box>
    )
}

export default Chart