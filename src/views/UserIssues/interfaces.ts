export interface QueryVariables {
    name: string;
    owner: string;
    first?: number;
}

export interface QueryGetIssues {
    repository: {
        name: string;
        id: string;
        stargazerCount: number;
        watchers: {
            totalCount: number;
        };
        issues: {
            edges: QueryIssue[];
        };
    };
}

export interface QueryIssue {
    node: {
        title: string;
        createdAt: string;
        author: {
            login: string;
            avatarUrl: string;
        };
    };
}

export interface Issue {
    login: string;
    title: string;
    createdAt: string;
    avatarUrl: string;
}
