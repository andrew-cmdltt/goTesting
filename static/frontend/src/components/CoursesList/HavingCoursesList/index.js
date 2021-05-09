import React, {Component} from "react";
import PropTypes from "prop-types";
import {getCourse} from "../../../actions/courses";
import {getOrganizationName} from "../../../utils/getOrganizationName";
import {connect} from "react-redux";
import ChangeCourseInfoWindow from "../ModalWindows/ChangeCourseInfoWindow";
import DeleteCourseInfo from "../ModalWindows/DeleteCourseInfo";

class HavingCoursesList extends Component {
    static propTypes = {
        getCourse: PropTypes.func.isRequired,
        organizations: PropTypes.array.isRequired,
        courses: PropTypes.array.isRequired
    };
    render() {
        return (

            <div className="HavingCoursesList">
                <table className="table table-responsive">
                    <tbody>
                    <tr>
                        <th>№ курса</th>
                        <th>Название курса</th>
                        <th>Описание</th>
                        <th>Организация</th>
                        <th></th>
                    </tr>
                    {this.props.courses.map((course, index) =>
                    <tr key={course.id}>
                        <td><span className="badge badge-dark">{course.id}</span></td>
                        <td><span>{course.name}</span></td>
                        <td><span>{course.description}</span></td>
                        <td><span>
                            {getOrganizationName(this.props.organizations, course.organization)}
                        </span></td>
                        <td colSpan="2">
                            <button
                                type="button"
                                className="mr-2 btn btn-warning btn-sm"
                                data-toggle="modal"
                                data-target="#changeWindow"
                                onClick={this.props.getCourse.bind(this, course.id)}
                            >изменить
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                data-toggle="modal"
                                data-target="#deleteWindow"
                                onClick={this.props.getCourse.bind(this, course.id)}
                            >удалить
                            </button>
                        </td>
                    </tr>)}
                    </tbody>
                </table>
                <ChangeCourseInfoWindow
                    course={this.props.course}
                    courseId={this.props.course.id}
                    organizations={this.props.organizations}
                />
                <DeleteCourseInfo courseId={this.props.course.id} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    course: state.course.course,
});
export default connect(mapStateToProps, {getCourse})(HavingCoursesList);