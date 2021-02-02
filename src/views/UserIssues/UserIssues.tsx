import React, { memo, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import dayjs from "dayjs";
import CreateIssueModal from "../../components/CreateIssueModal";
import { Issue, QueryGetIssues } from "./interfaces";
import { QueryVariables } from "./interfaces";
import { getRepositoryData } from "./graphql";
import { Avatar, IssueTitle, Layout, Title } from "./Styled";

const UserRepository = () => {
    const { owner, name } = useParams<Omit<QueryVariables, "first">>();
    const [modalOpen, setModalOpen] = useState(false);
    const [getRepositories, { data, loading, error }] = useLazyQuery<
        QueryGetIssues,
        QueryVariables
    >(getRepositoryData, {
        variables: { name, owner },
        fetchPolicy: "network-only",
    });
    const issues: Issue[] =
        data?.repository?.issues?.edges?.map(
            ({
                node: {
                    title,
                    createdAt,
                    author: { login, avatarUrl },
                },
            }) => ({
                login,
                title,
                createdAt,
                avatarUrl,
            })
        ) || [];
    const { stargazerCount: stars, watchers, id: repositoryId = "" } =
        data?.repository ?? {};
    const { totalCount } = watchers ?? {};
    useEffect(() => {
        if (!modalOpen) {
            getRepositories({
                variables: { name, owner },
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpen]);

    return (
        <Container>
            <Link to="/">Home</Link>
            <Title>
                <Row>
                    <Col lg={6}>
                        <b>{name}</b>
                    </Col>
                    <Col lg={6}>
                        {stars} stars / {totalCount} watching
                    </Col>
                </Row>
            </Title>
            {error && <div>Error requesting repository {name}</div>}

            {loading && <Spinner animation={"grow"} />}
            {!loading && !error && (
                <Layout>
                    <Row>
                        <Col lg={4} xs={12}>
                            <b>Issue title</b>
                        </Col>
                        <Col lg={{ span: 4, offset: 4 }} xs={12}>
                            <Button
                                variant="primary"
                                onClick={() => setModalOpen(true)}
                            >
                                Create new issue
                            </Button>
                        </Col>
                    </Row>
                    {issues.map(({ login, title, createdAt, avatarUrl }) => (
                        <Row key={title + login + createdAt}>
                            <IssueTitle xs={12} lg={4}>
                                {title}
                            </IssueTitle>

                            <Col xs={12} lg={{ span: 4, offset: 4 }}>
                                {dayjs(createdAt).fromNow()}{" "}
                                by {login} <Avatar src={avatarUrl} />
                            </Col>
                        </Row>
                    ))}
                </Layout>
            )}
            <CreateIssueModal
                repositoryId={repositoryId}
                open={modalOpen}
                setOpen={setModalOpen}
            />
        </Container>
    );
};

export default memo(UserRepository);
