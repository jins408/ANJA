import React from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import '../css/search.css'

const Search = () =>{
    return (
    <form className="search mt-3" noValidate autoComplete="off">
        <div className="d-flex justify-content-between">

        <div className="searchinput">
            <p><span className="mr-2 ml-2">출발:</span> 
            <TextField
            className="text_box"
            id="outlined-secondary"
            variant="outlined"
            color="secondary"
            /></p>
            
            <p><span className="mr-2 ml-2">도착:</span>  
            <TextField
            className="text_box"
            id="outlined-secondary"
            variant="outlined"
            color="secondary"
            /></p>
        </div>
        <div>
            <IconButton className="searchIcon" component="span">
                <SearchIcon fontSize="large" />
            </IconButton>

        </div>
        </div>
    </form>
  );
}

export default Search 