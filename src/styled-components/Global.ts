import styled from 'styled-components';

export const AppInner = styled.div`
    max-width: 1232px;
    margin: 0 auto;
    padding: 16px;
`;

export const StyledContainer = styled.div`
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
    font-size: 14px;
    background: #f1f3f5;
`;

export const Heading = styled.h1`
    margin: 20px 0 10px;
    font-size: 28px;
    font-weight: 600;
`;

export const Table = styled.table`
    width: 100%;
    margin-bottom: 40px;
    text-align: left;
    border-spacing: 0;
    border-collapse: collapse;
    background: #fff;
    box-shadow: 0 6px 8px rgba(102,119,136,.03), 0 1px 2px rgba(102,119,136,.3);
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
    padding: 8px;
    border-top: 1px solid #ddd;
`;

export const TableRow = styled.tr`
    transition: all 256ms ease;
`;

export const TableCell = styled.td`
    padding: 8px;
    border-top: 1px solid #ddd;
`;
