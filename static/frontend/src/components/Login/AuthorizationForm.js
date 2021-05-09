import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import {getCourses} from "../../actions/courses";
import {listening} from "../../actions/courses";
import {authValidate} from "../../utils/authValidate";

class AuthorizationForm extends Component {
    state = {
        cidentificator: '',
        cpassword: '',
        errors: {
            cidentificator: "",
            cpassword: ""
        }
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        getCourses: PropTypes.func.isRequired,
        listening: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.getCourses()
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({errors: authValidate(this.state)})

        console.log(this.state.errors)

        if (!this.state.errors.cidentificator && !this.state.errors.cpassword) {
            this.props.login(this.state.cidentificator, this.state.cpassword);
            this.props.listening()
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/home" />;
        }

        const { cidentificator, cpassword } = this.state;
        return (
            <form onSubmit={this.onSubmit} className="form">
                <div className="form-group">
                    <label htmlFor="login" className="control-label_settings">Идентификатор учетной записи:</label>
                    <input
                        name="cidentificator"
                        type="text"
                        id="login"
                        className="form-control"
                        placeholder="идентификатор, выданный организацией"
                        onChange={this.onChange}
                        value={cidentificator}
                    />
                </div>
                {this.state.errors.cidentificator ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.errors.cidentificator}
                    </div>
                    :
                    ''
                }
                <div className="form-group">
                    <label htmlFor="password" className="control-label_settings">Пароль</label>
                    <input
                        name="cpassword"
                        type="password"
                        id="cpassword"
                        className="form-control"
                        placeholder="пароль"
                        onChange={this.onChange}
                        value={cpassword}
                    />
                </div>
                {this.state.errors.cpassword ?
                    <div className="alert alert-danger" role="alert">
                        {this.state.errors.cpassword}
                    </div>
                    :
                    ''
                }
                    <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block btn-lg">Войти</button>
                </div>
                {this.props.authErrors.message ?
                    <div className="alert alert-danger" role="alert">
                        {this.props.authErrors.message}
                    </div>
                    :
                    ''
                }
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    courses: state.courses.courses,
    authErrors: state.authErrors.authErrors
});

export default connect(mapStateToProps, { login, getCourses, listening })(AuthorizationForm);