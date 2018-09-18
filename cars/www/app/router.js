import React from "react";
import App from "./containers/App.js"

import { Router , Route , Switch } from "dva/router";

import Index from "./containers/Index.js";
import Carlist from "./components/buy/CarList/CarList.js";
import Zhuanjia from "./components/buy/zhuanjia/Zhuanjia.js";
import Yunqi from "./components/buy/yunqi/Yunqi.js";

import AdminProFile from "./components/admins/AdminProFile/AdminProFile.js";
export default ({history,app})=>{
    return <Router history={history}>
        <Switch>
            <Route exact path="/" component = {Index}></Route>
            <Route exact path="/buy/carlist" component = {Carlist}></Route>
            <Route exact path="/buy/zhuanjia" component = {Zhuanjia}></Route>
            <Route exact path="/buy/yunqi" component = {Yunqi}></Route>
            <Route exact path="/admin/profile" component = {AdminProFile}></Route>
        </Switch>
    </Router>


}