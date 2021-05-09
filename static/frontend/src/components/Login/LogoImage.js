import React, {Component} from "react";
import logo from "../../img/logo.png";

const static_path = '../static/frontend/static/frontend/'
class LogoImage extends Component{
    render() {
        return (
            <div className="row">
                <div className="col-md-12 text-center">
                    <a href="/">
                        <img src={static_path + logo} alt="Тестирование персонала"/>
                    </a>
                </div>
            </div>
        )
    }
}
export default LogoImage