import React, {Component} from 'react';
import AddTestWindow from "./AddTestWindow";
import MainNavBlock from "./MainNavBlock";
import PropTypes from "prop-types";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

class Nav extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        auth: PropTypes.object.isRequired,
    };

    render() {
        if (!localStorage.nuserkey) {
            return <Redirect to="/login" />;
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="MainNavBlock">
                    <MainNavBlock
                        user={localStorage.nuserkey}
                    />
                </div>
                <div className="AddTestWindow">
                    <AddTestWindow
                        userId={localStorage.nuserkey}
                        user={localStorage.user}
                    />
                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
});

export default connect(mapStateToProps)(Nav);

