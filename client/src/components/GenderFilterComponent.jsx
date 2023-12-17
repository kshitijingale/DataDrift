import React from 'react'

const GenderFilterComponent = ({ onChange, initialValue }) => (
    <select value={initialValue} onChange={(e) => onChange(e.target.value)} className="border p-2">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
    </select>
);


export default GenderFilterComponent
