import React, {Component} from "react";
import PropTypes from "prop-types";
import {searchOrganizations} from "../../actions/organizations";
import {connect} from "react-redux";
import {getOrganizations} from "../../actions/organizations";

class SearchOrganizationsForm extends Component {
    state = {
        celementname: '',
        nparentkey: -1,
    };
    static propTypes = {
        searchOrganizations: PropTypes.func.isRequired,
        getOrganizations: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            celementname,
            nparentkey,
        } = this.state;

        const params = {
            celementname,
            nparentkey,
        }

        if (!params.celementname && params.nparentkey === -1) {
            this.props.getOrganizations();
        } else {
            this.props.searchOrganizations(params);
        }
    };

    render() {
        const {
            celementname,
            nparentkey,
        } = this.state;
        return (
            <aside className="filter mt-2">
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                name="celementname"
                                value={celementname}
                                onChange={this.onChange}
                                placeholder="название организации"
                            />
                            <select
                                className="form-control"
                                name="nparentkey"
                                value={nparentkey}
                                onChange={this.handleSelectChange.bind(this)}

                            >
                                <option value="-1">Все организации</option>
                                <option value="310">Учебные</option>
                                <option value="300">ЯО</option>
                            </select>
                            <span className="input-group-btn"><input className="btn btn-primary" type="submit" value="поиск"/></span>
                        </div>

                    </form>
                    <div className="mt-2">
                        <button id="addButton" className="btn btn-success" type="button" data-toggle="modal" data-target="#addWindow">добавить организацию
                        </button>
                    </div>
                </div>
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    organizations: state.organizations.organizations,
});
export default connect(mapStateToProps, {searchOrganizations, getOrganizations})(SearchOrganizationsForm);