import styled from 'styled-components';

interface ICellProps {
    spread: number;
}

interface IRowProps {
    updated: boolean;
}

interface IProfitCellProps {
    profit: number;
}

export const StyledHighlightedRow = styled.tr`
    transition: all 128ms ease;
    background-color: ${(p: IRowProps) => p.updated ? '#DDDDDD' : ''}
`;

export const StyledExchangeLink = styled.a`
    color: #003673;
`;

export const StyledHighlightedCell = styled.td`
    padding: 8px;
    border-top: 1px solid #ddd;
    color: ${(p: ICellProps) => p.spread !== 0 ?
        p.spread > 0 ?
            '#3D9970' :
            '#FF4136' :
        ''}
`;

export const StyledHighlightedProfitCell = styled.td`
    padding: 8px;
    border-top: 1px solid #ddd;
    color: ${(p: IProfitCellProps) => p.profit !== 0 ?
        p.profit > 0 ?
            '#3D9970' :
            '#FF4136' :
        ''}
`;
