import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chartjs-plugin-zoom';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChartComponent = ({ chartData, category }) => {

    const data = {
        labels: chartData.map(item => item["Day"]),
        datasets: [
            {
                label: `Time trend of a particular category ${category}`,
                data: chartData.map(item => item[category]),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
                position: 'top',

            },
            title: {
                display: true,
                text: `Time trend of a particular category ${category}`,
                font: {
                    size: 20,
                    weight: 'bold',
                }
            },
            zoom: {
                zoom: {
                    wheel: { enabled: true }, // Enable zooming with mouse wheel
                    pinch: { enabled: true }, // Enable zooming with pinch gesture
                    mode: 'x', // Zoom only on the x-axis
                },
                pan: {
                    enabled: true,
                    mode: 'x',
                },
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChartComponent;
