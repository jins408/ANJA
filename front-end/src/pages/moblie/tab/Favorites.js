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
    },
    nonefavor:{
        fontSize: '2rem',
        paddingTop: '15rem',
        textAlign: 'center'
    }
}));


const Favorites = ( props ) => {
    let history = useHistory();
    const classes = useStyles();
    const [favname, setFavname] = useState([]);
    const hidden = props.favorite_edit;

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


    const onRemove = (id) => {
        setFavname(favname.filter(favn => favn.id !== id));
        localStorage.removeItem(id)
        alert('삭제되었습니다')
    }

    const godetail = (content) => {
        const start = content.split(',')[0]
        const end = content.split(',')[1]
        history.push(`/selectroute/${start}/${end}`)
    }

    const favlist = favname.map((favn) =>
        <ListItem key={favn.id} onClick={() => godetail(favn.content)}>
            <StarIcon className="favorite_star ml-2" />
            <ListItemText
                primary={favn.content.split(',')[0] + '->' + favn.content.split(',')[1]}
                className="listname mb-1 ml-3"
            />
            {hidden && <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => onRemove(favn.id)}>
                    <DeleteIcon className={classes.trash} />
                </IconButton>
            </ListItemSecondaryAction>}
        </ListItem>
    )

    // const edit = () => {
    //     if (hidden) {
    //         setHidden(false)
    //     } else {
    //         setHidden(true)
    //     }
    // }

    return (
        <div>
            <div className="d-flex justify-content-end mt-3">
                {/* {nextid !== 0 && <div>{hidden ? <button className="btn btn-outline Favorite_edit" onClick={edit}>완료</button> : <button className="btn btn-outline Favorite_edit" onClick={edit}>편집</button>}</div>} */}
            </div>
            <Grid item xs={12}>
                <div className={classes.demo}>
                {nextid !== 0 ?<List>
                         {favlist} 
                    </List> : 
                    <div className={classes.nonefavor}>즐겨찾기를 추가해주세요!</div>
                    }
                </div>
            </Grid>

        </div>
    );
}

export default Favorites;