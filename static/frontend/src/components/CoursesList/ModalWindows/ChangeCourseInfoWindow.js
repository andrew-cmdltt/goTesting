import React, {Component} from "react";
import PropTypes from "prop-types";
import {editCourse} from "../../../actions/courses";
import {connect} from "react-redux";
import {resetUpdateCourseErrors} from "../../../utils/resetUpdateCourseErrors";

class ChangeCourseInfoWindow extends Component {
    state = {
        name: '',
        savedId: 0,
        description: '',
        organization: 0
    }
    static propTypes = {
        editCourse: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
    };
    handleSelectChange(event) {
        this.setState({...this.state, [event.target.name]: Number(event.target.value)});
    }

    onChange = (e) => this.setState({...this.state, [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        const {name, description, organization} = this.state;
        const course = {name, description, organization};
        this.props.editCourse(course, this.state.savedId);
    };


    render() {
        if (this.props.course.id) {
            resetUpdateCourseErrors(this.props.updateCourseErrors)
            this.state = this.props.course
            this.state.savedId = this.props.courseId
            this.props.course.id = null
        }

        const {name, description, organization} = this.state;
        return (
            <div className="modal fade" id="changeWindow" tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="exampleModalLabel">Информация о курсе:</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <form onSubmit={this.onSubmit}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-control-label">Название:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="name"
                                        value={name}
                                        onChange={this.onChange}
                                    />
                                    {this.props.updateCourseErrors.name ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.updateCourseErrors.name}
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-control-label">Описание:</label>
                                    <input
                                        type="text"
                                        className="form-control border-dark"
                                        name="description"
                                        value={description}
                                        onChange={this.onChange}
                                    />
                                    {this.props.updateCourseErrors.description ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.updateCourseErrors.description}
                                        </div>
                                        :
                                        ''
                                    }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="organization" className="form-control-label">
                                        Учебная организация:
                                    </label>
                                    <select
                                        value={organization}
                                        onChange={this.handleSelectChange.bind(this)}
                                        className="form-control"
                                        name="organization"
                                    >
                                        <option value="0">Не указано</option>
                                        {this.props.organizations.map((organization, index) =>
                                            <option
                                                key={organization.nelementkey}
                                                value={organization.nelementkey}
                                            >
                                                {organization.celementname}
                                            </option>
                                        )}

                                    </select>
                                    {this.props.updateCourseErrors.organization ?
                                        <div className="alert alert-danger" role="alert">
                                            {this.props.updateCourseErrors.organization}
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
    updateCourseErrors: state.updateCourseErrors.updateCourseErrors
});

export default connect(mapStateToProps, {editCourse})(ChangeCourseInfoWindow);