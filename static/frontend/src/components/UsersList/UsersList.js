import React, {Component} from 'react';
import AddUserWindow from "./ModalWindows/AddUserWindow";
import SearchUsersForm from "./SearchUsersForm";
import FoundResultsList from "./FoundResultsList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getUsers} from "../../actions/users";
import {getOrganizations} from "../../actions/organizations";
import ReactPaginate from 'react-paginate';
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";

class UsersList extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        users: PropTypes.array.isRequired,
        organizations: PropTypes.array.isRequired,
        getUsers: PropTypes.func.isRequired,
        getOrganizations: PropTypes.func.isRequired,
    };

    componentDidMount() {
        this.props.getUsers()
        this.props.getOrganizations()
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
        const data = this.props.users;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'nuserkey')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <div className="SearchUsersForm">
                        <SearchUsersForm
                            users={this.props.users}
                            organizations={this.props.organizations}
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
                    <div className="FoundResultsList">
                        <FoundResultsList
                            users={slice}
                            organizations={this.props.organizations}
                        />
                    </div>
                    <div className="AddUserWindow">
                        <AddUserWindow organizations={this.props.organizations}/>
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
    users: state.users.users,
    organizations: state.organizations.organizations,
});
export default connect(mapStateToProps, {getUsers, getOrganizations})(UsersList);


