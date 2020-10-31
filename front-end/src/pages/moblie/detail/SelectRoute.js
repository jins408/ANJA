import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import TrainIcon from '@material-ui/icons/Train';
import ForwardIcon from '@material-ui/icons/Forward';

import '../../../css/selectroute.css'

const useStyles = makeStyles(() => ({
    good: {
        fontSize: 80,
        color: 'green'
    },
    soso: {
        fontSize: 80,
        color: '#FFD700'
    },
    bad:{
        fontSize: 80,
        color: 'crimson'
    }
}));


const SelectRoute = ({match}) => {
    const classes = useStyles();
    const [star, setStar] = useState(false);
    const [start, setStart] = useState(match.params.start)
    const [end, setEnd] = useState(match.params.end)
    const [id, setId] = useState(0)
    var [nextid, setNextid] = useState(0)

    useEffect(()=>{
        const checkid = []
        const checknextid = [0]
        for(let i=0; i<localStorage.length; i++){
            var getvalue = String(localStorage.getItem(localStorage.key(i))).split(',')
            if(getvalue[0] === start && getvalue[1] === end){
                checkid.push(localStorage.key(i))
            }
            if(Number(checknextid[0]) < localStorage.key(i)){
                checknextid.pop()
                checknextid.push(localStorage.key(i))
            }
        }
        setId(checkid[0])
        setNextid(Number(checknextid[0]))
        if(checkid.length){
            setStar(true)
        }
    },[star])


    const starHandler = () => {
        if(star){
            setStar(false)
            localStorage.removeItem(id)
        }else{
            setStar(true)
            const addfavname = {
                id: ++nextid,
                content: [start,end]
            };
            localStorage.setItem(addfavname.id, addfavname.content)
        }
    }

    return (
        <div>
            <p className="selcetroute_header">검색(상세)</p>
            <div className="selectroute_box">
                <div className="d-flex justify-content-end mr-2 mt-2">
                    {star ? <StarIcon className="selectroute_star" onClick={starHandler} /> : <StarBorderIcon className="selectroute_star" onClick={starHandler} />}
                </div>
                    <p className="selectroute_location">{start} <ForwardIcon/> {end}</p>
                    <p className="sleectroute_time">소요시간 20:00</p>
                    <div>
                        <div className="d-flex justify-content-end">
                            <Button href={`/subwaytime/${start}`} color="primary">TIME</Button>
                        </div>
                        <div className="d-flex justify-content-between mx-auto mb-3 selectroute_updown">
                            <span>반석행:10분</span>
                            <span>판암행:5분</span>
                        </div>
                    </div>
            </div>
            <div className="selectroute_box2">
                <div className="d-flex justify-content-start mb-3">
                    <span className="selectroute_num">1</span>
                    <TrainIcon className={classes.good} />
                    <span className="selectroute_chair">31254(잔여:10석)</span>
                </div>
                <div className="d-flex justify-content-start mb-3">
                    <span className="selectroute_num">2</span>
                    <TrainIcon className={classes.good} />
                    <span className="selectroute_chair">31220(잔여:6석)</span>
                </div>
                <div className="d-flex justify-content-start mb-3">
                    <span className="selectroute_num">3</span>
                    <TrainIcon className={classes.soso} />
                    <span className="selectroute_chair">31250(잔여:2석)</span>
                </div>
                <div className="d-flex justify-content-start mb-3">
                    <span className="selectroute_num">4</span>
                    <TrainIcon className={classes.soso} />
                    <span className="selectroute_chair">31213(잔여:1석)</span>
                </div>
                <div className="d-flex justify-content-start mb-3">
                    <span className="selectroute_num">5</span>
                    <TrainIcon className={classes.bad} />
                    <span className="selectroute_chair">31243(잔여:0석)</span>
                </div>
                <div className="d-flex justify-content-start mb-5">
                    <span className="selectroute_num">6</span>
                    <TrainIcon className={classes.bad} />
                    <span className="selectroute_chair">31289(잔여:0석)</span>
                </div>
            </div>
        </div>
    )
}

export default SelectRoute