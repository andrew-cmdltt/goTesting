import React, {Component} from 'react';
import PropTypes from "prop-types";
import {editTest, getTest} from "../../../actions/tests";
import {connect} from "react-redux";

class EditScaleWindow extends Component {
    state = {
        isChangeState: true,
        savedId: 0,
        nmin1: 0,
        nmin2: 0,
        nmin3: 0,
        nmin4: 0,
        nmin5: 0,
        nmax1: 0,
        nmax2: 0,
        nmax3: 0,
        nmax4: 0,
        nmax5: 0,
        cvalue1: '',
        cvalue2: '',
        cvalue3: '',
        cvalue4: '',
        cvalue5: ''
    };
    static propTypes = {
        editTest: PropTypes.func.isRequired,
        getTest: PropTypes.func.isRequired,
        tests: PropTypes.array.isRequired,
    };

    onChange = (e) => {
        const string_values = [
            "cvalue1",
            "cvalue2",
            "cvalue3",
            "cvalue4",
            "cvalue5"
        ]
        if (string_values.indexOf(e.target.name) > -1) {
            this.setState({...this.state, [e.target.name]: e.target.value});
        } else {
            this.setState({...this.state, [e.target.name]: Number(e.target.value)});
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            nmin1,
            nmin2,
            nmin3,
            nmin4,
            nmin5,
            nmax1,
            nmax2,
            nmax3,
            nmax4,
            nmax5,
            cvalue1,
            cvalue2,
            cvalue3,
            cvalue4,
            cvalue5
        } = this.state
        const test = {
            nmin1,
            nmin2,
            nmin3,
            nmin4,
            nmin5,
            nmax1,
            nmax2,
            nmax3,
            nmax4,
            nmax5,
            cvalue1,
            cvalue2,
            cvalue3,
            cvalue4,
            cvalue5
        };
        this.props.editTest(test, this.state.savedId);
    };
    render() {
        if (this.props.test.test_id) {
            this.state = this.props.test
            this.state.savedId = this.props.testId
            this.props.test.test_id = null
        }

        return (
            <div className="modal fade" id="scalWindow" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document" style={{maxWidth: "1000px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Настройка шкал:</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="row">
                                                <h5>Шкала 1</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">шкала позиционируется в интервале</div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">от</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmin1"
                                                            value={this.state.nmin1 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">до</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmax1"
                                                            value={this.state.nmax1 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="cvalue1"
                                                        value={this.state.cvalue1 || ''}
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="row">
                                                <h5>Шкала 2</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">шкала позиционируется в интервале</div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">от</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmin2"
                                                            value={this.state.nmin2 ||  0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">до</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmax2"
                                                            value={this.state.nmax2 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="cvalue2"
                                                        value={this.state.cvalue2 || ''}
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="row">
                                                <h5>Шкала 3</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">шкала позиционируется в интервале</div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">от</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmin3"
                                                            value={this.state.nmin3 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">до</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmax3"
                                                            value={this.state.nmax3 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="cvalue3"
                                                        value={this.state.cvalue3 || ''}
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="row">
                                                <h5>Шкала 4</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">шкала позиционируется в интервале</div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">от</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmin4"
                                                            value={this.state.nmin4 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">до</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmax4"
                                                            value={this.state.nmax4 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="cvalue4"
                                                        value={this.state.cvalue4 || ''}
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="row">
                                                <h5>Шкала 5</h5>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">шкала позиционируется в интервале</div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">от</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmin5"
                                                            value={this.state.nmin5 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="input-group">
                                                        <span className="input-group-text">до</span>
                                                        <input
                                                            className="form-control"
                                                            type="number"
                                                            name="nmax5"
                                                            value={this.state.nmax5 || 0}
                                                            onChange={this.onChange}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-12">
                                                    <textarea
                                                        name="cvalue5"
                                                        value={this.state.cvalue5 || ''}
                                                        onChange={this.onChange}
                                                        className="form-control"
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-success mr-auto">Сохранить</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tests: state.tests.tests,
});
export default connect(mapStateToProps, {editTest, getTest})(EditScaleWindow);