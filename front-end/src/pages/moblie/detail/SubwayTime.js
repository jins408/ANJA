import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import SubwayTimeRadio from '../../../components/SubwayTimeRadio'
import SubwayTimeTable from '../../../components/SubwayTimeTable'

const useStyles = makeStyles({
    subwaytime_header: {
        textAlign: 'center',
        fontSize: '3rem'
    },
});


const SubwayTime = ({match}) =>{
    const classes = useStyles();
    const [radio, setRadio] = useState('1');
    const [upwardlist, setUpwardlist] = useState([]);
    const [downwardlist, setDownwardlist] = useState([]);

    useEffect(()=>{
        axios
            .get(`http://127.0.0.1:8080/api/subways/timetable?station=${match.params.subway}&line=1&day=${radio}`)
            .then((res)=>{
                console.log(res.data)
                setUpwardlist(res.data.data['상행'])
                setDownwardlist(res.data.data['하행'])
            })
            .catch((err)=>{
                console.log(err)
            })
    },[radio])


    return (
        <div>
            <p className={classes.subwaytime_header}>{match.params.subway}</p>
            <div className="d-flex justify-content-end">
                <SubwayTimeRadio radio_value={(value) => setRadio(value)}/>
            </div>
            <SubwayTimeTable radio_value={radio} upward={upwardlist} downward={downwardlist} />
        </div>
      );
}

export default React.memo(SubwayTime);