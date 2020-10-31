import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
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
    trash:{
        color: 'crimson'
    }
}));


const Favorites = () => {
    let history = useHistory();
    const classes = useStyles();
    const [hidden, setHidden] = useState(false);
    const [input, setInput] = useState('');
    const [favname, setFavname] = useState([]);

    useEffect(() => {
        const store = []
        for (let i = 0; i < localStorage.length; i++) {
            store.push({ id: localStorage.key(i), content: localStorage.getItem(localStorage.key(i)) })
        }
        setFavname(store)
    }, [])


    var nextid = 0
    for (let i = 0; i <= favname.length; i++) {
        if (Number(nextid) < localStorage.key(i)) {
            nextid = localStorage.key(i)
        }
    }

    const setInputText = e => {
        setInput(e.target.value)
    }

    const setFavnameText = e => {
        if (e.key === 'Enter' || e.type === 'click') {
            const addfavname = {
                id: ++nextid,
                content: input
            };
            localStorage.setItem(addfavname.id, addfavname.content)
            setFavname(favname.concat(addfavname))
            setInput('')
        }
    }


    const onRemove = (id) => {
        setFavname(favname.filter(favn => favn.id !== id));
        localStorage.removeItem(id)
    }

    const godetail = (content) => {
        const start = content.split(',')[0]
        const end = content.split(',')[1]
        history.push(`/selectroute/${start}/${end}`)
    }

    const favlist = favname.map((favn) =>
        <ListItem key={favn.id} onClick={() => godetail(favn.content)}>
            <StarIcon className="favorite_star" />
            <ListItemText
                primary={favn.content.split(',')[0] + '->' + favn.content.split(',')[1]}
                className="listname"
            />
            {hidden && <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(favn.id)}>
                    <DeleteIcon className={classes.trash} />
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
                {hidden ? <button className="btn btn-outline Favorite_edit" onClick={edit}>완료</button> : <button className="btn btn-outline Favorite_edit" onClick={edit}>편집</button>}
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