import React, {Component} from 'react';
import AddOrganizationWindow from "./ModalWindows/AddOrganizationWindow";
import SearchOrganizationsForm from "./SearchOrganizationsForm";
import OrgList from "./OrgList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {getOrganizations} from "../../actions/organizations";
import Nav from "../Nav/Nav";
import {getSortedValues} from "../../utils/getSortedValues";
import ReactPaginate from "react-paginate";

class OrganizationsList extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
    }

    static propTypes = {
        organizations: PropTypes.array.isRequired,
        getOrganizations: PropTypes.func.isRequired,
    };

    componentDidMount() {
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
        const data = this.props.organizations;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'nelementkey')

        return (
            <div>
                <Nav/>
                <div className="container-fluid m-auto">
                    <div className="SearchOrganizationsForm">
                        <SearchOrganizationsForm/>
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
                    <OrgList organizations={slice}/>
                    <div className="AddOrganizationWindow">
                        <AddOrganizationWindow/>
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
    organizations: state.organizations.organizations,
});
export default connect(mapStateToProps, {getOrganizations})(OrganizationsList);


