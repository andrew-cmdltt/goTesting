import React, {Component} from "react";
import PropTypes from "prop-types";
import {searchQuestions} from "../../../actions/questions";
import {getQuestions} from "../../../actions/questions";
import {connect} from "react-redux";

class SearchQuestionForm extends Component {

    state = {
        ntestnumber: 0,
        cquestion: '',
        nkey: 0
    }

    static propTypes = {
        searchQuestions: PropTypes.func.isRequired,
        getQuestions: PropTypes.func.isRequired,
    };

    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {
            ntestnumber,
            cquestion,
            nkey
        } = this.state;

        const params = {
            ntestnumber,
            cquestion,
            nkey
        }

        if (params.cquestion || params.nkey) {
            this.props.searchQuestions(params);
        } else if (!params.cquestion && !params.nkey) {
            this.props.getQuestions(params.ntestnumber);
        }
    };

    render() {
        if (!this.state.ntestnumber) {
            this.state.ntestnumber = this.props.testId
        }

        const {
            cquestion,
            nkey
        } = this.state;

        return (
            <div>
                <form className="form-inline d-md-inline" onSubmit={this.onSubmit}>
                    <div className="input-group">
                        <input
                            className="form-control"
                            type="search"
                            name="cquestion"
                            value={cquestion}
                            onChange={this.onChange}
                            placeholder="по названию вопроса"
                        />
                        <select
                            className="form-control"
                            name="nkey"
                            value={nkey}
                            onChange={this.handleSelectChange.bind(this)}

                        >
                            <option value="0">Все номера (№)</option>
                            {this.props.questions.map((question, index) =>
                                <option
                                    className="form-control"
                                    value={question.nkey}
                                    key={question.nkey}
                                >
                                    {question.nkey}
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
        )
    }
}

const mapStateToProps = (state) => ({
    questions: state.questions.questions,
});
export default connect(mapStateToProps, {searchQuestions, getQuestions})(SearchQuestionForm);