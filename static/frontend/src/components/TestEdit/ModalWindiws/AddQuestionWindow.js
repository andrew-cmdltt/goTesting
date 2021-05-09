import React, {Component} from 'react';
import PropTypes from "prop-types";
import {addQuestion} from "../../../actions/questions";
import {connect} from "react-redux";

class AddQuestionWindow extends Component {
    state = {
        savedTestId: 0,
        ntestnumber: 0,
        cquestion: '',
        canswer1: '',
        canswer2: '',
        canswer3: '',
        canswer4: '',
        canswer5: '',
        canswer6: '',
        nw1: 0,
        nw2: 0,
        nw3: 0,
        nw4: 0,
        nw5: 0,
        nw6: 0,
    };
    static propTypes = {
        addQuestion: PropTypes.func.isRequired,
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
        console.log(e.target.name)
        if (string_values.indexOf(e.target.name) > -1) {
            this.setState({ [e.target.name]: e.target.value });
        } else {
            this.setState({ [e.target.name]: Number(e.target.value) });
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
        this.props.addQuestion(question);
        this.setState({
            cquestion: '',
            canswer1: '',
            canswer2: '',
            canswer3: '',
            canswer4: '',
            canswer5: '',
            canswer6: '',
            nw1: 0,
            nw2: 0,
            nw3: 0,
            nw4: 0,
            nw5: 0,
            nw6: 0,
        });
    };
    render() {
        if (this.props.testId) {
            this.state.savedTestId = this.props.testId
            this.state.ntestnumber = Number(this.state.savedTestId)
        }
        const {
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
        return (
            <div className="modal fade" id="addQuestionWindow" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document" style={{maxWidth: "1000px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title" id="exampleModalLabel">Добавление нового вопроса к тесту</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-header">
                            <h4 id="questionDesc">Пожалуйста, заполните необходимые поля</h4>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="nameQuestion" className="font-weight-bold">Название вопроса:</label>
                                    <textarea
                                        placeholder="введите название вопроса..."
                                        className="form-control"
                                        name="cquestion"
                                        id="cquestion"
                                        onChange={this.onChange}
                                        value={cquestion}
                                        cols="30"
                                        rows="5"
                                    >
                                    </textarea>
                                </div>
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group ">
                                                <label htmlFor="answer1" className="font-weight-bold">Ответ №1:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer1"
                                                    name="canswer1"
                                                    onChange={this.onChange}
                                                    value={canswer1}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw1"
                                                        name="nw1"
                                                        onChange={this.onChange}
                                                        value={nw1}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group border-dark">
                                                <label htmlFor="answer2" className="font-weight-bold">Ответ №2:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer2"
                                                    name="canswer2"
                                                    onChange={this.onChange}
                                                    value={canswer2}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw2"
                                                        name="nw2"
                                                        onChange={this.onChange}
                                                        value={nw2}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="answer3" className="font-weight-bold">Ответ №3:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer3"
                                                    name="canswer3"
                                                    onChange={this.onChange}
                                                    value={canswer3}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw3"
                                                        name="nw3"
                                                        onChange={this.onChange}
                                                        value={nw3}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="answer4" className="font-weight-bold">Ответ №4:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer4"
                                                    name="canswer4"
                                                    onChange={this.onChange}
                                                    value={canswer4}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw4"
                                                        name="nw4"
                                                        onChange={this.onChange}
                                                        value={nw4}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="answer5" className="font-weight-bold">Ответ №5:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer5"
                                                    name="canswer5"
                                                    onChange={this.onChange}
                                                    value={canswer5}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw5"
                                                        name="nw5"
                                                        onChange={this.onChange}
                                                        value={nw5}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="answer6" className="font-weight-bold">Ответ №6:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    id="canswer6"
                                                    name="canswer6"
                                                    onChange={this.onChange}
                                                    value={canswer6}
                                                />
                                                <div className="input-group input-group-btn">
                                                    <span className="input-group-addon">баллы:</span>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="nw6"
                                                        name="nw6"
                                                        onChange={this.onChange}
                                                        value={nw6}
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
export default connect(mapStateToProps, { addQuestion })(AddQuestionWindow);