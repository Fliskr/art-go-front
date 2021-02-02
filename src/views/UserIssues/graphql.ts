import gql from "graphql-tag";

export const getRepositoryData = gql`
    query getRepos($name: String!, $owner: String!, $first: Int = 100) {
        repository(name: $name, owner: $owner) {
            name
            id
            stargazerCount
            watchers{
                totalCount
            }
            issues(
                states: OPEN
                first: $first
                orderBy: { field: CREATED_AT, direction: DESC }
            ) {
                edges {
                    node {
                        title
                        createdAt
                        author {
                            login
                            avatarUrl
                        }
                    }
                }
            }
        }
    }
`;
