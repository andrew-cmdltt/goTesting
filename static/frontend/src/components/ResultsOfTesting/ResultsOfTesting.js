import React, {Component} from 'react';
import ResultsSearchForm from "./ResultsSearchForm";
import ResultsList from "./ResultsList";
import PropTypes from "prop-types";
import {getResults} from "../../actions/results";
import {getTests} from "../../actions/tests";
import {getAllQuestions} from "../../actions/questions";
import {connect} from "react-redux";
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";

class ResultsOfTesting extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 10,
        currentPage: 0,
    }

    static propTypes = {
        getResults: PropTypes.func.isRequired,
        getTests: PropTypes.func.isRequired,
        getAllQuestions: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getResults()
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
        const data = this.props.results;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'result')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <div className="ResultsSearchForm">
                        <ResultsSearchForm
                            users={this.props.users}
                            tests={this.props.tests}
                            results={slice}
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
                    <div className="ResultsList">
                        <div>
                            <table className="table table-responsive table-hover">
                                <tbody>
                                <tr>
                                    <th>Название теста</th>
                                    <th>Пользователь (тестируемый)</th>
                                    <th>Дата прохождения теста</th>
                                    <th>Время завершения теста</th>
                                    <th>Кол-во набранных баллов</th>
                                    <th>Кол-во максимальных баллов</th>
                                    <th>Результат (в процентах)</th>
                                </tr>
                                <ResultsList
                                    users={this.props.users}
                                    tests={this.props.tests}
                                    results={slice}
                                    questions={this.props.questions}
                                />
                                </tbody>
                            </table>
                            <div className="row-pagination">
                                <nav aria-label="pagination">
                                </nav>
                            </div>
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
    results: state.results.results,
    tests: state.tests.tests,
    users: state.users.users,
    questions: state.questions.questions,
});
export default connect(mapStateToProps, {getResults, getTests, getAllQuestions})(ResultsOfTesting);