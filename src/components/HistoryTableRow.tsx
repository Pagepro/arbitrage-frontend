import axios from 'axios';
import * as Moment from 'moment';
import * as React from 'react';
import { apiConfig } from '../config/config';

interface IProps {
    pair: string
}

interface IState {
    buyExchange: string,
    sellExchange: string,
    spread: number,
    time: string
}

class HistoryTableRow extends React.Component <IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
        buyExchange: '',
        sellExchange: '',
        spread: 0,
        time: ''
    };
    this.sendRequest = this.sendRequest.bind(this);
    this.sendRequest();
  }

  public sendRequest() {
    axios.get(`${apiConfig.history}/${this.props.pair.replace("/", "-")}`)
    .then(({ data }: { data: any }) => data)
    .then((spread: any) => {

        this.setState({
            buyExchange: spread.buyExchange,
            sellExchange: spread.sellExchange,
            spread: spread.spread,
            time: Moment(spread.time).toString()
        });
    });
  }

  public render() {
    return (
        <tr>
            <td className='pair'>{this.props.pair}</td>
            <td>{this.state.buyExchange}</td>
            <td>{this.state.sellExchange}</td>
            <td>{this.state.spread}%</td>
            <td>{this.state.time}</td>
        </tr>
    );
  }
  
}

export default HistoryTableRow;
