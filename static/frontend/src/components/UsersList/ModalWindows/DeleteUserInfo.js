import React, {Component} from "react";
import {deleteUser} from "../../../actions/users";
import PropTypes from 'prop-types'
import {connect} from "react-redux";

class DeleteUserInfo extends Component {
    static propTypes = {
        deleteUser: PropTypes.func.isRequired,
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.deleteUser(this.props.userId)
    }
    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить пользователя?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вся информация будет удалена из системы. Восстановить данные невозможно.</p>
                        </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger mr-auto"
                                    onClick={this.props.deleteUser.bind(this, this.props.userId)}
                                    data-dismiss="modal"
                                >УДАЛИТЬ</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.users.users,
});

export default connect(mapStateToProps, { deleteUser })(DeleteUserInfo);