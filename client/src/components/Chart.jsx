import React, { useState } from 'react'
import BarChartComponent from './BarChartComponent'
import LineChartComponent from './LineChartComponent'

const Chart = ({ data }) => {
    const [category, setCategory] = useState('A')
    return (
        <div className="flex flex-col gap-4">
            <BarChartComponent data={data} setCategory={setCategory} />
            <LineChartComponent chartData={data} category={category} />
        </div>
    )
}

export default Chart
