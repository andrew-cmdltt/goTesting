import React, {Component} from "react";
class Checkbox extends Component {
    render() {
        return (
            <div className="row mb-5 mt-5">
                <div className="col-md-12">
                    <p style={{fontSize: "110%"}}>Вопрос: 1 / 2</p>
                    <hr/>
                        <h2 style={{fontSize: "30px"}}>Почему волк слабее льва и тигра, но не выступает в цирке? </h2>
                </div>
                <div className="col-md-12">
                    <div className="form-check">
                        <label htmlFor="answer1" className="form-check-label" style={{fontSize: "20px"}}>
                            <input name="answer1" type="checkbox" className="form-check-input" id="answer1"/>
                                Не знаю
                        </label>
                    </div>
                    <div className="form-check">
                        <label htmlFor="answer4" className="form-check-label" style={{fontSize: "20px"}}>
                            <input name="answer4" type="checkbox" className="form-check-input" id="answer4"/>
                                Знаю, но не скажу
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}
export default Checkbox