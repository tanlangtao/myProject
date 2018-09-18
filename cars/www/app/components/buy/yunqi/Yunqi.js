import React, { Component } from 'react';
import Buy from "../../../containers/Buy.js";
export default class Zhuanjia  extends Component {


    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Buy c="运气选车" k="yunqi">
                <div>
                    <h1>运气选车</h1>
                </div>
            </Buy>
        );
    }
}

