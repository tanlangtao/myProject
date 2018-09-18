import React from 'react';
import { connect } from "dva";
import CarFilterBox from "./CarFilterBox.js";
import CarTableBox from "./CarTableBox.js";
import PicShow from "../PicShow/PicShow.js";
import "./CarList.less";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Buy from "../../../containers/Buy.js";
class CarList extends React.Component {

    constructor(props) {
        super(props);
        props.dispatch({"type":"carlist/init"});

        this.state = {
            // 当前图集组件的 init的 ID
            nowID : 0,
            // 当前图集组件的 弹出层
            isShowXuanfu:false
        }
    }
    // 弹出层滚动时禁止body滚动
    componentWillUpdate(nextProps, nextState) {
      if(nextState.isShowXuanfu){
          document.documentElement.style.overflow="hidden";
          document.documentElement.style.height="100%";
          document.body.style.overflow="hidden";
          document.body.style.height="100%";
      }else{
        document.documentElement.style.overflow="auto";
        document.documentElement.style.height="auto";
        document.body.style.overflow="auto";
        document.body.style.height="auto";
      }
    }
    // 设置悬浮层的方法
    setXuanfu( nowID,isShowXuanfu){

      this.setState({
        nowID,
        isShowXuanfu
      })
    }
    render() {

        return (
            <Buy c="大表选车" k="carlist">
              <div>
                  <CarFilterBox></CarFilterBox>
                  <CarTableBox setXuanfu={this.setXuanfu.bind(this)}></CarTableBox>
                  {
                    this.state.isShowXuanfu
                    ?
                    <div className="xuanfu">
                      <div className="inner">
                         <span className="closeBtn" onClick={
                            ()=>{
                              this.setState({
                                isShowXuanfu:false
                              })

                              this.props.dispatch({"type":"picshow/clearCarImages"});
                            }
                         }>X</span>
                         <PicShow id={this.state.nowID}></PicShow>
                      </div>
                    </div>
                    :
                    null
                  }
              </div>
            </Buy>
        );
    }
}
export default connect()(CarList);