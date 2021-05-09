import React, {Component} from "react";
class EditButtonsBlock extends Component {
    render() {
        return (
            <div className="buttons_block modal-footer">
                <button id="addButton" className="btn btn-success" type="button" data-toggle="modal"
                        data-target="#addQuestionWindow">добавить вопрос к тесту
                </button>
                <button id="scalButton" className="btn btn-success" type="button" data-toggle="modal"
                        data-target="#scalWindow">настройка шкал
                </button>
            </div>
        )
    }
}
export default EditButtonsBlock