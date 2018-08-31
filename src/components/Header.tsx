import * as React from 'react';
import { Link } from 'react-router-dom';
import { StyledContainer, StyledLink, StyledLogo } from '../styled-components/Header';

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
            <Link to="/">
                <StyledLogo>
                    Arbitrage App
                </StyledLogo>
            </Link>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
            <StyledLink to="/history">History</StyledLink>
        </StyledContainer>
    );
  }
  
}

export default Header;