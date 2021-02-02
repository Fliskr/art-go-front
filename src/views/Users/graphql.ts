import gql from "graphql-tag";

export const get_users = gql`
    query($login: String!, $first: Int) {
        search(query: $login, type: USER, first: $first) {
            edges {
                node {
                    ... on User {
                        login
                        avatarUrl
                    }
                }
            }
        }
    }
`;

export const getUserRepo = gql`
    query($login: String = "", $first: Int = 100, $after: String = null) {
        user(login: $login) {
            login
            repositories(first: $first, after: $after) {
                pageInfo {
                    endCursor
                    startCursor
                }
                totalCount
                edges {
                    node {
                        name
                        stargazerCount
                        watchers {
                            totalCount
                        }
                    }
                }
            }
        }
    }
`;