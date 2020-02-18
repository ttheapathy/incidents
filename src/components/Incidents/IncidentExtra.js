import React from 'react';
import { Divider } from 'antd';


export const IncidentExtra = ({ extra }) => {
    return (
        <div className="incidents__extra">
            <Divider type="vertical" />
            {(new Date(extra.date_created)).toLocaleDateString()}
        </div>
    );
};