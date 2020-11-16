import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    header:{
        padding:'40px 0 10px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
      subheader:{
        paddingLeft: '60px',
        marginBottom: '8px'
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
        left: '20.8%',
        width: '750px',
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
    },
    caption:{
        position: 'absolute',
        padding: '5px',
        fontSize:'1.5rem',
        fontWeight:'bold',
        color: 'green',
        right: '72%'
    },
    caption1:{
        position: 'absolute',
        padding: '5px',
        fontSize:'1.3rem',
        fontWeight:'bold',
        color: 'green'
    },
    caption2:{
        position: 'absolute',
        padding: '5px',
        fontSize:'1.3rem',
        fontWeight:'bold',
        color: 'green',
        right:'35.5%'
    },

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
            <h3 className={classes.subheader} >열차번호 - {sessionStorage.getItem('uid').slice(0,4)}호</h3>
            {cctvsize===1 && <div><img className={classes.maxvdeio} onClick={closecctv} src={'https://61.85.86.92:8000/stream2/'} alt="cctv1"></img><span className={classes.caption}>CCTV1</span></div> }
            {cctvsize===2 && <div><img className={classes.maxvdeio} onClick={closecctv} src={'https://183.107.25.170:8001/stream2/'} alt="cctv2"></img><span className={classes.caption}>CCTV2</span></div> }
            {cctvsize===3 && <div><img className={classes.maxvdeio} onClick={closecctv} src={'https://125.242.221.85:8000/stream2/'} alt="cctv3"></img><span className={classes.caption}>CCTV3</span></div> }
            {cctvsize===4 && <div><img className={classes.maxvdeio} onClick={closecctv} src={'https://118.217.60.147:8000/stream2/'} alt="cctv4"></img><span className={classes.caption}>CCTV4</span></div> }
            {cctvsize === 0 && 
            <div className={classes.traininfo}>
                <div className="d-flex justify-content-between">
                    <img className={classes.vdeio} onClick={()=>gocctv(1)} src={'https://61.85.86.92:8000/stream2/'} alt="cctv1"></img>
                    <span className={classes.caption1}>CCTV1</span>
                    <img className={classes.vdeio} onClick={()=>gocctv(2)} src={'https://183.107.25.170:8001/stream2/'} alt="cctv2"></img>
                    <span className={classes.caption2}>CCTV2</span>
                </div>
                <div className="d-flex justify-content-between">
                    <img className={classes.vdeio} onClick={()=>gocctv(3)} src={'https://125.242.221.85:8000/stream2/'} alt="cctv3"></img>
                    <span className={classes.caption1}>CCTV3</span>
                    <img className={classes.vdeio} onClick={()=>gocctv(4)} src={'https://118.217.60.147:8000/stream2/'} alt="cctv4"></img>
                    <span className={classes.caption2}>CCTV4</span>
                </div>
            </div>}
        </div>
    );
}

export default Cctv;