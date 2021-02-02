import reportWebVitals from "./reportWebVitals";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import Users from "./views/Users/Users";
import "bootstrap/dist/css/bootstrap.min.css";
import UserRepository from "./views/UserIssues/UserIssues";
import ErrorBoundary from "./components/ErrorBoundary";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
dayjs.extend(relativeTime)

const client = new ApolloClient({
    uri: "https://api.github.com/graphql",
    cache: new InMemoryCache(),
    headers: {
        Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    },
});

ReactDOM.render(
    <ErrorBoundary>
        <ApolloProvider client={client}>
            <Router>
                <Route path="/" component={Users} exact />
                <Route path="/:owner/:name" component={UserRepository} />
            </Router>
        </ApolloProvider>
    </ErrorBoundary>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
