import React, {useContext, useEffect, useState} from 'react';
import cl from './Todo.module.scss'
import {getDownloadURL, ref} from "firebase/storage";
import {Context} from "../../index";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';
import {Link} from "react-router-dom";
import {doc, deleteDoc, updateDoc} from "firebase/firestore";
import Timer from "../Timer";

const formattedTime = (unix_timestamp) => {
    let date = new Date(unix_timestamp * 1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();

    return hours + ':' + minutes.substr(-2);
}

const Todo = ({todo, index}) => {
    const [url, setUrl] = useState('')
    const {storage, db} = useContext(Context)

    const docRef = doc(db, "data", todo.key);

    useEffect(() => {
        getDownloadURL(ref(storage, `img/${todo.fileName}`))
            .then((url) => {
                setUrl(url)
            });
    }, [todo.complete])

    async function completeTodo () {
        await updateDoc(docRef, {complete: !todo.complete});
    }

    async function deleteTodo () {
        const newTodo = {
            title: '',
            description: '',
            dateCompletion: '',
            complete: false,
            createdAt: 0,
            fileName: ''
        };

        await deleteDoc(docRef);
        await updateDoc(docRef, newTodo);
    }

    return (
        <div className={cl.wrapper}>
                {
                    todo.complete ? <DoneAllOutlinedIcon sx={{ fontSize: 70 }} style={{cursor:"pointer"}} onClick={completeTodo}/>
                        : <>
                            <div className={cl.body}>
                                <div className={cl.title}>
                                    <div>
                                        <span className={cl.id}>{index}.</span>
                                        {todo.title}
                                    </div>
                                    <div className={cl.created_data}>Update time:
                                        <span style={{color: "blueviolet", marginLeft: 5}}>
                                            {formattedTime(todo.createdAt.seconds)}
                                        </span>
                                    </div>
                                </div>
                                <div className={cl.desc}>
                                    {todo.description}
                                </div>
                                <div className={cl.icons}>
                                    <DeleteForeverIcon sx={{ fontSize: 30 }} onClick={deleteTodo}/>
                                    <Link to={`/todo/${todo.id}/`}><EditIcon sx={{ fontSize: 30 }} /></Link>
                                    <DoneOutlinedIcon onClick={completeTodo}/>
                                    <div className={cl.time_to_end}>
                                        Time to end:
                                        <span style={{color: "blueviolet", marginLeft: 10}}>
                                            <Timer time={todo.dateCompletion} docRef={docRef} complete={todo.complete}/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={cl.img}>
                                {url && <img src={url} alt="Another file"/>}
                            </div>
                        </>
                }
        </div>
    );
};

export default Todo;