import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import {deleteTest, exportTest, importTest} from "../../../actions/tests";
import {connect} from "react-redux";
import {getOrganizationName} from "../../../utils/getOrganizationName";
import ImportWindow from "../ModalWindows/ImportWindow";

class FoundTests extends Component {
    static propTypes = {
        deleteTest: PropTypes.func.isRequired,
        tests: PropTypes.array.isRequired,
        organizations: PropTypes.array.isRequired,
    };

    state = {
        testId: null,
    };

    onClick = (testId) => {
        this.state.testId = testId
    }

    render() {
        const isAdmin = localStorage.nusertypekey === "533"
        const isModerator = localStorage.nusertypekey === "532"
        return (
            <div>
                <ImportWindow testId={this.state.testId}/>
                {
                    this.props.tests.map((test, index) =>
                        (
                            <div className="list-group-item" key={test.test_id}>
                                <a href="" className="mr-3">{test.ctestname}</a>
                                <NavLink to={`/go/${test.test_id}`}>
                                    <span id="delete" className="badge badge-primary mr-3">
                                        пройти
                                    </span>
                                </NavLink>
                                {isAdmin ?
                                    <>
                                        <NavLink to={`/edit/${test.test_id}`}>
                                            <span className="badge badge-warning mr-3">
                                                редактировать
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            onClick={this.props.deleteTest.bind(this, test.test_id)}
                                            to='/home'
                                        >
                                            <span className="badge badge-danger mr-3">
                                                удалить
                                            </span>
                                        </NavLink>
                                        <NavLink
                                            onClick={this.props.exportTest.bind(this, test.test_id)}
                                            to='/home'
                                        >
                                    <span className="badge badge-success mr-3">
                                        экспортировать
                                    </span>
                                        </NavLink>
                                    </>
                                    :
                                    ''
                                }
                                {isModerator ?

                                    <>
                                        <NavLink to={`/edit/${test.test_id}`}>
                                            <span className="badge badge-warning mr-3">
                                                редактировать
                                            </span>
                                        </NavLink>
                                    </>
                                    :
                                    ''
                                }
                                <hr/>
                                <div className="input-group input-group-sm">
                                    <span className="input-group-text">учебная организация:</span>
                                    <span className="form-control">
                        {
                            getOrganizationName(this.props.organizations, test.organization)
                                ?
                                getOrganizationName(this.props.organizations, test.organization)
                                :
                                'не указана'
                        }
                                </span>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {deleteTest, exportTest, importTest})(FoundTests);