import React from 'react';
import {  fade,makeStyles, ThemeProvider  } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
// import { green } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) =>({
    table: {
      minWidth: 650,
      width: 200,
      marginTop:60, 
    },
    root: {
        '& > *': {
          marginTop: theme.spacing(6),
        },
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        margin: theme.spacing(1),
        marginRight: 80,
        backgroundColor: '#4caf50 !important',
        color:"white"
      
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(11),
          width: 'auto',
        },
        paddingTop: 70,
 
     },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '40%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '23ch',
        },
        border: '1px solid',
        borderRadius: '13px',
        height:28
    },
    margin: {
        margin: theme.spacing(1),
      },
 }));

//  const theme = createMuiTheme({
//     palette: {
//         success : green,
//     },
//   });
    
  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Log = () =>{
    const classes = useStyles();

    return(
            <div>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    <ThemeProvider>
                    <Button
                        variant="contained"
                        // color="primary"
                        className={classes.button}
                        endIcon={<SaveAltIcon/>}
                    >
                        Excel
                    </Button>
                    </ThemeProvider>
                </div>

                <TableContainer className="d-flex justify-content-center">
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>날짜/시간</TableCell>
                        <TableCell align="right">경보유형</TableCell>
                        <TableCell align="right">열차번호(칸)</TableCell>
                        <TableCell align="right">영상보기</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <div className={classes.root}>
                    <Pagination count={10} variant="outlined" />
                </div>
            </div>
        );
    }

export default Log;