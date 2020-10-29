import React, { useState } from 'react';
// import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/Star';
import DeleteIcon from '@material-ui/icons/Delete';

import '../../../css/Favorites.css'


const useStyles = makeStyles((theme) => ({
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
}));


const Favorites = () => {
    const classes = useStyles();
    const [hidden, setHidden] = useState(false);
    const [input, setInput] = useState('');
    // const [favname, setFavname] = useState(['검색', '즐찾']);
    const [favname, setFavname] = useState([
        {id:0, content:'검색'},
        {id:1, content:'추가'}
    ]);
    var nextid = favname.length

    const setInputText = e => {
        setInput(e.target.value)
    }

    const setFavnameText = e =>{
        if(e.key === 'Enter' || e.type === 'click') {
            const addfavname = {
                id: nextid++,
                content: input
            };
            setFavname(favname.concat(addfavname))
            setInput('')
            // setFavname(favname.concat(input))
            // setInput('')
          }
    }

    const onRemove = (id) =>{
        setFavname(favname.filter(favn => favn.id !== id));
        // setFavname(
        //     ...favname.slice(0,id),
        //     ...favname.slice(id+1,favname.length)
        // )
    }


    const favlist = favname.map((favn) => 
            <ListItem key={favn.id}>
                <StarIcon className="favorite_star" />
                <ListItemText 
                    primary={favn.content}
                />
                {hidden && <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={()=>onRemove(favn.id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>}
            </ListItem>
        )

    const edit = () => {
        if (hidden) {
            setHidden(false)
        } else {
            setHidden(true)
        }
    }

    return (
        <div>
            <p className="Favorite_header">즐겨찾기</p>
            <div className="d-flex justify-content-end">
                {hidden ? <button className="btn btn-outline Favorite_edit" onClick={edit}>취소</button> : <button className="btn btn-outline Favorite_edit" onClick={edit}>편집</button>}
            </div>
            <input type="text" value={input} onChange={setInputText} onKeyPress={setFavnameText}></input><button onClick={setFavnameText}>추가</button>
            <Grid item xs={12} md={6}>
                <div className={classes.demo}>
                    <List>
                        {favlist}
                    </List>
                </div>
            </Grid>

        </div>
    );
}

export default Favorites;