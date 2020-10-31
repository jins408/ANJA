import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SubwayTime_Radio from '../../../components/SubwayTime_Radio'
import SubwayTime_Table from '../../../components/SubwayTime_Table'

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
                <SubwayTime_Radio radio_value={(value) => setRadio(value)}/>
            </div>
            <SubwayTime_Table radio_value={radio} />
        </div>
      );
}

export default SubwayTime;