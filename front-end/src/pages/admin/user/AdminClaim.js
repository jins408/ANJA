import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import '../../../css/adminclaim.css'

import axios from 'axios'
import { Grid } from '@material-ui/core';

const baseURL = 'https://k3b101.p.ssafy.io'

const useStyles = makeStyles({
    root: {
    //   minWidth: 200,
      width: 250,
      height: '17rem'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginTop: 12,
      fontSize: 18
    },
    content:{
        fontSize: 16,
        height: 95
        
    },
    categoty:{
        fontSize: 16,
        fontWeight: "bold"
    },

});

const AdminClaim = () =>{
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const [claimlist, setClaimlist] = useState([])

    
    useEffect(() => {
        axios.get(`${baseURL}/api/reports`)
        .then((res)=>{
            console.log(res.data.data)
            setClaimlist(res.data.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    const listClaim = claimlist.map((claim, index) => 
    <Grid claim xs={4} key={index} className="mb-3">
        <Card  className={classes.root} variant="outlined">
            <CardContent>
                {/* <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Word of the Day
                </Typography> */}
                <Typography variant="h5" component="h2">
                    {bull}{claim.sid}
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    <span className={classes.categoty}>신고유형:</span> {claim.category}
                </Typography>
                <br />
                <Typography className={classes.content}>
                {claim.contents}
                </Typography>
            </CardContent>
            <div className="d-flex justify-content-end">
            <CardActions >
                <Button  variant="outlined" color="secondary" size="small" >신고삭제</Button>
            </CardActions>
            </div>
        </Card>

    </Grid>
              
    );

    return(
        <div>
            <div className="card-form"></div>
                <Grid container>
                    {/* <Grid claim xs={4}> */}
                     {listClaim}
                    {/* </Grid> */}
                </Grid>
                
        </div>
        );
    }

export default AdminClaim;