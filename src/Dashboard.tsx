import * as React from 'react';
import PairTable from './PairTable';

import axios from 'axios';

class Dashboard extends React.Component <any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      config: [],
      websocket: ""
    };
  }

  public componentDidMount() {
    axios.get("/api/config")
    .then(({ data }: { data: any }) => data)
    .then((exchangesConfig: any) => {
        this.setState({
            config: exchangesConfig
        })
    });
  }

  public render() {
    let config = this.state.config;
    config = config.map((item: any, index: any)=>{
        return(
            <PairTable pair={item.pair} exchanges={item.exchanges} key={item.pair} />
        );
    });
    return (
        <div>
            {config}
        </div>
    );
  }
  
}

export default Dashboard;