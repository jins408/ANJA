import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom' 
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Moment from 'react-moment'


const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        label: 'CCTV1',
        imgPath:
            'http://localhost:8000/stream2/',
    },
    {
        label: 'CCTV2',
        imgPath:
            'http://183.107.25.170:8001/stream2/',
    },
    {
        label: 'CCTV3',
        imgPath:
            'http://125.242.221.85:8000/stream2/',
    },
    {
        label: 'CCTV4',
        imgPath:
            'http://118.217.60.147:8000/stream2/',
    },
];

const columns = [
    { id: 'data', label: '날짜/시간', minWidth: 100, align: 'center' },
    { id: 'category', label: '경보유형', minWidth: 100, align: 'center' },
    {
      id: 'id',
      label: '열차번호(칸)',
      minWidth: 100,
      align: 'center',
    },   
  ];

const claims = [
    { id: 'data', label: '날짜/시간', minWidth: 100, align: 'center' },
    { id: 'category', label: '신고유형', minWidth: 100, align: 'center' },
    {
      id: 'id',
      label: '열차번호(칸)',
      minWidth: 100,
      align: 'center',
    },   
  ];


const useStyles = makeStyles((theme) => ({
    headertop: {
        padding: '40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    container: {
        maxHeight: 440,
        width: '90%',
        // marginLeft: 40,
        // marginTop: 20
    },
    root: {
        width: 700,
        flexGrow: 1,
        margin: 'auto'
    },
    table:{
        width: 400,
        margin: 'auto'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        paddingLeft: theme.spacing(4),
        backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 400,
        display: 'block',
        width: 600,
        overflow: 'hidden',
        // width: '100%',
    },
    imglabel:{
        position: 'absolute',
        paddingLeft: '1rem',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        zIndex: '3'
    },
    logname:{
        width:370,
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '40px'
    },
    loglog:{
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    logmore:{
        color: '#f50057'
    },
    claimname:{
        width:370,
        display: 'flex',
        justifyContent: 'space-between',
        marginRight: '40px'
    },
    claimclaim:{
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    claimmore:{
        color: '#f50057'
    }
}));


const Home = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const [loglist, setLoglist] = useState([]);
    const [claimlist, setClaimlist] = useState([])
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };


    useEffect(()=>{
        getLogData(sessionStorage.getItem('uid').slice(0,2))
        claimRegist(sessionStorage.getItem('uid').slice(0,2))
        return () => {
          };
      },[])
      
    const getLogData = ((line=>{
    window.db.collection("logs").doc(line).collection("messages").orderBy('time','desc').onSnapshot
    (snapshot =>{
        const arr = []
        for(let i=0; i < 5; i++){
            arr.push(snapshot.docs.map(doc=>doc.data())[i])
        }
        setLoglist(arr)
        });
    }))

    
    const claimRegist = ((line =>{
        window.db.collection("reports").doc(line).collection("messages").orderBy('time','desc').onSnapshot(
            querySnapshot => {
                var list = []
                querySnapshot.forEach(doc => {
                    var obj = {};
                    obj = doc.data();
                    obj["key"] = doc.id;
                    list.push(obj)
                });
                const arr =[]
                for(let i=0; i < 5; i++){
                    arr.push(list[i])
                }
                setClaimlist(arr)
        });
    }))



    return (
        <div>
            <h1 className={classes.headertop}>HOME</h1>

            {/* CCTV */}
            <div className={classes.root}>
                {/* <Paper square elevation={0} className={classes.header}> */}
                    <Typography className={classes.imglabel}>{tutorialSteps[activeStep].label}</Typography>
                {/* </Paper> */}
                <AutoPlaySwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={activeStep}
                    onChangeIndex={handleStepChange}
                    enableMouseEvents
                >
                    {tutorialSteps.map((step, index) => (
                        <div key={step.label}>
                            {Math.abs(activeStep - index) <= 2 ? (
                                <img className={classes.img} src={step.imgPath} alt={step.label} />
                            ) : null}
                        </div>
                    ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
                    }
                />
            </div>


            <div className="d-flex justify-content-between pt-5">
                <div className={classes.logname}>
                    <span className={classes.loglog}>기록</span>
                    <Link to="/admin/log"><span className={classes.logmore}>더보기</span></Link>
                </div>
                <div className={classes.claimname}>
                    <span className={classes.claimclaim}>신고</span>
                    <Link to="/admin/adminclaim"><span className={classes.claimmore}>더보기</span></Link>
                </div>
            </div>
            <div className="d-flex justify-content-between pb-5">
                {/* 기록 */}
                <TableContainer className={classes.container}>
                        <Table className={classes.table} stickyHeader aria-label="sticky table">
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
                            {loglist.map((log, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => {
                                    const value = log[column.id];
                                    return (
                                    
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                    {column.id === "data" && <Moment format="YYYY-MM-DD HH:mm">{log.time.seconds*1000}</Moment>}     
                                    </TableCell>  
                                    );
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>

                    {/* 신고 */}
                    <TableContainer className={classes.container}>
                        <Table className={classes.table} stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                            {claims.map((column) => (
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
                            {claimlist.map((claim, index) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                                {columns.map((column) => {
                                    const value = claim[column.id];
                                    return (
                                    
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                    {column.id === "data" && <Moment format="YYYY-MM-DD HH:mm">{claim.time.seconds*1000}</Moment>}     
                                    </TableCell>  
                                    );
                                })}
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
            </div>
        </div>
    );
}
export default Home;