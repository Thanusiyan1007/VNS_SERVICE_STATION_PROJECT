import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Legend } from 'recharts';

const data = [
    { gender: 'girls', members: 2 },
    { gender: 'boys', members: 8 },
    { gender: 'others', members: 0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const TechicianGender = () => (
    <div className='w-[20rem] bg-white p-4 rounded-sm border-gray-200 flex flex-col'>
        <strong className='text-subcolor font-medium text-lg'>Technician Details</strong>
        <div className='w-full mt-3 flex-1 text-base'>
            <ResponsiveContainer height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey='members'
                        nameKey='gender'
                        cx='50%'
                        cy='50%'
                        outerRadius={100}
                        fill='#8884d8'
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Legend
                        align='center'
                        verticalAlign='bottom'
                        iconSize={10}
                        height={40}
                        layout='horizontal'
                        formatter={(value, entry, index) => <span style={{ color: COLORS[index] }}>{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    </div>
);

export default TechicianGender;
