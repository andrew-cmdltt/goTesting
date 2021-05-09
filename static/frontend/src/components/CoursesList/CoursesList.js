import React, {Component} from 'react';
import AddCourseWindow from "./ModalWindows/AddCourseWindow";
import HavingCoursesList from "./HavingCoursesList";
import SearchCourseForm from "./SearchCourseForm";
import PropTypes from "prop-types";
import {getCourses} from "../../actions/courses";
import {listening} from "../../actions/courses";
import {connect} from "react-redux";
import {getOrganizations} from "../../actions/organizations";
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";
import store from "../../store";
let _ = require('lodash');

class CoursesList extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        organizations: PropTypes.array.isRequired,
        courses: PropTypes.array.isRequired,
        getOrganizations: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        listening: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getOrganizations()
        this.props.getCourses()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (!_.isEqual(prevProps.courses, this.props.courses)) {
        //     console.log("componentDidUpdate")
        //     console.log(prevProps.courses)
        //     console.log(this.props.courses)
        //     this.props.listening()
        //
        // }
        if (store.getState().listeningResult.listeningResult) {
            console.log(store.getState().listeningResult.listeningResult)
            store.getState().listeningResult.listeningResult = ""
            console.log("request was sent")
            this.props.listening()
        }
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
        console.log("you are in courses")

        this.handlePageClick.bind(this)
        const data = this.props.courses;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'id')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <aside className="filter mt-2">
                        <div>
                            <SearchCourseForm
                                organizations={this.props.organizations}
                                courses={this.props.courses}
                            />
                        </div>
                        <div className="mt-2">
                            <button id="addButton" className="btn btn-success" type="button" data-toggle="modal"
                                    data-target="#addWindow">добавить курс
                            </button>
                        </div>
                    </aside>
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
                    <HavingCoursesList
                        courses={slice}
                        organizations={this.props.organizations}
                    />
                    <div className="AddCourseWindow">
                        <AddCourseWindow organizations={this.props.organizations}/>
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
    courses: state.courses.courses,
    organizations: state.organizations.organizations,
});
export default connect(mapStateToProps, {
    getCourses,
    getOrganizations,
    listening
})(CoursesList);