import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const BarChartComponent = ({ data, setCategory }) => {
    const labels = ['A', 'B', 'C', 'D', 'E', 'F']
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Product analytics',
                data: ['A', 'B', 'C', 'D', 'E', 'F'].map(key => {
                    const ans = data.reduce((acc, item) => {
                        return {
                            sum: acc.sum + Number(item[key]),
                            len: acc.len + 1,
                            per: (acc.sum + Number(item[key])) / acc.len + 1
                        }
                    }, { sum: 0, len: 0, per: 0 })
                    return ans.per
                }),
                backgroundColor: [
                    '#FF6384', // Red
                    '#36A2EB', // Blue
                    '#FFCE56', // Yellow
                    '#4BC0C0', // Teal
                    '#9966FF', // Purple
                    '#FF9F40', // Orange
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        indexAxis: 'y',
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Time spent on features',
                font: {
                    size: 20,
                    weight: 'bold',
                }
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time spent',
                },
                beginAtZero: true,
            },
            y: {
                title: {
                    display: true,
                    text: 'Features',
                },
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const clickedBarIndex = elements[0].index;
                const clickedBarLabel = labels[clickedBarIndex];
                setCategory(clickedBarLabel)
            }
        },
    };

    return <Bar data={chartData} options={options} />;
};


export default BarChartComponent