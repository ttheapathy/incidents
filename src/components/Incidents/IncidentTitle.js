import React from 'react';
import { Divider, Button } from 'antd';
import { inject } from 'mobx-react';


export const IncidentTitle = inject('incidentStore')(({ title, incidentStore }) => {

    const priority_color = {
        'minor': '#A9A9A9',
        'low': '#DAA520',
        'medium': '#FF00FF',
        'high': '#f5222d'
    };

    return (
        <div className="incidents__priority">
            {title.title}
            <Divider type="vertical" />
            <Button 
                type="primary" 
                size="small" 
                style={{ backgroundColor: priority_color[title.priority], borderColor: priority_color[title.priority]}}
                onClick={() => incidentStore.setFilter('priority', title.priority)}
            >
                {title.priority}
            </Button>
            <Divider type="vertical" />
            <Button 
                type="primary" 
                size="small"
                onClick={() => incidentStore.setFilter('status', title.status)}
            >
                {title.status}
            </Button>
        </div>
    );
});