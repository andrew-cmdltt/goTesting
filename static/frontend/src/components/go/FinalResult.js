import React, {Component} from "react";
import logo from "../../img/logo.png";
const static_path = '../static/frontend/static/frontend/'
import {getTest} from "../../actions/tests";
import {getAnswers} from "../../actions/answers";
import {getQuestions} from "../../actions/questions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getAccumulatedPoints} from "../../utils/getAccumulatedPoints";
import {getMaxPoints} from "../../utils/getMaxPoints";
import {getDateStart} from "../../utils/getDateStart";
import {getDateEnd} from "../../utils/getDateEnd";
import {addResult} from "../../actions/results";
import {NavLink} from "react-router-dom";

class FinalResult extends Component {
    state = {
        test: 0,
        user: 0,
        date_start: '',
        date_end: '',
        result: 0
    }
    static propTypes = {
        getTest: PropTypes.func.isRequired,
        getAnswers: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
        addResult: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool,

    };
    componentDidMount() {
        this.props.getTest(this.props.match.params.id)
        this.props.getAnswers(this.props.match.params.id)
        this.props.getQuestions(this.props.match.params.id)
    }
    onClick = () => {
        const {test, user, date_start, date_end, result} = this.state
        const testResult =  {test, user, date_start, date_end, result}
        this.props.addResult(testResult)
        this.state.isWriteTestResult = false
    }
    render() {
        let userId
        if (this.props.isAuthenticated) {
            userId = this.props.auth.user.nuserkey
        }

        const answers = this.props.answers
        const testId = answers[answers.length - 1]['test_id']
        const accumulatedPoints = getAccumulatedPoints(answers, testId, userId)
        const maxPoints = getMaxPoints(this.props.questions)
        const result = Math.round((accumulatedPoints / maxPoints) * 100)
        const full_name = this.props.auth.user.full_name

        this.state.test = this.props.match.params.id
        this.state.user = userId
        this.state.date_start = getDateStart(answers, testId, userId)
        this.state.date_end = getDateEnd(answers, testId, userId)
        this.state.result = getAccumulatedPoints(answers, testId, userId)

        return (
            <div className="container mt-1">
                <div className="row">
                    <div className="col-md-12 text-center">
                        <a href=""><img
                            style={{width: "300px", height: "300px"}}
                            src={static_path + logo}
                            alt="Тестирование персонала"
                        /></a>
                        <p style={{fontSize: "120%"}}> {full_name}, вы прошли тест:</p>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12 text-center">
                        <h1>«{this.props.test.ctestname}»</h1>
                    </div>
                </div>
                <hr/>
                    <div className="row mt-2 alert ">
                        <div className="col-md-12 text-center" style={{fontsize: "120%"}}>
                            <p>Ваш результат:</p>
                            <div>
                                <h1 className="mt-2 mb-3" style={{fontSize: "500%"}}>
                                    {result}%
                                </h1>
                            </div>
                            <p>Вы набрали баллов: {accumulatedPoints} из {maxPoints}</p>
                            <p className="alert alert-info">...</p>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-12">
                            <NavLink
                                to="/home"
                                className="btn btn-success btn-block btn-lg"
                                onClick={this.onClick.bind(this)}
                            >
                                перейти на страницу тестов
                            </NavLink>
                            <NavLink
                                to="/results"
                                className="btn btn-primary btn-block btn-lg"
                                onClick={this.onClick.bind(this)}
                            >
                                посмотреть статистику
                            </NavLink>
                        </div>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    answers: state.answers.answers,
    questions: state.questions.questions,
    results: state.results.results,
    test: state.test.test,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {getAnswers, getTest, getQuestions, addResult})(FinalResult);