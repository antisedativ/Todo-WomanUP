import React, {useContext} from 'react';
import '../../index.scss'
import Todo from "../../components/todo/Todo";
import {Context} from "../../index";
import { collection} from "firebase/firestore";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {CircularProgress} from "@mui/material";

/**
 * Реакт компонент
 * Реализует страницу всех постов
 * @returns {JSX.Element}
 * @constructor
 */
const AllTodo = () => {
    // Получение данных из контекста
    const {db} = useContext(Context)

    // Получение данных с сервера
    const [data] = useCollectionData(collection(db,'data'))

    return (
        <>
            {
                data ? <div>
                    {data.length === 0 ? <div style={{marginTop: 40}}><h2>Список задач пуст... Добавьте новые задачи!</h2></div>
                        :data.map((todo, index) => (
                            <Todo index={index + 1} key={todo.key} todo={todo} />
                        ))}
                </div>
                    : <div className='loader'><CircularProgress color="secondary" /></div>
            }
        </>
    );
};

export default AllTodo;
