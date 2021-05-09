import React, {Component} from "react";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {editUser} from '../../../actions/users';

class ChangeUserInfoWindow extends Component {
    state = {
        cuserfamilyname: '',
        cidentificator: '',
        cuserfirstname: '',
        cusersurname: '',
        norganizationkey: 0,
        nusertypekey: 533,
        cpassword: '',
    };
    static propTypes = {
        editUser: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            cidentificator,
            cuserfamilyname,
            nusertypekey,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            cpassword
        } = this.state;

        const user = {
            cidentificator,
            cuserfamilyname,
            nusertypekey,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            cpassword,
        };
        this.props.editUser(user, this.state.savedId);
    };

    render() {
        let isAdmin
        if (this.props.isAuthenticated) {
            isAdmin = this.props.auth.user.nusertypekey === 533
        }
        if (this.props.user.nuserkey) {
            this.state = this.props.user
            this.state.savedId = this.props.userId
            this.props.user.nuserkey = null
        }
        const {            
            cidentificator,
            cuserfamilyname,
            nusertypekey,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            cpassword
        } = this.state;

        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Индивидуальная карта пользователя:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="cidentificator" className="form-control-label">Идентификатор
                                        (логин):</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="cidentificator"
                                        onChange={this.onChange}
                                        value={cidentificator || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="сpassword" className="form-control-label">Пароль:</label>
                                    <input
                                        type="password"
                                        className="form-control border-dark"
                                        name="cpassword"
                                        onChange={this.onChange}
                                        value={cpassword || ''}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cuserfamilyname" className="form-control-label">Фамилия:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cuserfamilyname"
                                        onChange={this.onChange}
                                        value={cuserfamilyname || ''}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cuserfirstname" className="form-control-label">Имя:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cuserfirstname"
                                        onChange={this.onChange}
                                        value={cuserfirstname || ''}

                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cusersurname" className="form-control-label">Отчество:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cusersurname"
                                        onChange={this.onChange}
                                        value={cusersurname || ''}
                                    />
                                </div>
                                {isAdmin ?
                                    <div className="form-group">
                                        <label htmlFor="norganizationkey"
                                               className="form-control-label">Организация:</label>
                                        <select value={norganizationkey || 0}
                                                onChange={this.handleSelectChange.bind(this)}
                                                className="form-control"
                                                name="norganizationkey"
                                                >
                                            <option value="0">Не указано</option>
                                            {this.props.organizations.map((organization, index) =>
                                                <option
                                                    key={organization.nelementkey}
                                                    value={organization.nelementkey}
                                                >
                                                    {organization.celementname}
                                                </option>
                                            )}
                                        </select>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations.organizations,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});
export default connect(mapStateToProps, {editUser})(ChangeUserInfoWindow);