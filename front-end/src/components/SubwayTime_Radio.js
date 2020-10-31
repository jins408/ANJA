import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import '../css/SubwayTime.css'

const useStyles = makeStyles({
    subwaytime_radio: {
        marginRight: '15px'
    },
    label: {
        margin: '0 !important',
    }
});

const SubwayTime_Radio = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState('daily');

    console.log(value)

    const submitvalue =  (e) => {
        e.preventDefault();
        props.radio_value(e.target.value)
    }


    return (
        <FormControl component="fieldset" className={classes.subwaytime_radio}>
            <RadioGroup value={value} onChange={(e=>setValue(e.target.value))}  row aria-label="position" name="position" defaultValue="top">
                <FormControlLabel
                    onClick={submitvalue}
                    value="daily"
                    control={<Radio color="primary" />}
                    label="평일"
                    className={classes.label}
                />
                <FormControlLabel
                    onClick={submitvalue}
                    value="weekend"
                    control={<Radio color="primary" />}
                    label="주말"
                    className={classes.label}
                />
                <FormControlLabel 
                    onClick={submitvalue}
                    value="holiday" 
                    control={<Radio color="primary" />} 
                    label="공휴일" 
                    className={classes.label}
                />
            </RadioGroup>
        </FormControl>
    );
}

export default SubwayTime_Radio;