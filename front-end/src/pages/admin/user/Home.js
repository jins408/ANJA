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
    traininfo: {
        width: '800px',
        height: '300px',
        border: '1px solid black',
        margin: 'auto'
    },
    vdeio: {
        width: '400px',
        height: '150px',
        border: '1px solid black',
    },
    table: {
        width: '100%'
    },
    tablecon: {
        width: '800px',
        margin: 'auto'
    },
    tableheadback:{
        backgroundColor: 'gray',
    },
    tableheadfont:{
        color: 'white',
        fontSize: '1.2rem'
    }

});

function createData(date, gowork, offwork) {
    return { date, gowork, offwork};
}

const rows = [
    createData('2020/11/04', '05:33' , '00:30'),
    createData('2020/11/04', '05:33' , '00:30'),
    createData('2020/11/04', '05:33' , '00:30'),
    createData('2020/11/04', '05:33' , '00:30'),
];

const Home = () => {
    const classes = useStyles();


    return (
        <div>
            <h1 className="text-center">서울행 급행열차</h1>
            <div className={classes.traininfo}>
                <div className="d-flex justify-content-between">
                    <div className={classes.vdeio}>cctv</div>
                    <div className={classes.vdeio}>cctv</div>
                </div>
                <div className="d-flex justify-content-between">
                    <div className={classes.vdeio}>로그</div>
                    <div className={classes.vdeio}>신고</div>
                </div>
            </div>
            <h1 className="text-center">출근부</h1>
            <TableContainer className={classes.tablecon} component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className={classes.tableheadback}>
                        <TableRow>
                            <TableCell className={classes.tableheadfont} align="center">날 짜</TableCell>
                            <TableCell className={classes.tableheadfont} align="center">출근 시간</TableCell>
                            <TableCell className={classes.tableheadfont} align="center">퇴근 시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">{row.date}</TableCell>
                                <TableCell align="center">{row.gowork}</TableCell>
                                <TableCell align="center">{row.offwork}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
export default Home;