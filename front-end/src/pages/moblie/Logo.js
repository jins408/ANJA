import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import subway1 from '../../images/subway2.png';
import Fade from 'react-reveal/Fade';


const useStyles = makeStyles(() => ({
    mid : {
        paddingTop: '300px'
    },
    haed:{
        textAlign: 'center',
        color: 'white',
        fontSize: '2rem',
        fontWeight: 'bold',
    },
    sub: {
        textAlign: 'center',
        color: 'white',
        fontSize: '1.2rem'
    },
    subwayimg: {
        backgroundImage: `url(${subway1})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '375px',
        height: '812px',
    }
}));


const Logo = () => {
    const classes = useStyles();
    const history = useHistory();
    const [show, setShow] = useState(false);
    

    useEffect(()=>{
        setTimeout(()=>{
            setShow(!show)
        },800)
        setTimeout(()=>{
            history.push('/mobile/main')
        },2000)
    })


    return (
        <div>
            <Fade when={show}>
                <div className={classes.subwayimg} >
                    <div className={classes.mid}>
                        <p className={classes.haed}>안자 ANJA</p>
                        <p className={classes.sub}>안전한 자리! 앉아서 가자!</p>
                    </div>
                </div>
            </Fade>
        </div>
    )
}

export default Logo