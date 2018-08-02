import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

interface IProps {
    section: string
}

class Header extends React.Component <IProps, {}> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
        <div className="siteHeader">
            <Link to="/">
                <header>
                    Arbitrage App
                </header>
            </Link>
            <NavLink to="/dashboard" className="nav" activeClassName="active">Dashboard</NavLink>
            <NavLink to="/history" className="nav" activeClassName="active">History</NavLink>
        </div>
    );
  }
  
}

export default Header;