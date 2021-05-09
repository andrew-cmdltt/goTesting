import React, {Component} from "react";
import {getAnswerPoints} from "../../../utils/getAnswerPoints";
import {getQuestionPoints} from "../../../utils/getQuestionPoints";
import {returnResult} from "../../../utils/returnResult";
import {getQuestionTitle} from "../../../utils/getQuestionTitle";
const dateFormat = require('dateformat')
class QuestionsList extends Component {
    render() {
        return this.props.answers.map((answer, index) =>
            <tr key={answer.nkey}>
                <td>
                    <span className="badge badge-dark">
                        {answer.nkey}
                    </span>
                </td>
                <td>
                    {getQuestionTitle(this.props.questions, answer.question)}
                </td>
                <td>{answer.fio}</td>
                <td>{answer.testname}</td>
                <td>{dateFormat(answer.testdate, "UTC:dd.mm.yyyy")}</td>
                <td>{dateFormat(answer.testdate, "UTC:hh.MM.ss")}</td>
                <td>
                    <div className="progress">
                        <div
                            className={returnResult(
                                getAnswerPoints(answer),
                                getQuestionPoints(this.props.answers, answer.nkey))[0]}
                            role="progressbar"
                            style={{
                                width: returnResult(
                                    getAnswerPoints(answer),
                                    getQuestionPoints(this.props.answers, answer.nkey))[1],
                                color: 'black'
                            }}
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                    {getAnswerPoints(answer)} / {getQuestionPoints(this.props.answers, answer.nkey)}
                    {' '}
                    {
                        returnResult(
                            getAnswerPoints(answer),
                            getQuestionPoints(this.props.answers, answer.nkey),
                        )[2] + '%'
                    }
                </td>
            </tr>
        )
    }
}

export default QuestionsList