import styled from 'styled-components';

interface ICellProps {
    spread: number;
}

interface IRowProps {
    updated: boolean;
}

export const StyledTableCell = styled.td`
    text-align: center;
    font-size: 14px;
    width: 10vw;
    margin: 0;
    padding: 5px;
    border-style: solid;
    border-color: #000;
    border-width: 1px 2px;
`;
  
export const StyledHighlightedRow = styled.tr`
    background-color: ${(p: IRowProps) => p.updated ? '#ffff4d' : ''}
`;

export const StyledExchangeLink = styled.a`
    color: #003673;
    text-decoration: none;
    font-style: italic;
`;
  
export const StyledHighlightedCell = styled.td`
    text-align: center;
    font-size: 14px;
    width: 10vw;
    margin: 0;
    padding: 5px;
    border-style: solid;
    border-color: #000;
    border-width: 1px 2px;
    background-color: ${(p: ICellProps) => p.spread !== 0 ?
        p.spread > 0 ?
            '#4dff4d' :
            '#ff1a1a' :
        ''}
`;
