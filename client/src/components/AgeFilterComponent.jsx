import React from 'react'

const AgeFilterComponent = ({ onChange, initialValue }) => (
    <select value={initialValue} onChange={(e) => onChange(e.target.value)} className="border p-2">
        <option value="15-25">Age 15-25</option>
        <option value=">25">Age &gt;25</option>
    </select>
);


export default AgeFilterComponent
