import React, {Component} from "react";
import {getQuestion, getQuestions} from "../../../actions/questions";
import {getTest} from "../../../actions/tests";
import {addAnswer} from "../../../actions/answers";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getCurrentQuestionNumber} from "../../../utils/getCurrentQuestionNumber";
import {getLastQuestionNumber} from "../../../utils/getLastQuestionNumber";
import {NavLink} from "react-router-dom";
import {getLastQuestionId} from "../../../utils/getLastQuestionId";
import {getNextQuestionId} from "../../../utils/getNextQuestionId";
import {getCurrentDate} from "../../../utils/getCurrentDate";
import {getAnswers} from "../../../actions/answers";
import {generateTestId} from "../../../utils/generateTestId";

class TestQuestion extends Component {
    state = {
        question: 0,
        ch1: false,
        ch2: false,
        ch3: false,
        ch4: false,
        ch5: false,
        ch6: false,
        nstaffkey: 1,
        ntestnumber: 0,
        testtime: getCurrentDate(),
        testdate: '',
        isUpdateTestTime: true,
        test_id: 0,
        ans1: 0,
        ans2: 0,
        ans3: 0,
        ans4: 0,
        ans5: 0,
        ans6: 0
    }
    static propTypes = {
        getQuestion: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
        getTest: PropTypes.func.isRequired,
        addAnswer: PropTypes.func.isRequired,
        getAnswers: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getQuestion(Number(this.props.match.params.question_id))
        this.props.getTest(Number(this.props.match.params.id))
        this.props.getQuestions(Number(this.props.match.params.id))
        this.props.getAnswers(Number(this.props.match.params.id))
    }

    componentDidUpdate(prevProps) {
        if (this.props.question !== prevProps.question) {
            this.setState({
                question: Number(this.props.match.params.question_id),
                ntestnumber: Number(this.props.match.params.id),
            })
        }
    }

    onChange = (e) => {
        switch (e.target.name) {
            case 'ans1':
                this.setState({ch1: !(this.state.ch1)})
                break
            case 'ans2':
                this.setState({ch2: !(this.state.ch2)})
                break
            case 'ans3':
                this.setState({ch3: !(this.state.ch3)})
                break
            case 'ans4':
                this.setState({ch4: !(this.state.ch4)})
                break
            case 'ans5':
                this.setState({ch5: !(this.state.ch5)})
                break
            default:
                this.setState({ch6: !(this.state.ch6)})
                break
        }
        if (e.target.checked) {
            this.setState({[e.target.name]: Number(e.target.value)});
        } else {
            this.setState({[e.target.name]: 0});
        }
    }
    onClick = (e) => {
        const questionId = (Number(this.props.match.params.question_id))
        const lastQuestionId = getLastQuestionId(this.props.questions)
        const nextQuestionId = getNextQuestionId(this.props.questions, questionId)
        this.props.getQuestion(nextQuestionId)
        const {
            question,
            nstaffkey,
            ntestnumber,
            testtime,
            testdate, test_id, ans1, ans2, ans3, ans4, ans5, ans6 } = this.state;
        const answer = {
            question,
            nstaffkey,
            ntestnumber,
            testtime,
            testdate,
            test_id, ans1, ans2, ans3, ans4, ans5, ans6};
        this.props.addAnswer(answer);
        this.setState({ch1: false, ch2: false, ch3: false, ch4: false, ch5: false, ch6: false,
            ans1: 0,
            ans2: 0,
            ans3: 0,
            ans4: 0,
            ans5: 0,
            ans6: 0,
            isUpdateTestTime: true
        })
        if (questionId === lastQuestionId) {
            this.setState({test_id: 0})
        }
    }

