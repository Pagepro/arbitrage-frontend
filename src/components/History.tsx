import axios from 'axios';
import * as React from 'react';
import { apiConfig } from '../config/config';
import Header from './Header';
import HistoryTableRow from './HistoryTableRow';

interface IState {
  config: object[]
}

class History extends React.Component <{}, IState> {

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
    const rows = config.map(({ pair }: { pair: string }) =>
        <HistoryTableRow key={pair+"-history"} pair={pair} />
    );

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
                {rows}
            </tbody>
        </table>
      </div>
    );
  }
  
}

export default History;