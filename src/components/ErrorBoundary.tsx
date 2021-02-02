import React, {ReactNode} from "react";

export interface ErrorState {
    hasError: boolean;
    error?: Error;
}

interface Props {
    children: ReactNode;
}

export default class ErrorBoundary extends React.Component<Props, ErrorState> {
    // Метод используется, не удалять!
    static getDerivedStateFromError(error: Error): ErrorState {
        return {hasError: true, error};
    }

    constructor(properties: Props) {
        super(properties);
        this.state = {hasError: false};
    }

    render(): ReactNode {
        const {children} = this.props;
        const {hasError} = this.state;

        if (hasError) {
            return <h1>Oops, some error detected. Refresh page or <a href="/" rel="noreferrer">go to home page</a></h1>;
        }
        return children;
    }
}
