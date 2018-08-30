import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HeaderDiv, HeaderHeader, HeaderNav } from '../utils/styledComponents';

const navStyle = {
    color: '#225895'
};

const activeNavStyle = {
    color: '#003673'
};

interface IProps {
    section: string
}

class Header extends React.Component <IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
        <HeaderDiv>
            <Link to="/">
                <HeaderHeader>
                    Arbitrage App
                </HeaderHeader>
            </Link>
            <HeaderNav>
                <NavLink to="/dashboard" style={navStyle} activeStyle={activeNavStyle}>Dashboard</NavLink>
                </HeaderNav>
            <HeaderNav>
                <NavLink to="/history" style={navStyle} activeStyle={activeNavStyle}>History</NavLink>
            </HeaderNav>
        </HeaderDiv>
    );
  }
  
}

export default Header;