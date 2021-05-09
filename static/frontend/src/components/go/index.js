import React, {Component} from 'react';
import {getTest} from "../../actions/tests";
import {getQuestions} from "../../actions/questions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {NavLink} from "react-router-dom";
import {getStartQuestionId} from "../../utils/getStartQuestionId";

class StartTest extends Component {
    static propTypes = {
        getTest: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
    };
    componentDidMount() {
        this.props.getTest(Number(this.props.match.params.id))
        this.props.getQuestions(Number(this.props.match.params.id))
    }

    render() {
        const testId = this.props.test.test_id
        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12 mb-4">
                        <h3><span className="badge badge-info">{this.props.test.ctestname}</span></h3>
                    </div>
                    <div className="col-md-12">
                        <textarea disabled="disabled" style={{fontSize: "130%", fontWeight: "bold", lineHeight: "1.5"}} className="form-control"
                        name="" id="" cols="30" rows="7" value={this.props.test.cmessage}>
                        </textarea>
                    </div>

                    <div className="col-md-12 mt-2">
                        <NavLink className="btn btn-warning btn-block btn-lg" to="/">отказаться</NavLink>
                        <NavLink
                            className="btn btn-primary btn-block btn-lg"
                            to={`/go/${testId}/question/${getStartQuestionId(this.props.questions)}`}
                        >
                            начать прохождение теста
                        </NavLink>
                    </div>

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    test: state.test.test,
    questions: state.questions.questions,
});
export default connect(mapStateToProps, {getTest, getQuestions})(StartTest);
