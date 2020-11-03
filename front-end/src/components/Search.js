import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import '../css/search.css'

const Search = () =>{
    let history = useHistory();
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');

    const changestart = (e) =>{
        setStart(e.target.value)
    }
    const changeend = (e) => {
        setEnd(e.target.value)
    }
    const godetail = () =>{
        if(!start){
            alert("출발역을 입력해주세요")
        }else if(!end){
            alert("도착역을 입력해주세요")
        }else{
            history.push(`/selectroute/${start}/${end}`)
        }
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
            /></div>
            
            <div><span className="mr-2 ml-2">도착:</span>  
            <TextField
                className="text_box"
                id="outlined-secondary"
                variant="outlined"
                color="secondary"
                value={end}
                onChange={changeend}
            /></div>
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