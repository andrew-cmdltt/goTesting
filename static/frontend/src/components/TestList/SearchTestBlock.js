import React, {Component} from "react";
import FoundTests from "./FoundTests";
import PropTypes from "prop-types";
import {searchTests} from "../../actions/tests";
import {getTests} from "../../actions/tests";
import {connect} from "react-redux";

class SearchTestBlock extends Component {
    state = {
        ctestname: '',
        organization: 0
    };

    static propTypes = {
        searchTests: PropTypes.func.isRequired,
        getTests: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            ctestname,
            organization
        } = this.state;

        const params = {
            ctestname,
            organization
        }

        if (!params.ctestname && !params.organization) {
            this.props.getTests();
        } else {
            this.props.searchTests(params);
        }
    };

    render() {
        const {
            ctestname,
            organization
        } = this.state;
        return (
            <section className="col-md-8">
                <aside className="filter">
                    <div className="alert alert-info ml-2">
                        <form className="mb-2 d-md-inline mr-2" onSubmit={this.onSubmit}>
                            <div className="input-group">
                                <input
                                    className="form-control"
                                    type="search"
                                    name="ctestname"
                                    placeholder="введите название теста..."
                                    value={ctestname}
                                    onChange={this.onChange}
                                />
                                <select
                                    className="form-control"
                                    name="organization"
                                    value={organization}
                                    onChange={this.handleSelectChange.bind(this)}

                                >
                                    <option value="0">Все организации</option>
                                    {this.props.organizations.map((organization, index) =>
                                        <option
                                            key={organization.nelementkey}
                                            value={organization.nelementkey}
                                        >
                                            {organization.celementname}
                                        </option>
                                    )}
                                </select>
                                <span className="input-group-btn">
                                    <input
                                        className="btn btn-primary"
                                        type="submit"
                                        value="поиск"
                                    />
                                </span>
                            </div>
                        </form>
                    </div>
                    <FoundTests
                        user={this.props.user}
                        tests={this.props.tests}
                        organizations={this.props.organizations}
                    />
                    <div className="row-pagination">
                        <nav aria-label="pagination">
                        </nav>
                    </div>
                </aside>
            </section>
        )
    }
}

const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, {searchTests, getTests})(SearchTestBlock);