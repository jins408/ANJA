import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    header:{
        padding:'40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    traininfo: {
        width: '750px',
        margin: 'auto'
    },
    vdeio: {
        width: '375px',
        height: '300px',
    },
    maxvdeio: {
        position: 'absolute',
        left: '18%',
        width: '752px',
        height: '600px',
    },
    table: {
        width: '100%'
    },
    tablecon: {
        width: '750px',
        margin: 'auto'
    },
    tableheadback: {
        backgroundColor: 'gray',
    },
    tableheadfont: {
        color: 'white',
        fontSize: '1.2rem'
    },
    workbtn: {
        width: '10rem',
        fontSize: '2rem',
    }

});


const Cctv = () => {
    const classes = useStyles();
    const [cctvsize ,setCctvsize] = useState(0)

    const gocctv = (value) =>{
        setCctvsize(value)
    }

    const closecctv = () => {
        setCctvsize(0)
    }

    return (
        <div>
            <h1 className={classes.header}>CCTV</h1>
            <h3 className="pl-5 mb-5" >열차번호 - {sessionStorage.getItem('uid').slice(0,4)}호</h3>
            {cctvsize===1 && <img className={classes.maxvdeio} onClick={closecctv} src={'http://localhost:8000/stream2/'} alt="cctv1"></img> }
            {cctvsize===2 && <img className={classes.maxvdeio} onClick={closecctv} src={'http://183.107.25.170:8001/stream2/'} alt="cctv2"></img> }
            {cctvsize===3 && <img className={classes.maxvdeio} onClick={closecctv} src={'http://125.242.221.85:8000/stream2/'} alt="cctv3"></img> }
            {cctvsize===4 && <img className={classes.maxvdeio} onClick={closecctv} src={'http://118.217.60.147:8000/stream2/'} alt="cctv4"></img> }
            <div className={classes.traininfo}>
                <div className="d-flex justify-content-between">
                    <img className={classes.vdeio} onClick={()=>gocctv(1)} src={'http://localhost:8000/stream2/'} alt="cctv1"></img>
                    <img className={classes.vdeio} onClick={()=>gocctv(2)} src={'http://183.107.25.170:8001/stream2/'} alt="cctv2"></img>
                </div>
                <div className="d-flex justify-content-between">
                    <img className={classes.vdeio} onClick={()=>gocctv(3)} src={'http://125.242.221.85:8000/stream2/'} alt="cctv3"></img>
                    <img className={classes.vdeio} onClick={()=>gocctv(4)} src={'http://118.217.60.147:8000/stream2/'} alt="cctv4"></img>
                </div>
            </div>
        </div>
    );
}

export default Cctv;