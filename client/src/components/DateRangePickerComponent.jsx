import React, { useState } from 'react';

const DateRangePickerComponent = ({ onChange, initialStartDate, initialEndDate }) => {
    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);

    const minDate = "2022-10-04";
    const maxDate = "2022-10-29";

    const handleDateChange = (e) => {
        let temp = { start: startDate, end: endDate };

        if (e.target.name === "startDate") {
            setStartDate(e.target.value);
            temp.start = e.target.value
        } else {
            setEndDate(e.target.value);
            temp.end = e.target.value
        }

        onChange(temp);
    };

    return (
        <div className="flex space-x-2">
            <input
                type="date"
                min={minDate}
                max={maxDate}
                value={startDate}
                name='startDate'
                onChange={handleDateChange}
                className="border p-2"
            />
            <input
                type="date"
                min={minDate}
                max={maxDate}
                value={endDate}
                name='endDate'
                onChange={handleDateChange}
                className="border p-2"
            />
        </div>
    );
};

export default DateRangePickerComponent;
