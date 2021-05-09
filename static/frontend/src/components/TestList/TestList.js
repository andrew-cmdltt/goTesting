import React, {Component} from 'react';
import SearchTestBlock from "./SearchTestBlock";
import PersonalCard from "./PersonalCard";
import {NavLink, Redirect} from "react-router-dom";
import PropTypes from "prop-types"
import {connect} from "react-redux";
import {getTests} from "../../actions/tests";
import Nav from "../Nav/Nav";
import {getOrganizations} from "../../actions/organizations";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";

class TestList extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
        getTests: PropTypes.func.isRequired,
        getOrganizations: PropTypes.func.isRequired,
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.getTests()
            this.props.getOrganizations()
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
        if (!localStorage.nuserkey) {
            return <Redirect to="/login"/>;
        }

        let isAdmin
        // console.log(localStorage.user);
        if (localStorage.nuserkey) {
            // console.log(localStorage.token)
            isAdmin = localStorage.nusertypekey === 533

        }

        this.handlePageClick.bind(this)
        const data = this.props.tests;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)

        slice = getSortedValues(this.state.isAsc, slice, 'test_id')

        const user = localStorage.user
        return (
            <div>
                <Nav/>
                <div className='container-fluid m-auto'>
                    <div className="row">
                        <SearchTestBlock
                            user={user}
                            tests={slice}
                            organizations={this.props.organizations}
                        />
                        <PersonalCard user={user}/>
                        <div className="col-6">
                            <br/>
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

                    {isAdmin ?
                        <NavLink
                            to='/home'
                            data-toggle="modal"
                            data-target="#importWindow"
                            className='btn btn-success'
                        >
                            Импортировать тест
                        </NavLink>
                        :
                        ''
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    tests: state.tests.tests,
    organizations: state.organizations.organizations,
});

export default connect(mapStateToProps, {getTests, getOrganizations})(TestList);