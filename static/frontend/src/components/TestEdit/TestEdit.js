import React, {Component} from 'react';
import AddQuestionWindow from "./ModalWindiws/AddQuestionWindow";
import EditScaleWindow from "./ModalWindiws/EditScaleWindow";
import SearchQuestionForm from "./Forms/SearchQuestionForm";
import SaveTestForm from "./Forms/SaveTestForm";
import EditButtonsBlock from "./EditButtonsBlock";
import EditQuestionWindow from "./ModalWindiws/EditQuestionWindow";
import DeleteQuestionWindow from "./ModalWindiws/DeleteQuestionWindow";
import {getTest} from "../../actions/tests";
import {getQuestions, getQuestion} from "../../actions/questions";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";

class TestEdit extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 5,
        currentPage: 0,
    }
    static propTypes = {
        getTest: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
        getQuestion: PropTypes.func.isRequired,
    }

    componentDidMount() {
        const testId = Number(this.props.match.params.id)
        this.props.getTest(testId)
        this.props.getQuestions(this.props.match.params.id)
    }

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    componentDidUpdate(prevProps) {
        let testId
        if (this.props.match.params.id !== prevProps.match.params.id) {
            testId = this.props.match.params.id
            this.props.getTest(testId)

        }
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
        });
    };

    render() {
        this.handlePageClick.bind(this)
        const data = this.props.questions;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'result')

        let test = this.props.test
        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <aside className="filter mb-4">
                        <div className="SaveTestForm">
                            <SaveTestForm
                                test={test}
                                testId={this.props.match.params.id}
                            />
                        </div>
                        <div className="SearchQuestionForm">
                            <SearchQuestionForm
                                testId={this.props.match.params.id}
                                questions={this.props.questions}
                            />
                        </div>
                        <hr/>
                        <div className="row input-group input-group">
                            <div className="ml-3">
                            <span className="input-group-text">
                                Сортировка по:
                            </span>
                            </div>
                            <div className="ml-4">
                                <select
                                    name="isAsc"
                                    onChange={this.handleSelectChange.bind(this)}
                                >
                                    <option value={1}>Возрастанию</option>
                                    <option value={0}>Убыванию</option>
                                </select>
                            </div>
                        </div>
                        <hr/>
                        <div className="EditButtonsBlock">
                            <div className="buttons_block modal-footer">
                                <EditButtonsBlock />
                            </div>
                        </div>
                        <div className="AddQuestionWindow">
                            <AddQuestionWindow
                                testId={this.props.match.params.id}
                            />
                        </div>
                        <div className="EditScaleWindow">
                            <EditScaleWindow
                                test={test}
                                testId={this.props.match.params.id}
                            />
                        </div>
                        <div className="EditQuestionWindow">
                            <EditQuestionWindow
                                question={this.props.question}
                                questionId={this.props.question.nkey}
                            />
                        </div>
                        <div className="DeleteQuestionWindow">
                            <DeleteQuestionWindow
                                questionId={this.props.question.nkey}
                            />
                        </div>
                    </aside>
                    <div className="AddedQuestionList">
                        <table className="table table-responsive table-hover">
                            <tbody>
                            <tr>
                                <th>№</th>
                                <th>Название вопроса</th>
                                <th>Ответ №1</th>
                                <th>Ответ №2</th>
                                <th>Ответ №3</th>
                                <th>Ответ №4</th>
                                <th>Ответ №5</th>
                                <th>Ответ №6</th>
                                <th></th>
                            </tr>
                            {slice.map((question) =>
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
                                        <button
                                            type="button"
                                            className="mr-2 btn btn-warning btn-sm"
                                            data-toggle="modal"
                                            data-target="#changeWindow"
                                            onClick={this.props.getQuestion.bind(this, question.nkey)}
                                        >
                                            изменить
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            data-toggle="modal"
                                            data-target="#deleteWindow"
                                            onClick={this.props.getQuestion.bind(this, question.nkey)}
                                        >удалить
                                        </button>
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                    <ReactPaginate
                        previousLabel={"<<"}
                        nextLabel={">>"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(data.length / this.state.perPage)}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={1}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    test: state.test.test,
    questions: state.questions.questions,
    question: state.question.question,
});
export default connect(mapStateToProps, {getTest, getQuestions, getQuestion})(TestEdit);