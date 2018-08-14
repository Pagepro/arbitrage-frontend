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
    spread: string,
    time: string
}

class HistoryTableRow extends React.Component <IProps, IState> {

  constructor(props: any) {
    super(props);

    this.state = {
        buyExchange: '',
        sellExchange: '',
        spread: '-',
        time: ''
    };
    this.sendRequest = this.sendRequest.bind(this);
  }

  public componentDidMount() {
    this.sendRequest();
  }

  public sendRequest() {
    axios.get(`${apiConfig.history}/${this.props.pair.replace("/", "-")}`)
    .then(({ data }: { data: any }) => data)
    .then((spread: any) => {
        if (spread) {
            this.setState({
                buyExchange: spread.buyExchange,
                sellExchange: spread.sellExchange,
                spread: spread.spread.toString(),
                time: Moment(spread.time).format("MMMM Do YYYY, HH:mm:ss")
            });
        }
    });
  }

  public render() {
    return (
        <tr>
            <td className='pair'>{this.props.pair}</td>
            <td>{this.state.buyExchange}</td>
            <td>{this.state.sellExchange}</td>
            <td>
                {
                    this.state.spread !== '-'
                    ? `${this.state.spread}%`
                    : this.state.spread
                }
            </td>
            <td>{this.state.time}</td>
        </tr>
    );
  }
  
}

export default HistoryTableRow;
