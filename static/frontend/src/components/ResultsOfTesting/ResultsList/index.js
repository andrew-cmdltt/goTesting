import React, {Component} from "react";
import {returnResult} from "../../../utils/returnResult";
const dateFormat = require('dateformat')
const randomstring = require("randomstring");
class ResultsList extends Component {
    render() {
        return this.props.results.map((result, index) =>
            <tr key={randomstring.generate()}>
                <td>
                    <a href="">
                        {result.testname}
                    </a>
                </td>
                <td>
                    {result.fio}
                </td>
                <td>{dateFormat(result.datestart, "UTC:dd.mm.yyyy")}</td>
                <td>{dateFormat(result.dateend, "UTC:hh.MM.ss")}</td>
                <td>{result.pollballs}</td>
                <td>{result.maxballs}</td>
                <td>
                    <div className="progress">
                        <div
                            className={returnResult(result.pollballs, result.maxballs)[0]}
                            role="progressbar"
                            style={{
                                width: returnResult(result.pollballs, result.maxballs)[1],
                                color: 'black',
                            }}
                            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        </div>
                    </div>
                    {
                        returnResult(
                            result.pollballs,
                            result.maxballs
                        )[2] + '%'
                    }
                </td>
            </tr>
        )
    }
}

export default ResultsList