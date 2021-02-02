export interface Search<T> {
    search: {
        edges: T[];
    };
}

export interface UserNode {
    node: {
        avatarUrl: string;
        login: string;
    };
}

export interface RepositoryNode {
    node: {
        name: string;
        stargazerCount: number;
        watchers: { totalCount: number };
    };
}

export interface QueryVariables {
    login: string;
    first: number;
    after?: string;
}

export interface QueryUserRepositories {
    user: {
        login: string;
        repositories: {
            edges: RepositoryNode[];
        };
    };
}