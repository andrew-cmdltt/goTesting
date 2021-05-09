import React, {PureComponent} from "react";
import {getOrganizationType} from "../../../utils/getOrganizationType";
import DeleteOrgInfoWindow from "../ModalWindows/DeleteOrgInfoWindow";
import ChangeOrgInfoWindow from "../ModalWindows/ChangeOrgInfoWindow";
import {connect} from "react-redux";
import {getOrganization} from "../../../actions/organizations";
import PropTypes from "prop-types";

class OrgList extends PureComponent {
    static propTypes = {
        getOrganization: PropTypes.func.isRequired,
    };
    render() {
        return (
            <div className="OrgList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№</th>
                        <th>Организация</th>
                        <th>Тип организации</th>
                        <th></th>
                    </tr>
                    {this.props.organizations.map((organization, index) =>
                        <tr key={organization.nelementkey}>
                            <td>
                                <span className="badge badge-dark" data-userid="1">{organization.nelementkey}</span>
                            </td>
                            <td>{organization.celementname}</td>
                            <td>
                                {getOrganizationType(organization.nparentkey)}
                            </td>
                            <td colSpan="2">
                                <button
                                    type="button"
                                    className="mr-2 btn btn-warning btn-sm"
                                    data-toggle="modal"
                                    data-target="#changeWindow"
                                    onClick={this.props.getOrganization.bind(this, organization.nelementkey)}
                                >
                                    изменить
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    data-toggle="modal"
                                    data-target="#deleteWindow"
                                    onClick={this.props.getOrganization.bind(this, organization.nelementkey)}
                                >удалить
                                </button>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <DeleteOrgInfoWindow organizationId={this.props.organization.nelementkey}/>
                <ChangeOrgInfoWindow
                    organization={this.props.organization}
                    organizationId={this.props.organization.nelementkey}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    organization: state.organization.organization,
});
export default connect(mapStateToProps, {getOrganization})(OrgList);