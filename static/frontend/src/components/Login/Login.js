import React, {Component} from 'react';
import AuthorizationForm from "./AuthorizationForm";
import LogoImage from "./LogoImage";

class Login extends Component {
    render() {
        return (
            <div className="container" style={{
                maxWidth: 500
            }}>
                <div className="LogoImage">
                    <LogoImage/>
                </div>
                <div className="AuthorizationForm">
                    <AuthorizationForm/>
                </div>
            </div>
        )
    }
}
export default Login