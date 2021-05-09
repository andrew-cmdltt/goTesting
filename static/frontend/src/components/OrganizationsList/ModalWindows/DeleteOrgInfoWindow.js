import React, {Component} from "react";
import PropTypes from "prop-types";
import {deleteOrganization} from "../../../actions/organizations";
import {connect} from "react-redux";

class DeleteOrgInfoWindow extends Component {
    static propTypes = {
        deleteOrganization: PropTypes.func.isRequired
    };

    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить организацию?</h4>
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
                                data-dismiss="modal"
                                onClick={this.props.deleteOrganization.bind(this, this.props.organizationId)}
                            >
                                УДАЛИТЬ
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations.organizations,
});

export default connect(mapStateToProps, { deleteOrganization })(DeleteOrgInfoWindow);