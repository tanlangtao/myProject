import React from 'react';

import App from "./App.js";
export default class Index extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <App k="index">
                <div>
                    <h1>我是index组件部分的信息</h1>
                </div>
            </App>

        );
    }
}
