import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import Header from './Header';

class History extends React.Component <any, any> {

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
    return (
      <div>
        <Header section="history" />
      </div>
    );
  }
  
}

export default History;