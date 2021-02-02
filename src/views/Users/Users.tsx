import React, { ChangeEvent, useCallback, useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";
import {
    Col,
    Container,
    Form,
    InputGroup,
    Row,
    Spinner,
} from "react-bootstrap";
import { debounce } from "../../utils/debounce";
import UserCard from "../../components/UserCard";
import UserRepositoriesList, {
    UserRepository,
} from "../../components/UserRepositoriesList";
import {
    QueryUserRepositories,
    QueryVariables,
    Search,
    UserNode,
} from "./interfaces";
import { getUserRepo, get_users } from "./graphql";
import { SearchButton, SearchForm } from "./Styled";

const maxUsersPerRequest = 30;

function Users() {
    const [selected, setSelected] = useState<string>("");
    const [search, setSearch] = useState("");
    const [repositories, setRepositories] = useState<UserRepository[]>([]);
    const repositoriesPageSize = 100;

    let [getUsers, { data, loading }] = useLazyQuery<
        Search<UserNode>,
        QueryVariables
    >(get_users);
    let [getUserRepos, { loading: repositoriesLoading }] = useLazyQuery<
        QueryUserRepositories,
        QueryVariables
    >(getUserRepo, {
        onCompleted: (data) => {
            const repositories = data?.user?.repositories?.edges?.map(
                ({
                    node: {
                        name,
                        stargazerCount,
                        watchers: { totalCount },
                    },
                }) => ({
                    name,
                    stars: stargazerCount,
                    watchers: totalCount,
                })
            );
            setRepositories(repositories);
        },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSearchUser = useCallback(
        debounce((search) => {
            getUsers({
                variables: {
                    login: search,
                    first: maxUsersPerRequest,
                },
            });
        }, 100),
        []
    );
    useEffect(() => {
        getUserRepos({
            variables: {
                login: selected,
                first: repositoriesPageSize,
            },
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);
    const users =
        data?.search?.edges
            ?.map(({ node }) => node)
            .filter(({ login }) => !!login)
            .filter(({ login }) => login.toLowerCase().includes(search))
            .slice(0, 20) || [];

    return (
        <Container>
            <h1>Search user on GitHub.com</h1>
            <Row>
                <SearchForm
                    onSubmit={(e: Event) => {
                        e.preventDefault();
                        handleSearchUser(search);
                    }}
                >
                    <Form.Row>
                        <InputGroup className="mb-4">
                            <Form.Control
                                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search Users..."
                                aria-label="User name"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup.Prepend>
                                <SearchButton variant="primary" type="submit">
                                    {loading && (
                                        <>
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                            />
                                            <span className="sr-only">
                                                Loading...
                                            </span>
                                        </>
                                    )}
                                    {!loading && <span>Search</span>}
                                </SearchButton>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </Form.Row>
                </SearchForm>
                {!loading &&
                    users.map(({ avatarUrl, login }) => (
                        <Col
                            key={login}
                            onClick={() => setSelected(login)}
                            lg={2}
                            xs={6}
                        >
                            <UserCard
                                avatar={avatarUrl}
                                name={login}
                                active={selected === login}
                            />
                        </Col>
                    ))}
            </Row>
            {!repositoriesLoading && repositories.length > 0 && (
                <UserRepositoriesList
                    user={selected}
                    repositories={repositories}
                ></UserRepositoriesList>
            )}
            {repositoriesLoading && <Spinner animation={"border"} />}
        </Container>
    );
}

export default Users;
