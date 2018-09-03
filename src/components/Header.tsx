import * as React from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledLink, StyledLogo, StyledNav } from '../styled-components/Header';

interface IProps {
    section: string
}

class Header extends React.Component <IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
        <StyledContainer>
            <StyledLogo>
              <Link to="/">
                Cryptocurrency Arbitrage Monitor
              </Link>
            </StyledLogo>
            <StyledNav>
              <StyledLink to="/dashboard">Dashboard</StyledLink>
              <StyledLink to="/history">History</StyledLink>
            </StyledNav>
        </StyledContainer>
    );
  }
}

export default Header;
