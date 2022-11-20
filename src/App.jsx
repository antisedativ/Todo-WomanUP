import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import About from "./pages/about/About"
import CreateTodo from "./pages/create/CreateTodo";
import Header from "./components/header/Header";

import './index.scss'
import AllTodos from "./pages/allTodo/AllTodo";
import TodoDetails from "./pages/todoDetails/TodoDetails";

/**
 * Реакт компонент (APP)
 * В данном компоненте реализован роутинг
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    return (
        <Router >
            <Header />
            <div className='body'>
                <Routes>
                    <Route exact path="/" element={<AllTodos />} />
                    <Route path="/about" element={<About />}/>
                    <Route path="/create" element={<CreateTodo />} />
                    <Route path="/todo/:id/" element={<TodoDetails />}/>
                </Routes>
            </div>
        </Router>
    );
}

export default App;