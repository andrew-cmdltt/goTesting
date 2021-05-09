import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import UsersList from "./UsersList/UsersList";
import {Provider} from 'react-redux'
import store from "../store";
import OrganizationsList from "./OrganizationsList/OrganizationsList";
import CoursesList from "./CoursesList/CoursesList";
import TestEdit from "./TestEdit/TestEdit";
import StartTest from "./go";
import TestQuestion from "./go/TestQuestion/TestQuestion";
import FinalResult from "./go/FinalResult";
import Login from "./Login/Login";
import TestList from "./TestList/TestList";
import PropTypes from "prop-types";
import ResultsOfTesting from "./ResultsOfTesting/ResultsOfTesting";
import QuestionStatistics from "./QuestionStatistics/QuestionStatistics";
import AppointTests from "./AppointTests/AppointTests";

class App extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Switch>
                            <Route exact path="/home" component={TestList}/>
                            <Route exact path="/" component={TestList}/>
                            <Route exact path="/organizations" component={OrganizationsList}/>
                            <Route exact path="/courses" component={CoursesList}/>
                            <Route exact path="/users" component={UsersList}/>
                            <Route path="/edit/:id" component={TestEdit}/>
                            <Route exact path="/go/:id" component={StartTest}/>
                            <Route path="/go/:id/question/:question_id" component={TestQuestion}/>
                            <Route path="/final-result/:id" component={FinalResult}/>
                            <Route path="/results" component={ResultsOfTesting}/>
                            <Route path="/login" component={Login} />
                            <Route path="/questions" component={QuestionStatistics}/>
                            <Route path="/appoint-tests" component={AppointTests}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))

