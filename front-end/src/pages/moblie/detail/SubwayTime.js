import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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
    const [radio, setRadio] = useState('daily');

    return (
        <div>
            <p className={classes.subwaytime_header}>{match.params.subway}</p>
            <div className="d-flex justify-content-end">
                <SubwayTimeRadio radio_value={(value) => setRadio(value)}/>
            </div>
            <SubwayTimeTable radio_value={radio} />
        </div>
      );
}

export default SubwayTime;