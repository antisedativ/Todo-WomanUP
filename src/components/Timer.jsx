import React, {useEffect, useState} from 'react';
import {updateDoc} from "firebase/firestore";

const Timer = ({time,docRef,complete}) => {
    async function completeTodo () {
        await updateDoc(docRef, {complete: !complete});
    }

    let min = time.split(':')[0]
    let sec = time.split(':')[1]
    const [seconds, setSeconds] = useState(Number(sec))
    const [minutes, setMinutes] = useState(Number(min))

    let timer
    useEffect(() => {
        timer = setInterval(() => {
            if (seconds === 0 && minutes === 0) {
                completeTodo()
                return () => clearInterval(timer)
            } else  {
                setSeconds(seconds - 1)

                if(seconds === 0 && minutes > 0) {
                    setMinutes(minutes - 1)
                    setSeconds(59)
                }
            }
        },1000)
        return () => clearInterval(timer)
    },[seconds, minutes])

    return (
        <div>
            <span>{minutes < 10 ? '0'+minutes : minutes}</span>
            <span>:</span>
            <span>{seconds < 10 ? '0'+seconds : seconds}</span>
        </div>
    );
};

export default Timer;