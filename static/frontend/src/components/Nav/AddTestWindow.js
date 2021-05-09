import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addTest, getTests} from "../../actions/tests";
import {Redirect} from "react-router-dom";
import {getAddedTestId} from "../../utils/getAddedTestId";
import {shouldBeRedirected} from "../../utils/shouldBeRedirected";
import {addTestValidate} from "../../utils/addTestValidate";

class AddTestWindow extends Component {
    state = {
        nkey: 0,
        ctestname: '',
        cmessage: '',
        isRedirected: false,
        beginTestLength: 0,
        nstaffkey: 0,
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
        cvalue5: '',
        isModal: false
    };

    static propTypes = {
        addTest: PropTypes.func.isRequired,
        getTests: PropTypes.func.isRequired,
    };

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        const {
            nstaffkey,
            ctestname,
            cmessage,
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
            cvalue5,
        } = this.state;
        const test = {
            nstaffkey,
            ctestname,
            cmessage,
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
            cvalue5,
        };
        this.props.addTest(test);
        this.setState({
            ctestname: '',
            cmessage: '',
            isRedirected: true,
            beginTestLength: this.props.tests.length
        });
    };

    componentDidMount() {
        this.props.getTests()
    }

    componentDidUpdate(prevProps) {
        if (this.props.tests !== prevProps.tests) {
            this.setState({
                isRedirected: false,
                beginTestLength: 0
            })
        }
    }

    render() {
        const {ctestname, cmessage} = this.state
        let tests = this.props.tests

        if (!this.state.nstaffkey) {
            this.state.nstaffkey = this.props.userId
        }

        this.state.isModal = addTestValidate(this.state);

        if (shouldBeRedirected(this.state, tests.length)) {
            return <Redirect to={`/edit/${getAddedTestId(tests)}`}/>
        }

        return (
            <div className="modal fade" id="add-test_window" tabIndex="-1" role="dialog" style={{display: "none"}}
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document" style={{maxWidth: "1000px"}}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h6 className="modal-title">Добавление нового теста в систему:</h6>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-header">
                            <h4>Пожалуйста, заполните необходимые поля</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label
                                    htmlFor="add-test_name"
                                    className="font-weight-bold"
                                >
                                    Название теста:
                                </label>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="ctestname"
                                    onChange={this.onChange}
                                    value={ctestname}
                                    id="ctestname"
                                />
                                {this.props.addTestErrors.ctestname ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.props.addTestErrors.ctestname}
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                            <div className="form-group">
                                <label htmlFor="add-test_desc" className="font-weight-bold">Инструкция / описание к
                                    тесту:</label>
                                <textarea
                                    className="form-control"
                                    name="cmessage"
                                    onChange={this.onChange}
                                    value={cmessage}
                                    id="cmessage"
                                    cols="30"
                                    rows="10"
                                >
                                </textarea>
                                {this.props.addTestErrors.cmessage ?
                                    <div className="alert alert-danger" role="alert">
                                        {this.props.addTestErrors.cmessage}
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success mr-auto"
                                data-dismiss={this.state.isModal ? "modal" : ""}
                                onClick={this.onSubmit.bind(this) }
                            >Добавить
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
    addTestErrors: state.addTestErrors.addTestErrors
});

export default connect(mapStateToProps, {addTest, getTests})(AddTestWindow);