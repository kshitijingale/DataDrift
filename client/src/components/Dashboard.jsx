import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import AgeFilterComponent from './AgeFilterComponent';
import GenderFilterComponent from './GenderFilterComponent';
import DateRangePickerComponent from './DateRangePickerComponent';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Chart from './Chart';
// Import any other necessary components or services

const Dashboard = () => {
    const searchParams = new URLSearchParams(document.location?.search);
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    // Define default filters
    const defaultFilters = {
        age: '15-25', // Default age range
        gender: 'Female', // Default gender
        dateRange: { start: '2022-10-04', end: '2022-10-29' } // Default date range
    };

    // Attempt to get filters from cookies or set to default
    const [filters, setFilters] = useState({
        age: Cookies.get('age') || defaultFilters.age,
        gender: Cookies.get('gender') || defaultFilters.gender,
        dateRange: Cookies.get('dateRange') ? JSON.parse(Cookies.get('dateRange')) : defaultFilters.dateRange
    });

    // Function to fetch data from the API
    const fetchData = async (currentFilters) => {
        try {
            // Destructure the filters to be used as query parameters
            const { age, gender, dateRange } = currentFilters;
            // Pass the filters as query parameters to the API call
            const response = await axios.get(`${process.env.REACT_APP_URL}api/data`, {
                params: {
                    age,
                    gender,
                    dateRangeStart: dateRange?.start,
                    dateRangeEnd: dateRange?.end
                }
            });
            setData(response.data)
        } catch (error) {
            console.log(error);
        }
    };


    // Update filters and set cookies
    const handleFilterChange = (filterType, value) => {
        const newFilters = { ...filters, [filterType]: value };
        Cookies.set(filterType, filterType === 'dateRange' ? JSON.stringify(value) : value);
        navigate(`/?filters=${JSON.stringify(newFilters)}`)
        setFilters(newFilters);
    };

    const handleLogout = () => {
        localStorage.clear();
        sessionStorage.clear();

        const allCookies = Cookies.get(); // Get all cookies

        // Remove each cookie
        Object.keys(allCookies).forEach(cookieName => {
            Cookies.remove(cookieName);
        });
        navigate("/login");
    }

    useEffect(() => {
        fetchData(filters);
    }, [filters]);

    useEffect(() => {
        const paramsFilters = searchParams.get("filters")
        let filtersTempObj = { ...filters }

        if (paramsFilters) {
            filtersTempObj = JSON.parse(paramsFilters)
            setFilters(filtersTempObj)
        }

    }, [document.location?.search]);

    useEffect(() => {
        const status = localStorage.getItem("loginStatus");
        if (!status) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="container mx-auto p-4">
            <div className='flex justify-between items-center mb-4'>
                <h1 className="text-2xl font-bold ">Dashboard</h1>
                <button
                    aria-current="true"
                    onClick={handleLogout}
                    className="block  cursor-pointer rounded-lg border-b border-gray-200 bg-red-500 px-4 py-2 text-white hover:bg-red-700 dark:border-gray-600 dark:bg-gray-800"
                >
                    Logout
                </button>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <AgeFilterComponent initialValue={filters.age} onChange={(value) => handleFilterChange('age', value)} />
                <GenderFilterComponent initialValue={filters.gender} onChange={(value) => handleFilterChange('gender', value)} />
                <DateRangePickerComponent initialStartDate={filters.dateRange.start}
                    initialEndDate={filters.dateRange.end} onChange={(value) => handleFilterChange('dateRange', value)} />
            </div>
            <Chart data={data} />

        </div>
    );
};

export default Dashboard;
