import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledContainer = styled.div`
    align-items: center;
    display: flex;
`;

export const StyledLink = styled(NavLink)`
    color: #337ab7;
    font-style: italic;
    margin-left: 20px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    &.active {
        color: #003673;
    }
`;

export const StyledLogo = styled.header`
    color: #000;
    cursor: pointer;
    display: inline-block;
    font-size: 48px;
    font-weight: bold;
`;
