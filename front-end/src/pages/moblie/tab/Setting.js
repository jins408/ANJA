import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    anja:{
        width: '250px',
        marginTop: '5rem',
        borderRadius: '50%'
    },
    madeby:{
        textAlign:'center',
        marginTop: '3rem',
        fontSize: '1.2rem'
    },
    name:{
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.5rem'
    }
});


const Setting = () =>{
    const classes = useStyles();


    return(
            <div>
                <div className="d-flex justify-content-center">
                    <img className={classes.anja} src={require('../../../images/ANJA.png')} alt="로고" />
                </div>
                <p className="text-center">Mobile ver.201112</p>
                <p className={classes.madeby}>Made by</p>
                <p className={classes.name}>Team 앉게해조</p>
      
            </div>
        );
    }

export default Setting;