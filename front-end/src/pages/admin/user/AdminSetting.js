import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    header:{
        padding:'40px 0 20px 0',
        textAlign: 'center',
        fontWeight: 'bold'
      },
    anja:{
        width: '250px',
        marginTop: '10rem',
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


const AdminSetting = () => {
    const classes = useStyles();

    return (
        <div>
            <h1 className={classes.header}>설정</h1>
            <div className="d-flex justify-content-center">
                    <img className={classes.anja} src={require('../../../images/ANJA.png')} alt="로고" />
                </div>
                <p className="text-center">Admin ver.201112</p>
                <p className={classes.madeby}>Made by</p>
                <p className={classes.name}>권민지 김석환 김진실 박세훈 조민기</p>
        </div>
    );
}
export default AdminSetting;