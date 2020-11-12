import React , { useEffect }from 'react';
import {  fade,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import VideocamIcon from '@material-ui/icons/Videocam';
import Moment from 'react-moment'
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';

const columns = [
    { id: 'data', label: '날짜/시간', minWidth: 170 },
    { id: 'category', label: '경보유형', minWidth: 100 },
    {
      id: 'id',
      label: '열차번호(칸)',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'cctv',
      label: '영상보기',
      minWidth: 170,
      align: 'right',
        
    },
   
  ];
  

const useStyles = makeStyles((theme) =>({
    container: {
        maxHeight: 440,
        width: '90%',
        marginLeft: 40,
        marginTop: 20
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
        marginRight: 40,
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
          marginLeft: theme.spacing(5),
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
    modal:{
      display: 'flex',
      justifyContent: 'center',
    }
 }));
    

const Log = () =>{
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loglist, setLoglist] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [videoUrl, setVideoUrl] = React.useState('');

    const onClose= () =>{
      setShowModal(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };


    useEffect(()=>{
      getLogData(sessionStorage.getItem('uid').slice(0,2))
      return () => {
        };
    },[])
    
    const getLogData = ((line=>{
      window.db.collection("logs").doc(line).collection("messages").orderBy('time','desc').onSnapshot
      (snapshot =>{
            setLoglist(snapshot.docs.map(doc=>doc.data()))
          });
      }))

      console.log(loglist)

    const openModal = ((data)=>{
      setShowModal(true)
      setVideoUrl('https://k3b101.p.ssafy.io/video/'+data.id+data.time.seconds+'.mp4')
      // alert('https://k3b101.p.ssafy.io/video/'+data.id+data.time.seconds+'.mp4');
    })

    const setCloseModal =(()=>{
      setShowModal(false)
    })
    


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
                <Card>
                    <Button
                        variant="contained"
                        // color="primary"
                        className={classes.button}
                        endIcon={<SaveAltIcon/>}
                    >
                        Excel
                    </Button>
                  
                </Card>

                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loglist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log, index) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                            {columns.map((column) => {
                                const value = log[column.id];
                                return (
                                  
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ? column.format(value) : value}
                                  {column.id === "data" && <Moment format="YYYY-MM-DD HH:mm">{log.time.seconds*1000}</Moment>}
                                  {column.id === "cctv" ? <button onClick={()=>openModal(log)} ><VideocamIcon></VideocamIcon></button> :''}      
     
                                </TableCell>  
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className="mr-4"
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={loglist.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                <Modal
                  className={classes.modal} variant="outlined"
                  open={showModal}
                  onClose={setCloseModal}
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                >
                  <div className="my-auto">
                    <video
                        controls
                        autoPlay
                    ><source src={videoUrl} type="video/mp4" /></video>
                  </div>
                </Modal>    
    
            </div>
        );
    }

export default Log;