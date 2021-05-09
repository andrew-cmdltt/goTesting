import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addUser} from '../../../actions/users';

class AddUserWindow extends Component {
    state = {
        cuserfamilyname: '',
        cidentificator: '',
        cuserfirstname: '',
        cusersurname: '',
        norganizationkey: 0,
        nusertypekey: 531,
        cpassword: ''
    };

    static propTypes = {
        addUser: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            cuserfamilyname,
            cidentificator,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            nusertypekey,
            cpassword
        } = this.state;
        const user = {
            cuserfamilyname,
            cidentificator,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            nusertypekey,
            cpassword
        };
        if (this.props.auth.user.nusertypekey === 533) {
            user.nusertypekey = 532
        }
        if (this.props.auth.user.nusertypekey === 532) {
            user.norganizationkey = this.props.auth.user.norganizationkey
        }

        user.norganizationkey = Number(user.norganizationkey)

        this.props.addUser(user);
        this.setState({
            cuserfamilyname: '',
            cidentificator: '',
            cuserfirstname: '',
            cusersurname: '',
            norganizationkey: 0,
            cpassword: ''
        });
    };

    render() {
        let isAdmin
        if (this.props.isAuthenticated) {
            isAdmin = this.props.auth.user.nusertypekey === 533
        }
        const {
            cuserfamilyname,
            cidentificator,
            cuserfirstname,
            cusersurname,
            norganizationkey,
            cpassword,
        } = this.state
        return (
            <div className="modal fade" id="addWindow" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Добавление нового пользователя</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-header">
                            <h6 id="fio">Пожалуйста, укажите данные пользователя</h6>
                        </div>
                        <form action='/' onSubmit={this.onSubmit}>
                            <div className="modal-body">

                                <div className="form-group">
                                    <label htmlFor="cidentificator" className="form-control-label">Идентификатор
                                        (логин):</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="cidentificator"
                                        onChange={this.onChange}
                                        value={cidentificator}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpassword" className="form-control-label">Пароль:</label>
                                    <input
                                        type="password"
                                        className="form-control border-dark"
                                        name="cpassword"
                                        onChange={this.onChange}
                                        value={cpassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cuserfamilyname" className="form-control-label">Фамилия:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cuserfamilyname"
                                        value={cuserfamilyname}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cuserfirstname" className="form-control-label">Имя:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cuserfirstname"
                                        value={cuserfirstname}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cusersurname" className="form-control-label">Отчество:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="cusersurname"
                                        value={cusersurname}
                                        onChange={this.onChange}
                                    />
                                </div>
                                {isAdmin ?
                                    <div className="form-group">
                                        <label htmlFor="norganizationkey"
                                               className="form-control-label">Организация:</label>
                                        <select
                                            value={norganizationkey}
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
export default connect(mapStateToProps, {addUser})(AddUserWindow);