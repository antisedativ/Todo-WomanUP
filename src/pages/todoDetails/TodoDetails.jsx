import React, {useContext, useEffect, useState} from 'react';
import cl from './TodoDetails.module.scss'
import {Context} from "../../index";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useParams} from "react-router-dom";
import {useCollectionData} from "react-firebase-hooks/firestore";
import {collection, Timestamp,doc, updateDoc} from "firebase/firestore";
import {CircularProgress} from "@mui/material";
import {v4} from "uuid";

const TodoDetails = () => {
    const [update, setUpdate] = useState(0)
    const [time, setTime] = useState('')
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image,setImage] = useState(null)

    const params = useParams()
    const [todo, setTodo] = useState({})
    const [url, setUrl] = useState('')
    const {storage, db} = useContext(Context)
    const [data] = useCollectionData(collection(db,'data'))

    useEffect(() => {
        if(data) {
            data.forEach(elem => {
                if(Number(params.id) === elem.id) {
                    setTodo(elem)
                    getDownloadURL(ref(storage, `img/${elem.fileName}`))
                        .then((url) => {
                            setUrl(url)
                        });
                } else {
                    return <h1>Not found :(</h1>
                }
            })
        }
    },[data, update])

    async function writeNewPost(e) {
        e.preventDefault()

        // Добавление файла
        const imageName = image.name + v4()
        const imgRef = ref(storage, `img/${imageName}`);
        await uploadBytes(imgRef, image).then(() => {
            alert("File uploaded");
        });

        // Обновление туду
        const updateTodo = {
            title,
            description,
            dateCompletion: time,
            createdAt: Timestamp.fromDate(new Date()),
            fileName: imageName
        };

        const docRef = doc(db, "data", todo.key);
        //const docSnap = await getDoc(docRef);

        await updateDoc(docRef, updateTodo);
        setUpdate(update + 1)

        // Очистка полей
        setTime('')
        setTitle("");
        setDescription("");
    }

    return (
        <>
            {
                !data ? <div className='loader'><CircularProgress color="secondary" /></div>
                    : <>
                        <div className={cl.wrapper}>
                            <div className={cl.form}>
                                <h3>Edit form</h3>
                                <form>
                                    <input
                                        type="text"
                                        placeholder="Change title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Change description"
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
                                    <button className={cl.btn} onClick={writeNewPost}>Edit todos</button>
                                </form>
                            </div>
                            <div className={cl.card}>
                                <h3>Data now</h3>
                                <div className={cl.title}>
                                    Title: <i>{todo.title}</i>
                                </div>
                                <div className={cl.desc}>
                                    Description: <i>{todo.description}</i>
                                </div>
                                <div className={cl.time}>
                                    Date of completion: <i>{todo.dateCompletion}</i>
                                </div>
                                <div>
                                    <img style={{width: 200, height: 200, margin: 10}} src={url} alt=""/>
                                </div>
                                <div className={cl.file}>
                                    If this is not a picture click  <a href={url}>here</a>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </>
    );
};

export default TodoDetails;