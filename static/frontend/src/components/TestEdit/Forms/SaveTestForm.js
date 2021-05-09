import React, {Component} from "react";
import PropTypes from "prop-types";
import {editTest} from "../../../actions/tests";
import {connect} from "react-redux";
import {resetUpdateTestErrors} from "../../../utils/resetUpdateTestErrors";

class SaveTestForm extends Component {
    state = {
        savedId: 0,
        ctestname: '',
        cmessage: '',
    };
    static propTypes = {
        editTest: PropTypes.func.isRequired,
        tests: PropTypes.array.isRequired,
    };

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {ctestname, cmessage} = this.state
        const test = {ctestname, cmessage};
        this.props.editTest(test, this.state.savedId);
    };

    render() {
        if (this.props.test.test_id) {
            resetUpdateTestErrors(this.props.updateTestErrors)
            this.state = this.props.test
            this.state.savedId = this.props.testId
        }
        const {ctestname, cmessage} = this.state
        return (
            <form className="mb-2" onSubmit={this.onSubmit}>
                <div className="input-group">
                    <span className="input-group-text">
                        Название теста:
                    </span>
                    <input style={{fontWeight: "bold", fontSize: "110%"}}
                           type="text"
                           name="ctestname"
                           value={ctestname}
                           onChange={this.onChange}
                           placeholder="Название теста!"
                           className="form-control"
                    />
                    {this.props.updateTestErrors.ctestname ?
                        <div className="alert alert-danger" role="alert">
                            {this.props.updateTestErrors.ctestname}
                        </div>
                        :
                        ''
                    }
                    <span className="input-group-text">
                                Инструкция к тесту:
                    </span>
                    <textarea
                        style={{fontWeight: "bold", fontSize: "110%"}}
                        className="form-control"
                        name="cmessage"
                        value={cmessage}
                        onChange={this.onChange}
                        placeholder="Инструкция / описание к тесту"
                    >
                    </textarea>
                    {this.props.updateTestErrors.cmessage ?
                        <div className="alert alert-danger" role="alert">
                            {this.props.updateTestErrors.cmessage}
                        </div>
                        :
                        ''
                    }
                    <span className="input-group-btn">
                                <button style={{height: "70px", fontWeight: "bold", fontSize: "20px"}}
                                        className="btn btn-secondary"
                                        id="saveTest" type="submit">сохранить</button>
                    </span>
                </div>
            </form>
        )
    }
}

const mapStateToProps = (state) => ({
    tests: state.tests.tests,
    updateTestErrors: state.updateTestErrors.updateTestErrors
});
export default connect(mapStateToProps, {editTest})(SaveTestForm);