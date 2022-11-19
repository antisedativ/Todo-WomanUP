import React, {useContext, useState} from 'react';
import cl from "./CreateTodo.module.scss";
import {Context} from "../../index";
import { collection, Timestamp,doc, setDoc } from "firebase/firestore";
import { ref as storageRef , uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function CreateTodo () {
    const [time, setTime] = useState('')
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image,setImage] = useState(null)
    const {db, storage} = useContext(Context)

    const addNewTodo = async (e) => {
        e.preventDefault()
        if(title && description && image) {

            // Добавление файла
            const imageName = image.name + v4()
            const imgRef = storageRef(storage, `img/${imageName}`);
            await uploadBytes(imgRef, image).then(() => {
                alert("File uploaded");
            });

            const key = v4()
            const date = Timestamp.fromDate(new Date())
            // Создание туду
            const newTodo = {
                id: date.seconds,
                key,
                title,
                dateCompletion: time,
                description,
                createdAt: date,
                complete: false,
                fileName: imageName
            };

            // Добавление названия и описания
            //await addDoc(collection(db, "data"), newTodo);

            await setDoc(doc(collection(db, "data"),key),newTodo)

            // Очистка полей
            setTime('')
            setTitle("");
            setDescription("");
        } else
            alert('Заполните поля!')

    };

    return (
        <div className={cl.body}>
            <div className={cl.wrapper}>
                <div> Create your todos</div>
                <form>
                    <input
                        type="text"
                        placeholder="Todo title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Todo description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <input
                        type="time"
                        onChange={(e) => setTime(e.target.value)}
                    />
                    <input
                        type="file"
                        onChange={e => setImage(e.target.files[0])}
                    />
                    <button className={cl.btn} onClick={addNewTodo}>Create todos</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTodo;