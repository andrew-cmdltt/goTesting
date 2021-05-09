import React, {Component} from "react";
import PropTypes from "prop-types";
import {getUserIdBySurname} from "../../utils/getUserIdBySurname";
import {getTestIdByTitle} from "../../utils/getTestIdByTitle";
import {setZeroToNotIndicated} from "../../utils/setZeroToNotIndicated";
import {connect} from "react-redux";
import {searchResults, getResults} from "../../actions/results";

class ResultsSearchForm extends Component {
    state = {
        test: '',
        user: '',
        date_start: 'дд.мм.гггг',
        date_end: 'дд.мм.гггг',
    };

    static propTypes = {
        searchResults: PropTypes.func.isRequired,
        getResults: PropTypes.func.isRequired,
    };

    onChange = (e) => {
        this.setState({...this.state, [e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        let {
            test,
            user,
            date_start,
            date_end
        } = this.state;

        test = getTestIdByTitle(this.props.tests, test)

        let params = [
            test,
            user,
            date_start,
            date_end
        ]
        
        params = setZeroToNotIndicated(params)

        if (params === '0/0/дд.мм.гггг/дд.мм.гггг' || !date_start && !date_end) {
            this.props.getResults();
        } else {
            params = {
                test,
                user,
                date_start,
                date_end
            }
            console.log(params)
            this.props.searchResults(params);
        }
    };

    render() {
        const {
            test,
            user,
            date_start,
            date_end
        } = this.state;
        return (
            <aside className="filter mt-2">
                <div>
                    <form className="mb-2" onSubmit={this.onSubmit}>
                        <div className="input-group">
                            <input
                                className="form-control"
                                type="search"
                                name="test"
                                value={test}
                                onChange={this.onChange}
                                placeholder="по тесту"
                            />
                            <input
                                style={{
                                    borderRadius: ".25rem",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0"
                                }}
                                className="form-control"
                                type="search"
                                name="user"
                                value={user}
                                onChange={this.onChange}
                                placeholder="по фамилии пользователя"/>

                            <span className="input-group-text"
                                  style={{
                                      borderLeft: "1px solid rgba(0,0,0,.15)",
                                      borderRadius: ".25rem",
                                      borderTopRightRadius: "0",
                                      borderBottomRightRadius: "0"
                                  }}>
                                        дата с:
                                    </span>
                            <input style={{padding: "0 .75rem"}}
                                   className="form-control"
                                   type="date"
                                   name="date_start"
                                   value={date_start}
                                   onChange={this.onChange}
                            />

                            <span className="input-group-text">
                                        дата по:
                                    </span>
                            <input style={{padding: "0 .75rem"}}
                                   className="form-control"
                                   type="date"
                                   name="date_end"
                                   value={date_end}
                                   onChange={this.onChange}
                            />
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
            </aside>
        )
    }
}

const mapStateToProps = (state) => ({
    tests: state.tests.tests,
    users: state.users.users,
});
export default connect(mapStateToProps, {searchResults, getResults})(ResultsSearchForm);