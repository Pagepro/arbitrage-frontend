import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import Header from './Header';
import PairTable from './PairTable';

interface IState {
  config: object[]
}

class Dashboard extends React.Component <{}, IState> {

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
    const {
        config
    } = this.state;
    const tables = config.map(({ pair, exchanges }: { pair: string, exchanges: any }) =>
        <PairTable key={pair} pair={pair} exchanges={exchanges} />
    );
    return (
      <div>
        <Header section="dashboard" />
        {tables}
      </div>
    );
  }
  
}

export default Dashboard;