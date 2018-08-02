import * as React from 'react';

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
            <a href="/">
                <header>
                    Arbitrage App
                </header>
            </a>
            <a href="/dashboard" className={this.props.section === "dashboard" ? "nav active" : "nav"}>Dashboard</a>
            <a href="/history" className={this.props.section === "history" ? "nav active" : "nav"}>History</a>
        </div>
    );
  }
  
}

export default Header;