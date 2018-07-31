import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import Header from './Header';
import HistoryTableRow from './HistoryTableRow';

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
    let {
        config
    } = this.state;
    config = config.map(({ pair, exchanges }: { pair: string, exchanges: any }) => {
      return (
        <HistoryTableRow key={pair+"-history"} pair={pair} />
      );
    });
    return (
      <div>
        <Header section="history" />
        <header className="historyHeader">
          <h3>Last 24 hours best opportunities</h3>
        </header>
        <table className="history">
            <tbody>
                <tr>
                    <th>Pair name</th>
                    <th>Buy exchange</th>
                    <th>Sell exchange</th>
                    <th>Spread</th>
                    <th>Date & time</th>
                </tr>
                {config}
            </tbody>
        </table>
      </div>
    );
  }
  
}

export default History;