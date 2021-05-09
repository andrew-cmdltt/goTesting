import React, {Component} from "react";
import PropTypes from 'prop-types'
import {deleteCourse} from "../../../actions/courses";
import {connect} from "react-redux";

class DeleteCourseInfo extends Component {
    static propTypes = {
        deleteCourse: PropTypes.func.isRequired,
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.props.deleteCourse(this.props.courseId)
    }
    render() {
        return (
            <div id="deleteWindow" className="modal fade" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Вы действительно хотите удалить курс?</h4>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Вся информация будет удалена из системы. Восстановить данные невозможно.</p>
                        </div>

                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger mr-auto"
                                    onClick={this.props.deleteCourse.bind(this, this.props.courseId)}
                                    data-dismiss="modal"
                                >УДАЛИТЬ</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Отмена</button>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    courses: state.courses.courses,
});

export default connect(mapStateToProps, { deleteCourse })(DeleteCourseInfo);