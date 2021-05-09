import React, {Component} from "react";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getUser} from "../../../actions/users";
import ChangeUserInfoWindow from "../ModalWindows/ChangeUserInfoWindow";
import DeleteUserInfo from "../ModalWindows/DeleteUserInfo";
import {getUserAccessType} from "../../../utils/getUserAccessType";
import {getOrganizationName} from "../../../utils/getOrganizationName";

class FoundResultsList extends Component {
    static propTypes = {
        getUser: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
        users: PropTypes.array.isRequired
    };

    render() {
        return (
            <div className="FoundResultsList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Идентификатор (логин)</th>
                        <th>Организация</th>
                        <th>Тип учетной записи</th>
                        <th></th>
                    </tr>
                    {this.props.users.map((user, index) =>
                        <tr key={user.nuserkey}>
                            <td><span className="badge badge-dark">{user.nuserkey}</span></td>
                            <td><span>{user.cuserfamilyname}</span></td>
                            <td><span>{user.cuserfirstname}</span></td>
                            <td><span>{user.cusersurname}</span></td>
                            <td><span>{user.cidentificator}</span></td>
                            <td>
                                <span>
                                {
                                    getOrganizationName(this.props.organizations, user.norganizationkey)
                                }
                                </span>
                            </td>
                            <td><span>{getUserAccessType(user.nusertypekey)}</span></td>
                            <td>
                                <button
                                    type="button"
                                    className="mr-2 btn btn-warning btn-sm"
                                    data-toggle="modal"
                                    data-target="#changeWindow"
                                    onClick={this.props.getUser.bind(this, user.nuserkey)}
                                >изменить
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#deleteWindow"
                                    onClick={this.props.getUser.bind(this, user.nuserkey)}
                                >удалить
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <ChangeUserInfoWindow
                    user={this.props.user}
                    userId={this.props.user.nuserkey}
                    organizations={this.props.organizations}
                />
                <DeleteUserInfo userId={this.props.user.nuserkey}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    // users: state.users.users,
    organizations: state.organizations.organizations
});

export default connect(mapStateToProps, {getUser})(FoundResultsList);