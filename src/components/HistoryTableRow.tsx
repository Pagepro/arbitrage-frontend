import axios from 'axios';
import * as Moment from 'moment';
import * as React from 'react';
import { apiConfig } from '../config/config';
import { TableCell } from '../styled-components/Global';

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
            <TableCell>{this.props.pair}</TableCell>
            <TableCell>{this.state.buyExchange}</TableCell>
            <TableCell>{this.state.sellExchange}</TableCell>
            <TableCell>
                {
                    this.state.spread !== '-'
                    ? `${this.state.spread}%`
                    : this.state.spread
                }
            </TableCell>
            <TableCell>{this.state.time}</TableCell>
        </tr>
    );
  }
  
}

export default HistoryTableRow;
