import React, {Component} from 'react';
import StatSearchForm from "./StatSearchForm";
import QuestionsList from "./QuestionList/index.js";
import {getAllQuestions} from "../../actions/questions";
import {getAllAnswers} from "../../actions/answers";
import {getTests} from "../../actions/tests";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";

class QuestionStatistics extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 10,
        currentPage: 0,
    }

    static propTypes = {
        getAllAnswers: PropTypes.func.isRequired,
        getTests: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getAllAnswers()
        this.props.getTests()
        this.props.getAllQuestions()
    }

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
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
        const data = this.props.answers;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'nkey')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <div className="StatSearchForm">
                        <StatSearchForm
                            users={this.props.users}
                            tests={this.props.tests}
                            questiosn={this.props.questions}
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
                    <div className="QuestionsList">
                        <table className="table table-responsive">
                            <tbody>
                            <tr>
                                <th>№</th>
                                <th>Название вопроса</th>
                                <th>Пользователь (тестируемый)</th>
                                <th>Проходимый тест</th>
                                <th>Дата ответа на вопрос</th>
                                <th>Время прохождения</th>
                                <th>Кол-во полученных баллов</th>
                            </tr>
                            <QuestionsList
                                users={this.props.users}
                                tests={this.props.tests}
                                answers={slice}
                                questions={this.props.questions}
                            />
                            </tbody>
                        </table>
                        <div className="row-pagination">
                            <nav aria-label="pagination">
                            </nav>
                        </div>
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
    answers: state.answers.answers,
    tests: state.tests.tests,
    users: state.users.users,
    questions: state.questions.questions,
});
export default connect(mapStateToProps, {getAllAnswers, getTests, getAllQuestions})(QuestionStatistics);

