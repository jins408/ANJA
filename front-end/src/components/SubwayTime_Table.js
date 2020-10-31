import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    tablecon: {
        width: '345px',
        margin: '0 15px 5rem 15px',
    },
    table: {
        width: '100%',
    },
    tablehead:{
        backgroundColor: '#00BFFF',
    },
    headfont:{
        fontWeight: 'bold',
        fontSize: '1.1rem'
    },
    subwaytime_header: {
        textAlign: 'center',
        fontSize: '3rem'
    }
});

function createData(upward, downward) {
  return { upward, downward };
}

const rows = [
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
  createData('05:23', '05:25'),
  createData('05:33', '05:35'),
  createData('05:43', '05:45'),
  createData('05:53', '05:55'),
  createData('06:03', '06:05'),
];

const SubwayTime_Table = (props) =>{
    const classes = useStyles();

    console.log(props.radio_value)

    return (
        <TableContainer className={classes.tablecon} component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead className={classes.tablehead}>
                <TableRow>
                    <TableCell className={classes.headfont} align="center">상행</TableCell>
                    <TableCell className={classes.headfont} align="center">하행</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row, index) => (
                    <TableRow key={index}>
                    <TableCell align="center">{row.upward}</TableCell>
                    <TableCell align="center">{row.downward}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    )
}

export default SubwayTime_Table;