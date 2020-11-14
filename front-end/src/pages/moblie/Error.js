import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
    root:{
        height: '800px'
    },
    errorfont:{
        fontSize:'1.3rem',
        textAlign:'center',
        textShadow: '2px 2px 2px gray',
        marginTop: 220
    },
    errorfont2:{
        fontSize:'1.3rem',
        textAlign:'center',
        textShadow: '2px 2px 2px gray'
    },
}));

const Error = () => {
    const classes = useStyles();
    const history = useHistory();
    
    useEffect(()=>{
        setTimeout(()=>{
            history.push('/mobile/main')
        },2000)
    },[])


    return (
        <div classes={classes.root}>
                <p className={classes.errorfont}>죄송합니다!</p>
                <p className={classes.errorfont2}>해당 데이터 수집 중 입니다!</p>
        </div>
    )
}

export default Error