import React, { memo } from "react";
import styled from "styled-components";

interface IUserCard {
    avatar: string;
    name: string;
    active: boolean;
}

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 12px;
`;

const Logo = styled.img<{ active: boolean }>`
    border-radius: 50%;
    border: 1px solid
        ${({ active }: { active: boolean }) => (active ? "gray" : "lightgray")};
    cursor: pointer;
    ${({ active }) =>
        active ? "box-shadow: 0 0 39px -5px #007bff" : ""}
`;

const Name = styled.div<{ active: boolean }>`
    text-align: center;
    color: ${({ active }) => (active ? "#007bff" : "#333")};
`;

const UserCard = ({ avatar, name, active }: IUserCard) => {
    return (
        <Layout>
            <Logo active={active} width="100px" height="100px" src={avatar} />
            <Name active={active}>{name}</Name>
        </Layout>
    );
};

export default memo(UserCard);
