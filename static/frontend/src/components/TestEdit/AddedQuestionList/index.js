import React, {Component} from "react";
class AddedQuestionList extends Component {
    render() {
        return this.props.questions.map((question, index) =>
            <tr key={question.nkey}>
                <td><span className="badge badge-dark" data-userid="4">{question.nkey}</span></td>
                <td>{question.cquestion}</td>
                <td>{question.canswer1}</td>
                <td>{question.canswer2}</td>
                <td>{question.canswer3}</td>
                <td>{question.canswer4}</td>
                <td>{question.canswer5}</td>
                <td>{question.canswer6}</td>
                <td style={{width: "10%"}} colSpan="2">
                    <button type="button" className="mt-2 btn btn-warning btn-sm" data-toggle="modal"
                            data-target="#changeWindow">изменить
                    </button>
                    <button type="button" className=" mt-2 btn btn-danger btn-sm" data-toggle="modal"
                            data-target="#deleteWindow">удалить
                    </button>
                </td>
            </tr>
        );
    }
}
export default AddedQuestionList