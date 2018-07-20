import axios from 'axios';
import * as React from 'react';
import { apiConfig } from './config/config';
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
    const {
        config
    } = this.state;
    return config.map(({ pair, exchanges }: { pair: string, exchanges: any }) => (
        <PairTable pair={pair} exchanges={exchanges} key={pair} />
    ));
  }
  
}

export default Dashboard;