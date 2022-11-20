import React from 'react';
import {Link} from 'react-router-dom'
import cl from './Header.module.scss'

/**
 * Шапка приложения
 * Содержит название и ссылки на страницы:
 * - главная (all todos),
 * - создание нового поста (create),
 * - расширенная информация о приложении (about)
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
    return (
        <div className={cl.wrapper}>
            <div className={cl.content}>
                <div className={cl.title}>
                    <Link className={cl.title_text} to="/">Todo List</Link>
                </div>
                <div className={cl.list}>
                    <Link className={cl.item} to='/'>All todos</Link>
                    <Link className={cl.item} to='/create'>Create</Link>
                    <Link className={cl.item} to='/about'>About</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;