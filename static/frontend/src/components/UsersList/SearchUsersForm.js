import React, {Component} from "react";
import PropTypes from "prop-types";
import {searchUsers} from "../../actions/users";
import {connect} from "react-redux";
import {setNotIndicated} from "../../utils/setNotIndicated";
import {getUsers} from "../../actions/users";

class SearchUsersForm extends Component {
    state = {
        cusersurname: '',
        cuserfirstname: '',
        cuserfamilyname: '',
        cidentificator: '',
        norganizationkey: 0,
        nuserkey: 0,

    };
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        getUsers: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            cusersurname,
            cuserfirstname,
            cuserfamilyname,
            cidentificator,
            norganizationkey,
            nuserkey,
        } = this.state;

        let params = [
            cusersurname,
            cuserfirstname,
            cuserfamilyname,
            cidentificator,
            norganizationkey,
            nuserkey,
        ]
        
        let requiredParams = setNotIndicated(params)
        if (requiredParams === 'не указано/не указано/не указано/не указано/0/0') {
            this.props.getUsers();
        } else {
            params = {
                cusersurname,
                cuserfirstname,
                cuserfamilyname,
                cidentificator,
                norganizationkey,
                nuserkey,
            }
            this.props.searchUsers(params);
        }

    };

    render() {
        let isAdmin
        if (this.props.isAuthenticated) {
            isAdmin = this.props.auth.user.nusertypekey === 533
        }
        const {
            cusersurname,
            cuserfirstname,
            cuserfamilyname,
            cidentificator,
            norganizationkey,
            nuserkey,
        } = this.state;
        return (
            <aside className="filter mt-2">
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                name="cuserfamilyname"
                                value={cuserfamilyname}
                                onChange={this.onChange}
                                placeholder="фамилия"
                            />
                            <input
                                className="form-control"
                                type="search"
                                name="cuserfirstname"
                                value={cuserfirstname}
                                placeholder="имя"
                                onChange={this.onChange}
                            />
                            <input
                                className="form-control"
                                type="search"
                                name="cusersurname"
                                value={cusersurname}
                                placeholder="отчество"
                                onChange={this.onChange}
                            />
                            <input
                                className="form-control"
                                type="search"
                                name="cidentificator"
                                value={cidentificator}
                                placeholder="идентификатор (логин)"
                                onChange={this.onChange}
                            />
                            {isAdmin ?
                                <select
                                    className="form-control"
                                    name="norganizationkey"
                                    value={norganizationkey}
                                    onChange={this.handleSelectChange.bind(this)}

                                >
                                    <option value="0">Все организации</option>
                                    {this.props.organizations.map((organization, index) =>
                                        <option
                                            key={organization.nelementkey}
                                            value={organization.nelementkey}
                                        >
                                            {organization.celementname}
                                        </option>
                                    )}
                                </select>
                                :
                                ''
                            }
                            <select
                                className="form-control"
                                name="nuserkey"
                                value={nuserkey}
                                onChange={this.handleSelectChange.bind(this)}

                            >
                                <option value="0">Все номера (№)</option>
                                {this.props.users.map((user, index) =>
                                    <option
                                        className="form-control"
                                        value={user.nuserkey}
                                        key={user.nuserkey}
                                    >
                                        {user.nuserkey}
                                    </option>
                                )}
                            </select>
                            <span className="input-group-btn">
                                <input
                                    className="btn btn-primary"
                                    type="submit"
                                    value="поиск"
                                />
                            </span>
                        </div>
                    </form>
                    <div className="mt-2">
                        <button id="addButton" className="btn btn-success" type="button" data-toggle="modal"
                                data-target="#addWindow">добавить пользователя
                        </button>
                    </div>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations.organizations,
    users: state.users.users,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});
export default connect(mapStateToProps, {searchUsers, getUsers})(SearchUsersForm);