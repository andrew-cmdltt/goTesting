import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {deleteQuestion} from "../../../actions/questions";

class DeleteQuestionWindow extends Component {
    static propTypes = {
        deleteQuestion: PropTypes.func.isRequired
    };

    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить вопрос?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вся информация будет удалена из системы. Восстановить данные невозможно.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger mr-auto"
                                data-dismiss="modal"
                                onClick={this.props.deleteQuestion.bind(this, this.props.questionId)}
                            >
                                УДАЛИТЬ
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions.questions,
});

export default connect(mapStateToProps, {deleteQuestion})(DeleteQuestionWindow);