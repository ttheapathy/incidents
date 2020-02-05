import React, {useContext, useEffect} from 'react';
import { Spin, Divider, Row, Col, Card } from 'antd';

import {NewsContext} from "../context/news/NewsContext";

import './News.scss';

const Title = ({ title }) => (
    <div className="news__title">
        {title.title}<Divider type="vertical" />{title.date}
    </div>
);

export const News = () => {
    const {loading, news, fetchNews} = useContext(NewsContext);
    useEffect(() => {
        fetchNews()
        // eslint-disable-next-line
    }, []);

return (
    <div className="news">
        { loading ?
            <Row type="flex" justify="center">
                <Col>
                    <Spin size="large" />
                </Col>
            </Row>
            :
            <Row gutter={[0, 16]}>
                {news.map(news => (
                 <Col key={news.id}>
                     <Card title={<Title title={{title: news.title, date: news.date_created}} /> }>
                         <div className="news__content" dangerouslySetInnerHTML={{__html: news.description}} />
                     </Card>
                 </Col>
                ))}
            </Row>
        }
    </div>
    );
};
