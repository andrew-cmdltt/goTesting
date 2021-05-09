import React, {Component} from "react";
import PropTypes from "prop-types";
import {editOrganization} from "../../../actions/organizations";
import {connect} from "react-redux";
import {resetUpdateOrganizationErrors} from "../../../utils/resetUpdateOrganizationErrors";

class ChangeOrgInfoWindow extends Component {
    state = {
        savedId: 0,
        celementname: '',
        nparentkey: 300,
    };
    static propTypes = {
        editOrganization: PropTypes.func.isRequired,
    };
    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {celementname, nparentkey} = this.state
        const organization = {celementname, nparentkey}
        this.props.editOrganization(organization, this.state.savedId);
    };
    render() {
        if (this.props.organization.nelementkey) {
            resetUpdateOrganizationErrors(this.props.updateOrganizationErrors)
            this.state = this.props.organization
            this.state.savedId = this.props.organizationId
            this.props.organization.nelementkey = null
        }

        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Информация об организации:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="celementname" className="form-control-label">
                                        Название:
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="celementname"
                                        onChange={this.onChange}
                                        value={this.state.celementname || ''}
                                    />
                                    {this.props.updateOrganizationErrors.celementname ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.updateOrganizationErrors.celementname}
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nparentkey" className="form-control-label">
                                        Тип организации:
                                    </label>
                                    <select
                                        className="form-control"
                                        name="nparentkey"
                                        value={this.state.nparentkey || ''}
                                        onChange={this.handleSelectChange.bind(this)}
                                    >
                                        <option value="300">ЯО</option>
                                        <option value="310">Учебная</option>
                                    </select>
                                    {this.props.updateOrganizationErrors.nparentkey ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.updateOrganizationErrors.nparentkey}
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена
                                    </button>
                                </div>
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
    updateOrganizationErrors: state.updateOrganizationErrors.updateOrganizationErrors,
});

export default connect(mapStateToProps, {editOrganization})(ChangeOrgInfoWindow);