import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";
import {connect} from "react-redux";
import {login} from "../../actions/auth";
import {compose} from "redux";
import {Redirect} from "react-router-dom";
import {getLabelName} from "../../utils/getLabelName";
import {getTextFieldType} from "../../utils/getTextFieldType";
import {authValidate} from "../../utils/authValidate";
import Alert from '@material-ui/lab/Alert';

class Login extends Component  {
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
        isAuthenticated: PropTypes.bool,
        classes: PropTypes.object.isRequired,
    };

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({errors: authValidate(this.state)})

        if (!this.state.errors.cidentificator && !this.state.errors.cpassword) {
            this.props.login(this.state.cidentificator, this.state.cpassword);
            // this.props.listening()
        }
    };

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/home" />;
        }

        const { classes } = this.props;

        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Авторизация
                    </Typography>
                    <form onSubmit={this.onSubmit} className={classes.form} noValidate>
                        {Object.keys(this.state).map((keyName) =>
                            keyName !== "errors" ? (
                                <TextField
                                error={!!this.state.errors[keyName]}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                type={getTextFieldType(keyName)}
                                key={keyName}
                                id={keyName}
                                label={getLabelName(keyName)}
                                name={keyName}
                                onChange={this.onChange}
                                helperText={this.state.errors[keyName]}
                                />
                        ): "")}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Войти
                        </Button>
                        {this.props.authErrors.message ?
                            <Alert variant="filled" severity="error">
                                {this.props.authErrors.message}!
                            </Alert>
                            :
                            ''
                        }
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    authErrors: state.authErrors.authErrors
});

export default compose(
    connect(mapStateToProps, { login }),
    withStyles(styles)
)(Login)
