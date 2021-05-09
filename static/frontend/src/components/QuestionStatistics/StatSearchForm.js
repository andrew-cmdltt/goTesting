import React, {Component} from "react";
import PropTypes from "prop-types";
import {searchAnswers} from "../../actions/answers";
import {getAllAnswers} from "../../actions/answers";
import {connect} from "react-redux";
import {getQuestionIdByTitle} from "../../utils/getQuestionIdByTitle";
import {getUserIdBySurname} from "../../utils/getUserIdBySurname";
import {getTestIdByTitle} from "../../utils/getTestIdByTitle";

class StatSearchForm extends Component {

    state = {
        question: '',
        nstaffkey: '',
        ntestnumber: '',
        testtime: 'дд.мм.гггг',
        testdate: 'дд.мм.гггг',
    };

    static propTypes = {
        searchAnswers: PropTypes.func.isRequired,
        getAllAnswers: PropTypes.func.isRequired,
    };

    onChange = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {
            question,
            nstaffkey,
            ntestnumber,
            testtime,
            testdate
        } = this.state;

        question = getQuestionIdByTitle(this.props.questions, question)
        nstaffkey = getUserIdBySurname(this.props.users, nstaffkey)
        ntestnumber = getTestIdByTitle(this.props.tests, ntestnumber)

        let params = [
            question,
            nstaffkey,
            ntestnumber,
            testtime,
            testdate
        ]

        if (params === '0/0/0/дд.мм.гггг/дд.мм.гггг' || !testdate && !testdate) {
            this.props.getAllAnswers();
        } else {
            params = {
                question,
                nstaffkey,
                ntestnumber,
                testtime,
                testdate
            }
            this.props.searchAnswers(params);
        }
    };

    render() {
        const {
            question,
            nstaffkey,
            ntestnumber,
            testtime,
            testdate
        } = this.state;

        return (
            <aside className="filter mt-2">
                <div>
                    <form className="mb-2" onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                name="question"
                                value={question}
                                onChange={this.onChange}
                                placeholder="по названию вопроса"
                            />
                            <input
                                className="form-control"
                                type="search"
                                name="nstaffkey"
                                value={nstaffkey}
                                onChange={this.onChange}
                                placeholder="по фамилии пользователя"
                            />
                            <input
                                style={{
                                    borderRadius: ".25rem",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0"
                                }}
                                className="form-control"
                                type="search"
                                name="ntestnumber"
                                value={ntestnumber}
                                onChange={this.onChange}
                                placeholder="по тесту"
                            />
                            <span className="input-group-text"
                                  style={{
                                      borderLeft: "1px solid rgba(0,0,0,.15)",
                                      borderRadius: ".25rem",
                                      borderTopRightRadius: "0",
                                      borderBottomRightRadius: "0"
                                  }}>
                                          дата с:
                                </span>
                            <input
                                style={{padding: "0 .75rem"}}
                                className="form-control"
                                type="date"
                                name="testtime"
                                value={testtime}
                                onChange={this.onChange}
                            />

                            <span className="input-group-text">дата по:</span>
                            <input
                                style={{padding: "0 .75rem"}}
                                className="form-control"
                                type="date"
                                name="testdate"
                                value={testdate}
                                onChange={this.onChange}
                            />
                            <span className="input-group-btn">
                                        <input className="btn btn-primary" type="submit" value="поиск"/>
                                    </span>
                        </div>
                    </form>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions.questions,
    tests: state.tests.tests,
    users: state.users.users,
});
export default connect(mapStateToProps, {searchAnswers, getAllAnswers})(StatSearchForm);