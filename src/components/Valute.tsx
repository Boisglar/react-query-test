import { useQuery } from '@tanstack/react-query';
import React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Currency {
  ID: string;
  NumCode: string;
  Name: string;
  Niminal: number;
  CharCode: string;
  Value: number;
  Previous: number;
}

const TABLE_HEADERS = ['Name', 'Nominal', 'NumCode', 'CharCode', 'Value', 'Previous'];

const fetchCuers = async () => {
  const res = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
  const data = await res.json();
  return data.Valute;
};

const ValuteTable: React.FC = () => {
  const {
    data: valutes,
    isLoading,
    error,
  } = useQuery<Currency>({ queryKey: ['valutes'], queryFn: fetchCuers });

  if (isLoading) {
    return <div>...Loading</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="valute_table">
      <Table>
        <TableHead sx={{ backgroundColor: 'grey' }}>
          <TableRow
            sx={{
              height: '40px',
            }}>
            {TABLE_HEADERS.map((head) => (
              <TableCell key={head}>{head}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {valutes &&
            Object.values(valutes).map((obj) => (
              <TableRow key={obj.ID}>
                <TableCell>{obj.Name}</TableCell>
                <TableCell>{obj.Nominal}</TableCell>
                <TableCell>{obj.NumCode}</TableCell>
                <TableCell>{obj.CharCode}</TableCell>
                <TableCell>{obj.Value}</TableCell>
                <TableCell>{obj.Previous}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ValuteTable;
