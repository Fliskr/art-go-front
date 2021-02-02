import React, { memo, useCallback, useEffect, useState } from "react";
import { Col, Container, Pagination, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";
import device from "../utils/breakpoints";

export interface UserRepository {
    name: string;
    stars: number;
    watchers: number;
}

const Layout = styled(Container)`
    margin-top: 16px;
    color: #666;
    .row {
        padding-bottom: 12px;
        font-size: 16px;
        border-bottom: 1px solid lightgray;
        margin: 12px 0;
    }
    .row:first-of-type {
        color: #333;
        font-weight: bolder;
        padding-bottom: 12px;
    }
    .row div:last-of-type {
        text-align: end;
        @media ${device.mobile} {
            text-align: start;
        }
    }
`;

interface Props {
    repositories: UserRepository[];
    pageSize?: number;
    user: string;
}

const UserRepositories = ({ repositories, pageSize = 10, user }: Props) => {
    const [page, setPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    useEffect(() => {
        setPage(0);
        setPageCount(Math.ceil(repositories.length / pageSize));
    }, [repositories, pageSize]);

    const paginationItems = useCallback(() => {
        const items = [];
        for (let i = 0; i < pageCount; i++) {
            items.push(
                <Pagination.Item
                    onClick={() => setPage(i)}
                    key={i}
                    active={i === page}
                >
                    {i + 1}
                </Pagination.Item>
            );
        }
        return items;
    }, [pageCount, page]);

    return (
        <Layout>
            <Row>
                <Col xs={12} md={8}>
                    Repository name
                </Col>
                <Col xs={12} md={4}>
                    Stars / Watchers
                </Col>
            </Row>
            {repositories
                .slice(page * pageSize, (page + 1) * pageSize)
                .map(({ name, stars, watchers }) => (
                    <Row key={name}>
                        <Col xs={12} md={8}>
                            <Link to={`/${user}/${name}`}>{name}</Link>
                        </Col>
                        <Col xs={12} md={4}>
                            {stars} stars / {watchers} watching
                        </Col>
                    </Row>
                ))}
            {pageCount > 0 && <Pagination>{paginationItems()}</Pagination>}
        </Layout>
    );
};

export default memo(UserRepositories);
