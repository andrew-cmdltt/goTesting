import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {importTest} from "../../../actions/tests";

class ImportWindow extends Component {
    static propTypes = {
        importTest: PropTypes.func.isRequired,
    };

    state = {
        title: '',
        content: '',
        json: null,
    }

    handleChange = (e) => {
        this.setState({
            json: e.target.files[0]
        })
    };

    onSubmit = (e) => {
        e.preventDefault()
        let form_data = new FormData();
        form_data.append('json', this.state.json, this.state.json.name);
        form_data.append('title', this.state.title);
        form_data.append('content', this.state.content);
        this.props.importTest(form_data)

    };

    render() {
        return (
            <div id="importWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Выберете JSON файл</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>
                                <input
                                    type="file"
                                    id="file"
                                    accept="text/json"
                                    onChange={this.handleChange}
                                    required
                                />
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-danger mr-auto"
                                data-dismiss="modal"
                                onClick={this.onSubmit}
                            >
                                Импортировать
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
    tests: state.tests.tests,
});

export default connect(mapStateToProps, {importTest})(ImportWindow);