import React, {useEffect} from 'react';
import { Spin, Divider, Row, Col, Card } from 'antd';
import { inject, observer } from 'mobx-react';

import './News.scss';


const Title = ({ title }) => (
    <div className="news__title">
        {title.title}<Divider type="vertical" />{title.date}
    </div>
);


export const News = inject('newsStore')(observer(({newsStore}) => {
    useEffect(() => {
        newsStore.fetchNews();
    }, []);

    return (
        <div className="news">
            { newsStore.loading ?
                <Row type="flex" justify="center">
                    <Col>
                        <Spin size="large" />
                    </Col>
                </Row>
                :
                <Row gutter={[0, 16]}>
                    {newsStore.news.map(news => (
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
}));