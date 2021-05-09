import React, {Component} from 'react';
import Nav from "../Nav/Nav";
import PropTypes from "prop-types";
import {getUsers} from "../../actions/users";
import {getTests} from "../../actions/tests";
import {editTest} from "../../actions/tests";
import {getAppointedTests} from "../../actions/appointedTests";
import {connect} from "react-redux";
import {getUserFullName} from "../../utils/getUserFullName";
import {isAppointed} from "../../utils/isAppointed";
import {deleteAppointedTest} from "../../actions/appointedTests";
import {getAppointedTestId} from "../../utils/getAppointedTestId";
import {getSortedValues} from "../../utils/getSortedValues";
import {addAppointedTest} from "../../actions/appointedTests";
import ReactPaginate from "react-paginate";
const randomstring = require('randomstring')

class AppointTests extends Component {
    state = {
        isAsc: 1,
        offset: 0,
        data: [],
        perPage: 3,
        currentPage: 0,
        nuserkey: 0,
        norganizationkey: 0
    }

    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        getTests: PropTypes.func.isRequired,
        editTest: PropTypes.func.isRequired,
        getAppointedTests: PropTypes.func.isRequired,
        deleteAppointedTest: PropTypes.func.isRequired,
        addAppointedTest: PropTypes.func.isRequired,
        users: PropTypes.array.isRequired,
        tests: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    componentDidMount() {
        this.props.getUsers()
        this.props.getTests()
        this.props.getAppointedTests()
    }

    onClick = (e) => {
        e.target.checked = !e.target.checked

        if (e.target.checked) {
            const appointedTestId = getAppointedTestId(
                this.props.appointedTests,
                Number(e.target.name),
                this.state.nuserkey
            )
            const test = {'nstaffkey': null, 'organization': null}
            this.props.deleteAppointedTest(appointedTestId)
            this.props.editTest(test, Number(e.target.name))
        } else {
            let test
            let testToAppointedTests
            testToAppointedTests = {
                'ntestkey': Number(e.target.name),
                'ndolzhnostkey': this.state.nuserkey,
            }
            // if (this.props.auth.user.nusertypekey === 533) {
            //     test = {
            //         'nstaffkey': this.state.nuserkey,
            //         'organization': this.state.norganizationkey
            //     }
            //     this.props.editTest(test, Number(e.target.name))
            // }

            this.props.addAppointedTest(testToAppointedTests)
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
        this.handlePageClick.bind(this)
        const data = this.props.tests;
        let slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        slice = getSortedValues(this.state.isAsc, slice, 'test_id')
        console.log(slice)
        if (this.state.nuserkey === 0 && this.props.users.length > 0) {
            this.state.nuserkey = this.props.users[0]['nuserkey']
            this.state.norganizationkey = this.props.users[0]['norganizationkey']
        }

        return (
            <div>
                <Nav/>
                <div className='container-fluid m-auto'>
                    <hr/>
                    <h3>Пользователь</h3>
                    <hr/>
                    <select
                        name="nuserkey"
                        onChange={this.handleSelectChange.bind(this)}
                        value={this.state.nuserkey}
                    >
                        {this.props.users.map((user, nuserkey) =>
                            <option
                                value={user.nuserkey}
                                name={user.nuserkey}
                                key={user.nuserkey}
                            >
                                {getUserFullName(this.props.users, user.nuserkey)}
                            </option>
                        )}
                    </select>
                    <hr/>
                    <h3>Тесты</h3>
                    <hr/>
                    <form action="" method="post">
                        <div className="row mb-5 mt-5">
                            {slice.map((test, index) =>
                                <div className="col-md-12" key={randomstring.generate()}>
                                    <div className="form-check">
                                        <label
                                            htmlFor={test.test_id}
                                            className="form-check-label"
                                            style={{fontSize: "20px"}}
                                        >
                                            <input
                                                name={test.test_id}
                                                type="checkbox"
                                                className="form-check-input"
                                                key={test.test_id}
                                                onChange={this.onClick}
                                                checked={isAppointed(
                                                    this.props.appointedTests,
                                                    test.test_id,
                                                    this.state.nuserkey
                                                )}

                                            />
                                            {test.ctestname}
                                        </label>
                                    </div>
                                </div>
                            )}
                            <hr/>
                        </div>
                    </form>
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
    tests: state.tests.tests,
    appointedTests: state.appointedTests.appointedTests,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps, {
    getUsers,
    getTests,
    getAppointedTests,
    deleteAppointedTest,
    addAppointedTest,
    editTest
})(AppointTests);