    render() {
        this.state.nstaffkey = this.props.auth.user.nuserkey
        this.state.testdate = getCurrentDate()
        const questionId = (Number(this.props.match.params.question_id))
        const currentQuestionNumber = getCurrentQuestionNumber(this.props.questions, questionId)
        const lastQuestionNumber = getLastQuestionNumber(this.props.questions)
        const lastQuestionId = getLastQuestionId(this.props.questions)
        const nextQuestionId = getNextQuestionId(this.props.questions, questionId)

        if (!this.state.test_id) {
            this.state.test_id = generateTestId(700, 10000)
        }

        if (this.state.isUpdateTestTime) {
            this.state.testtime = getCurrentDate()
            this.state.isUpdateTestTime = false
        }

        return (
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-10">
                        <p style={{fontSize: "110%"}}>Вы проходите тест: {this.props.test.ctestname}</p>
                    </div>
                    <div className="col-md-2">
                        <NavLink
                            className="btn btn-warning btn-lg btn-block"
                            to={`/final-result/${this.props.match.params.id}`}
                            onClick={this.onClick}
                        >
                            завершить тест
                        </NavLink>
                    </div>
                </div>
                <form action="" method="post">
                    <div className="row mb-5 mt-5">
                        <div className="col-md-12">
                            <p style={{fontSize: "110%"}}>
                                Вопрос: {currentQuestionNumber} / {lastQuestionNumber}
                            </p>
                            <hr/>
                            <h2 style={{fontSize: "30px"}}>
                                {this.props.question.cquestion}
                            </h2>
                        </div>
                        {this.props.question.canswer1 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans1" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans1"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans1"
                                            onChange={this.onChange}
                                            checked={this.state.ch1}
                                            value={this.props.question.nw1}

                                        />
                                        {this.props.question.canswer1}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {this.props.question.canswer2 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans2" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans2"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans2"
                                            onChange={this.onChange}
                                            checked={this.state.ch2}
                                            value={this.props.question.nw2}
                                        />
                                        {this.props.question.canswer2}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {this.props.question.canswer3 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans3" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans3"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans3"
                                            onChange={this.onChange}
                                            checked={this.state.ch3}
                                            value={this.props.question.nw3}
                                        />
                                        {this.props.question.canswer3}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {this.props.question.canswer4 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans4" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans4"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans4"
                                            onChange={this.onChange}
                                            checked={this.state.ch4}
                                            value={this.props.question.nw4}
                                        />
                                        {this.props.question.canswer4}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {this.props.question.canswer5 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans5" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans5"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans5"
                                            onChange={this.onChange}
                                            checked={this.state.ch5}
                                            value={this.props.question.nw5}
                                        />
                                        {this.props.question.canswer5}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                        {this.props.question.canswer6 ?
                            <div className="col-md-12">
                                <div className="form-check">
                                    <label htmlFor="ans6" className="form-check-label" style={{fontSize: "20px"}}>
                                        <input
                                            name="ans6"
                                            type="checkbox"
                                            className="form-check-input"
                                            id="ans6"
                                            onChange={this.onChange}
                                            checked={this.state.ch6}
                                            value={this.props.question.nw6}
                                        />
                                        {this.props.question.canswer6}
                                    </label>
                                </div>
                            </div>
                            :
                            ''
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <hr/>
                            <div className="row">
                                <div className="col-md-9">

                                </div>
                                <div className="col-md-3"
                                >
                                    {questionId === lastQuestionId
                                        ?
                                        <NavLink
                                            className="btn btn-primary btn-lg btn-block"
                                            to={`/final-result/${this.props.match.params.id}`}
                                            onClick={this.onClick}
                                        >
                                            следующий вопрос
                                        </NavLink>
                                        :
                                        <NavLink
                                            className="btn btn-primary btn-lg btn-block"
                                            to={`/go/${this.props.match.params.id}/question/${nextQuestionId}`}
                                            onClick={this.onClick}
                                        >
                                            следующий вопрос
                                        </NavLink>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    question: state.question.question,
    questions: state.questions.questions,
    answers: state.answers.answers,
    test: state.test.test,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});
export default connect(mapStateToProps, {getQuestion, getTest, getQuestions, addAnswer, getAnswers})(TestQuestion);