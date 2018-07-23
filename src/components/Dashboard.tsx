import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import Header from './Header';
import PairTable from './PairTable';

class Dashboard extends React.Component <any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      config: []
    };
  }

  public componentDidMount() {
    axios.get(apiConfig.config)
    .then(({ data }: { data: any }) => data)
    .then((exchangesConfig: any) => {
        this.setState({
            config: exchangesConfig
        })
    });
  }

  public render() {
    let {
        config
    } = this.state;
    config = config.map(({ pair, exchanges }: { pair: string, exchanges: any }) => {
      return (
        <PairTable key={pair} pair={pair} exchanges={exchanges} />
      );
    });
    return (
      <div>
        <Header section="dashboard" />
        {config}
      </div>
    );
  }
  
}

export default Dashboard;