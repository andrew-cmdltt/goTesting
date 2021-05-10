import React, {Component} from "react";
import {logout} from '../../actions/auth';
import {connect} from "react-redux";
import PropTypes from "prop-types"
import {getUserAccessType} from "../../utils/getUserAccessType";
class PersonalCard extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        let fullName = localStorage.full_name
        let userAccessType = localStorage.nusertypekey
        return (
            <section className="col-md-4">
                <aside className="card text-white bg-dark mb-3 card__none-radius">
                    <header className="card-header">
                        <h5 className="card-title text-center card-title__text">Индивидуальная карта</h5>
                    </header>
                    <footer className="card-body">
                        <h6 className="card-title"> {fullName}:</h6>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item bg-dark">
                                Тип пользователя: {getUserAccessType(userAccessType)}
                            </li>
                        </ul>
                        <div className="card-body">
                            <button onClick={this.props.logout} className="btn btn-primary">
                                Выйти
                            </button>
                        </div>
                    </footer>
                </aside>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(PersonalCard);
