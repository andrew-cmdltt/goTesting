import React, {Component} from "react";
import PropTypes from "prop-types";
import {editQuestion} from "../../../actions/questions";
import {connect} from "react-redux";

class EditQuestionWindow extends Component {
    state = {
        savedId: 0
    }
    static propTypes = {
        editQuestion: PropTypes.func.isRequired,
    };

    onChange = (e) => {
        const string_values = [
            "cquestion",
            "canswer1",
            "canswer2",
            "canswer3",
            "canswer4",
            "canswer5",
            "canswer6"
        ]
        if (string_values.indexOf(e.target.name) > -1) {
            this.setState({ ...this.state, [e.target.name]: e.target.value });
        } else {
            this.setState({...this.state, [e.target.name]: Number(e.target.value) });
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            ntestnumber,
            cquestion,
            canswer1,
            canswer2,
            canswer3,
            canswer4,
            canswer5,
            canswer6,
            nw1,
            nw2,
            nw3,
            nw4,
            nw5,
            nw6
        } = this.state
        const question = {
            ntestnumber,
            cquestion,
            canswer1,
            canswer2,
            canswer3,
            canswer4,
            canswer5,
            canswer6,
            nw1,
            nw2,
            nw3,
            nw4,
            nw5,
            nw6
        }
        this.props.editQuestion(question, this.state.savedId);
    };

    render() {
        if (this.props.question.nkey) {
            this.state = this.props.question
            this.state.savedId = this.props.questionId
            this.props.question.nkey = null
        }
        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document" style={{maxWidth: "1000px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel">Изменить описание вопроса:</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="cquestion" className="font-weight-bold">Название вопроса:</label>
                                    <textarea
                                        placeholder="введите название вопроса..."
                                        className="form-control"
                                        name="cquestion"
                                        onChange={this.onChange}
                                        value={this.state.cquestion || ''}
                                        cols="30"
                                        rows="5"
                                    >
                                    </textarea>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group ">
                                                <label htmlFor="canswer1" className="font-weight-bold">Ответ №1:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer1"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer1 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw1"
                                                        onChange={this.onChange}
                                                        value={this.state.nw1 || 0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group border-dark">
                                                <label htmlFor="canswer2" className="font-weight-bold">Ответ №2:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer2"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer2 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw2"
                                                        onChange={this.onChange}
                                                        value={this.state.nw2 || 0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="canswer3" className="font-weight-bold">Ответ №3:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer3"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer3 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw3"
                                                        onChange={this.onChange}
                                                        value={this.state.nw3 || 0}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="canswer4" className="font-weight-bold">Ответ №4:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer4"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer4 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw4"
                                                        onChange={this.onChange}
                                                        value={this.state.nw4 || 0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="canswer5" className="font-weight-bold">Ответ №5:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer5"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer5 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw5"
                                                        onChange={this.onChange}
                                                        value={this.state.nw5 || 0}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="canswer6" className="font-weight-bold">Ответ №6:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name="canswer6"
                                                    onChange={this.onChange}
                                                    value={this.state.canswer6 || ''}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="nw6"
                                                        onChange={this.onChange}
                                                        value={this.state.nw6 || 0}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions.questions,
});
export default connect(mapStateToProps, { editQuestion })(EditQuestionWindow);