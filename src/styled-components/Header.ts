import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const StyledContainer = styled.div`

`;

export const StyledLink = styled(NavLink)`
    color: #337ab7;
    margin: 0 20px;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
    &.active {
        font-weight: bold;
        color: #003673;
    }
`;

export const StyledLogo = styled.header`
    display: block;
    color: #001f3f;
    font-size: 48px;
    line-height: 1.2;
    font-weight: 200;
    text-align: center;

    a {
        color: #001f3f;
        text-decoration: none;
    }
`;

export const StyledNav = styled.nav`
    display: block;
    margin: 20px 0;
    text-align: center;
`;
