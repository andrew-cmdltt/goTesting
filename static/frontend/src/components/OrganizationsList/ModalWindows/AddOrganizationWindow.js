import React, {Component} from 'react';
import PropTypes from "prop-types";
import {addOrganization} from "../../../actions/organizations";
import {connect} from "react-redux";

class AddOrganizationWindow extends Component {
    state = {
        celementname: '',
        nparentkey: 0,
    };
    static propTypes = {
        addOrganization: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({[event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    onSubmit = (e) => {
        e.preventDefault();
        const {celementname, nparentkey} = this.state
        const organization = {celementname, nparentkey}
        this.props.addOrganization(organization);
        this.setState({
            celementname: '',
            nparentkey: 0,
        });
    };
    render() {
        const {celementname, nparentkey} = this.state

        return (
            <div className="modal fade" id="addWindow" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Добавление новой учебной организации</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-header">
                            <h6 id="titleOrgName">Пожалуйста, укажите название учебной организации</h6>
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
                                        value={celementname}
                                    />
                                    {this.props.addOrganizationErrors.celementname ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.addOrganizationErrors.celementname}
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
                                        id="nparentkey"
                                        value={nparentkey}
                                        onChange={this.handleSelectChange.bind(this)}
                                    >
                                        <option value="300">ЯО</option>
                                        <option value="310">Учебная</option>
                                    </select>
                                    {this.props.addOrganizationErrors.nparentkey ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.addOrganizationErrors.nparentkey}
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
    addOrganizationErrors: state.addOrganizationErrors.addOrganizationErrors,
});

export default connect(mapStateToProps, { addOrganization })(AddOrganizationWindow);