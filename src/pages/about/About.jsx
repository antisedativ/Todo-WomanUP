import React from 'react';

const About = () => {
    return (
        <div>
            <h2 style={{textAlign: 'center',marginTop: 20}}>Тестовое задание WomanUP </h2>
            <div style={{marginTop: 15, fontSize: 17, marginBottom: 10}}>
                <p>
                    <b>Задание</b><br/>
                </p>
                <hr/><br/>
                <p>
                    <b>Что нужно сделать:</b><br/>
                    — написать todo-лист<br/>
                    <br/>
                    <b>Функционал:</b><br/>
                    — создание, просмотр, редактирование (изменение полей или то, что задача выполнена) и удаление задачи<br/>
                    — возможность прикрепления файлов к записи<br/>
                    — поля в задаче: заголовок, описание, дата завершения, прикрепленные файлы<br/>
                    — если дата завершения истекла или задача выполнена, это должно быть визуально отмечено<br/>
                    <br/>
                    — откомментировать код в JSDoc и выложить на gitlab.<br/>
                </p>
                <hr/><br/>
                <p>
                    <b>Нужно обязательно:</b><br/>
                    — написать код самому, а не скопировать с stackoverflow;<br/>
                    — использовать React;<br/>
                    — использовать компоненты как функции, а не как классы;<br/>
                    — использовать хуки;<br/>
                    — использовать github для “выкладки”.<br/>
                </p>
                <hr/><br/>
                <p>
                    <b>Желательно:</b><br/>
                    — использовать dayjs для работы с датами;<br/>
                    — использовать firebase.google.com как Back-end;<br/>
                    — использовать firebase.google.com или now.sh как хостинг клиенской части;<br/>
                    — использовать less, если потребуется писать стили;<br/>
                    — постараться не использовать никаких библиотек, кроме необходимых для общения с Back-end.<br/>
                </p>
                <hr/><br/>
                <b>Использовал:</b><br/>
                <a href="https://firebase.google.com/docs">Firebase Doc</a> <br/>
                <a href="https://mui.com/material-ui/getting-started/overview/">Material UI Doc</a><br/>
                <a href="https://day.js.org/docs/en/installation/installation">DayJS Doc</a><br/>
                <a href="https://ru.reactjs.org/docs/getting-started.html">React Doc</a><br/>
                <br/>
                <b>Для решения проблем:</b> StackOverFlow и YouTube<br/>
                <br/>
                <i>Спасибо :)</i><br/>
            </div>

        </div>
    );
};

export default About;