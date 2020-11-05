import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import TrainIcon from '@material-ui/icons/Train';
import ForwardIcon from '@material-ui/icons/Forward';

import axios from 'axios'

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
    bad: {
        fontSize: 80,
        color: 'crimson'
    }
}));


const SelectRoute = ({ match }) => {
    const classes = useStyles();
    const [star, setStar] = useState(false);
    const [id, setId] = useState(0)
    const [traininfo, setTraininfo] = useState();
    const [sinfo, setSinfo] = useState();
    const [mintime, setMintime] = useState(false);
    const [showtrain, setShowtrain] = useState(false);
    var [nextid, setNextid] = useState(0)

    const start = match.params.start
    const end = match.params.end

    useEffect(() => {
        axios.get(`https://k3b101.p.ssafy.io/api/subways/estimate?from=${start}&to=${end}`)
            .then((res) => {
                // console.log(res.data.data)
                setTraininfo(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        axios.get(`https://k3b101.p.ssafy.io/api/subways/approach?station=${start}`)
            .then((res) => {
                // console.log(res.data.data)
                setSinfo(res.data.data)
            }).catch((err) => {
                console.log(err)
            })
        axios.get(`https://k3b101.p.ssafy.io/api/app/passenger`)
            .then((res)=>{
                console.log(res.data)
            })
            .catch((err)=>{
                console.log(err)
            })
    }, [start, end])


    useEffect(() => {
        const checkid = []
        const checknextid = [0]
        for (let i = 0; i < localStorage.length; i++) {
            var getvalue = String(localStorage.getItem(localStorage.key(i))).split(',')
            if (getvalue[0] === start && getvalue[1] === end) {
                checkid.push(localStorage.key(i))
            }
            if (Number(checknextid[0]) < localStorage.key(i)) {
                checknextid.pop()
                checknextid.push(localStorage.key(i))
            }
        }
        setId(checkid[0])
        setNextid(Number(checknextid[0]))
        if (checkid.length) {
            setStar(true)
        }
    }, [star, start, end])


    const starHandler = () => {
        if (star) {
            setStar(false)
            localStorage.removeItem(id)
        } else {
            setStar(true)
            const addfavname = {
                id: ++nextid,
                content: [start, end]
            };
            localStorage.setItem(addfavname.id, addfavname.content)
        }
    }

    const mintimeHandler = () => {
        if (!mintime) {
            setMintime(true)
        } else {
            setMintime(false)
        }
    }

    console.log(sinfo)

    return (
        <div>
            <div className="selectroute_box">
                <div className="d-flex justify-content-end mr-2 mt-2">
                    {/* <Button href={`/subwaytime/${start}`} color="primary">TIME</Button> */}
                    {star ? <StarIcon className="selectroute_star" onClick={starHandler} /> : <StarBorderIcon className="selectroute_star" onClick={starHandler} />}
                </div>
                <p className="selectroute_location mb-0">{start} <ForwardIcon /> {end}</p>
                <div className="d-flex justify-content-between">
                    {mintime ? <Button className="ml-2" onClick={mintimeHandler} color="secondary">최단시간</Button> : <Button className="ml-2" onClick={mintimeHandler} color="secondary">최소환승</Button>}
                    <Button href={`/subwaytime/${start}`} color="primary">TIME</Button>
                </div>
                {/* 최단시간 */}
                {mintime && traininfo && <p className="sleectroute_time mb-4">{traininfo.shtTravelMsg}</p>}
                {/* 최소환승 */}
                {!mintime && traininfo && <p className="sleectroute_time mb-4">{traininfo.minTravelMsg}</p>}
                <div className="mx-auto mb-3 selectroute_updown">
                    {sinfo && <p className="text-center mb-1 selectroute_gotarin"><TrainIcon /> {sinfo[0].trainLineNm} : {parseInt(sinfo[0].barvlDt / 60)}분{sinfo[0].barvlDt % 60}초</p>}
                    {sinfo && <p className="text-center selectroute_gotarin"><TrainIcon /> {sinfo[1].trainLineNm} : {parseInt(sinfo[1].barvlDt / 60)}분{sinfo[1].barvlDt % 60}초</p>}
                </div>
            </div>
            <div className="selectroute_box2">
                <div className="d-flex justify-content-end">
                    {showtrain ? 
                        <Button className="p-0" onClick={() => setShowtrain(false)}>추천</Button> : 
                        <Button className="p-0" color="secondary" onClick={() => setShowtrain(false)}>추천</Button>
                    }
                    {showtrain ? 
                    <Button className="p-0" color="secondary" onClick={() => setShowtrain(true)}>순서</Button> : 
                    <Button className="p-0" onClick={() => setShowtrain(true)}>순서</Button>
                    }
                </div>
                {showtrain ?
                    <div>
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
                    </div> : <div> 여긴 추천 </div>}
            </div>
        </div>
    )
}

export default SelectRoute