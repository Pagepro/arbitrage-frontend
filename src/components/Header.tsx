import * as React from 'react';
import { Link } from 'react-router-dom';

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
            <Link to="/dashboard" className={this.props.section === "dashboard" ? "nav active" : "nav"}>Dashboard</Link>
            <Link to="/history" className={this.props.section === "history" ? "nav active" : "nav"}>History</Link>
        </div>
    );
  }
  
}

export default Header;