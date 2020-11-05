import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    back: {
        backgroundColor : '#3f51b5',
        height: '100%',
    },
    mid : {
        paddingTop: '310px'
    },
    haed:{
        textAlign: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    sub: {
        textAlign: 'center',
        color: 'white',
        fontSize: '1.2rem'
    }
}));


const Logo = () => {
    const classes = useStyles();
    const history = useHistory();

    useEffect(()=>{
        setTimeout(()=>{
            history.push('/mobile/main')
        },1500)
    })


    return (
        <div className={classes.back}>
            <div className={classes.mid}>
                <p className={classes.haed}>안자 ANJA</p>
                <p className={classes.sub}>안전한 자리! 앉아서 가자!</p>
            </div>
        </div>
    )
}

export default Logo