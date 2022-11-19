import React, {useContext} from 'react';
import '../../index.scss'
import Todo from "../../components/todo/Todo";
import {Context} from "../../index";
import { collection} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {CircularProgress} from "@mui/material";

const AllTodo = () => {
    const {db} = useContext(Context)
    const [data] = useCollectionData(collection(db,'data'))

    return (
        <div>
            {!data ? <div className='loader'><CircularProgress color="secondary" /></div>
                :data.map((todo, index) => (
                <Todo index={index + 1} key={todo.key} todo={todo} />
            ))}
        </div>
    );
};

export default AllTodo;