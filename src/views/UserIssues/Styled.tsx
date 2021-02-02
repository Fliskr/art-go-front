import { Col } from "react-bootstrap";
import styled from "styled-components";
import device from "../../utils/breakpoints";

export const Avatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
`;

export const Title = styled.h1`
    margin: 16px 0;
    color: #666;
`;

export const Layout = styled(Col)`
    & > .row {
        padding: 8px 4px;
        border-bottom: 1px solid lightgray;
    }
    & .row > div:last-of-type {
        text-align: end;
    }
    @media ${device.mobile} {
        font-size: 14px;
        & .row > div:last-of-type {
            text-align: start;
        }
    }
`;

export const IssueTitle = styled(Col)`
    display: flex;
    align-items: center;
`;
