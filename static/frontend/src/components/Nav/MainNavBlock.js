import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import logo from "../../img/logo.png";

const static_path = '../static/frontend/static/frontend/'

class MainNavBlock extends Component {
    render() {
        const isAdmin = localStorage.nusertypekey === "533";
        const isModerator = localStorage.nusertypekey === "532";
        const adminLinks = (<>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/questions">Статистика по вопросам</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/results">Результаты тестирования</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/users">Список пользователей</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/organizations">Перечень организаций</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/courses">Перечень курсов</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/appoint-tests">Назначить тесты</NavLink>
            </li>
            <li className="nav-item active outline">
                <button className="nav-link btn btn-outline-success" data-toggle="modal"
                        data-target="#add-test_window">Добавить новый тест
                </button>
            </li>
        </>)
        const moderatorLinks = (<>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/questions">Статистика по вопросам</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/results">Результаты тестирования</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/users">Список пользователей</NavLink>
            </li>
            <li className="nav-item active">
                <NavLink className="nav-link" to="/appoint-tests">Назначить тесты</NavLink>
            </li>
        </>)
        return (
            <div className="collapse navbar-collapse" id="navbar-top">
                <NavLink style={{outline: "none"}} className="navbar-brand" to="/home"
                         title="Тестирование персонала"><img src={static_path + logo} width="80" height="80"
                                                             alt="Тестирование персонала"/>Тестирование
                    персонала</NavLink>
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <NavLink className="nav-link" to="/home">Список тестов</NavLink>
                    </li>
                    {isAdmin ? adminLinks : ''}
                    {isModerator ? moderatorLinks : ''}
                </ul>
            </div>
        )
    }
}

export default MainNavBlock