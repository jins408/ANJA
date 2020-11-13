import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import '../css/search.css'
import swal from 'sweetalert';
import axios from 'axios';

const Search = () =>{
    let history = useHistory();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [preview1, setPreview1] = useState([]);
    const [preview2, setPreview2] = useState([]);
    

    const changestart = (e) =>{
        setStart(e.target.value)
        axios.get(`http://127.0.0.1:8080/api/subways/station?station=${e.target.value}`)
        .then((res)=>{
            if(res.data.data === 'NO DATA'){
                return;
            }
            if(e.target.value===''){
                setPreview1([]);
            }else{
                console.log(res.data.data)
                setPreview1(res.data.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    const changeend = (e) => {
        if(preview1 !== []){
            setPreview1([])
        }
        setEnd(e.target.value)
        axios.get(`http://127.0.0.1:8080/api/subways/station?station=${e.target.value}`)
        .then((res)=>{
            if(res.data.data === 'NO DATA'){
                return;
            }
            if(e.target.value===''){
                setPreview2([]);
            }else{
                // console.log(res.data.data)
                setPreview2(res.data.data)
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const godetail = (e) =>{
        if (e.key === 'Enter' || e.type === 'click') {
            if(!start){
                swal("출발역을 입력해주세요!", {
                    icon: "warning",
                    buttons: false,
                    timer: 1000,
                  });
            }else if(!end){
                swal("도착역을 입력해주세요!", {
                    icon: "warning",
                    buttons: false,
                    timer: 1000,
                  });
            }else{
                history.push(`/selectroute/${start}/${end}`)
        }
        }
    }

    const selectpre1 = (e) => {
        setStart(e)
        setPreview1([])
    }

    const selectpre2 = (e) => {
        setEnd(e)
        setPreview2([])
    }

    return (
    <form className="search pt-3" noValidate autoComplete="off">
        <div className="d-flex justify-content-between">

        <div className="searchinput">
            <div><span className="mr-2 ml-2">출발:</span> 
            <TextField
                className="text_box mb-3"
                id="outlined-secondary"
                variant="outlined"
                color="secondary"
                value={start}
                onChange={changestart}
            >
                </TextField>
            {preview1.length !== 0 && preview1 !== 'NO DATA' &&
            <div className="preview1">
                <List dense>
                {preview1.map((pre, index)=>
                    <ListItem key={index} >
                    <ListItemText
                        primary={pre}
                        onClick={()=>selectpre1(pre)}
                    />
                    </ListItem>
                )}
                </List>
            </div>}
                
                </div>
            
            
            <div><span className="mr-2 ml-2">도착:</span>  
            <TextField
                className="text_box"
                id="outlined-secondary"
                variant="outlined"
                color="secondary"
                value={end}
                onChange={changeend}
                onKeyPress={godetail}
            />
            {preview2.length !== 0 && preview2 !== 'NO DATA' &&
            <div className="preview2">
                <List dense>
                {preview2.map((pre, index)=>
                    <ListItem key={index} >
                    <ListItemText
                        primary={pre}
                        onClick={()=>selectpre2(pre)}
                    />
                    </ListItem>
                )}
                </List>
            </div>}
            </div>
        </div>
        <div>
            <IconButton className="searchIcon" component="span" onClick={godetail}>
                <SearchIcon fontSize="large" />
            </IconButton>

        </div>
        </div>
    </form>
  );
}

export default Search 