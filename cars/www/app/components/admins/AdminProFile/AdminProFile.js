import React from 'react';
import CutBox from "./CutBox.js";
import "./AdminProFile.less";
import Admin from "../../../containers/Admin.js";
export default class AdminProFile extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            imgW:0,
            imgH:0,
            boxW:0,
            boxH:0,
            padding:0,
            realW:0,
            realH:0,
            picurl:"",
            isShowxuanfu:false
        }
        var self = this;
        window.openXuanfu = function(){
            self.setState({
                isShowxuanfu:true
            })
        };
        window.closeXuanfu = function(){
            self.setState({
                isShowxuanfu:false
            })
            // 当关闭弹出层的时候,通过页面中的img会重新发起src请求。
            $(self.refs.xiaodianshi).attr("src","../../../htmlPage/adminavatarform.html");
        };
        // 图片上传完毕之后的回调
        window.onUpDone = function(picurl,realW,realH){

            var realW = parseInt(realW);
            var realH = parseInt(realH);
            // 得到图片的比例
            var rate = realW / realH;
            // 定义一些常量
            const maxBoxWidth = 700;
            const minBoxWidth = 450;
            const maxBoxHeight = 500;
            const minBoxHeight = 350;
            const padding = 10;
            const rightPart = 180;
            // 计算图片显示的宽度和高度
            var imgW = realW;
            var imgH = realH;
            // 进行一些判断和计算
            if ( realW > maxBoxWidth - rightPart - 2 * padding) {

                    imgW = maxBoxWidth - rightPart - 2 * padding;
                    // 显示图片的高度
                    imgH = imgW / rate;
            };
            if( imgH > maxBoxHeight - 2 * padding ){

                    imgH =  maxBoxHeight - 2 * padding;
                    // 显示图片的宽度
                    imgW = imgH * rate;
            };
            // 决定弹出层的尺寸
            var boxW = imgW + rightPart + 2 * padding;
            var boxH = imgH + 2 * padding;
            // 验收最小值的时候
            if( boxW < minBoxWidth){
                boxW = minBoxWidth;
            };
            if( boxH < minBoxHeight){
                boxH = minBoxHeight;
            };
            // 设置state
            self.setState({
                imgW,
                imgH,
                boxW,
                boxH,
                padding,
                realW,
                realH,
                picurl
            })
        }
    }

    render() {
        return (
            <Admin c="管理员头像" k="profile">
                <div>
                    <iframe src="../../../htmlPage/adminavatarform.html" ref = "xiaodianshi" frameBorder="0" height="300px"></iframe>
                    {
                        this.state.isShowxuanfu
                        ?
                        <div className="xuanfuceng">
                            <CutBox
                                imgW = { this.state.imgW }
                                imgH = { this.state.imgH }
                                boxW = { this.state.boxW }
                                boxH = { this.state.boxH }
                                padding = { this.state.padding }
                                realW = { this.state.realW }
                                realH = { this.state.realH }
                                picurl = { this.state.picurl }
                            >
                            </CutBox>
                        </div>
                        :
                        null
                    }
                </div>
            </Admin>
        );
    }
}
