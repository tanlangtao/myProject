var Car = require("../models/Car.js");
var fs = require('fs');
var path = require('path');
var  formidable = require('formidable');
// 查汽车信息
exports.showCarInfo = function(req,res){
    // 得到orderID
    var orderId = req.params.orderId;

    Car.find({"id":orderId},function(err,docs){
        res.json({
            "result":docs[0]
        })
    })
}
// 查汽车图片
exports.showCarImage = function(req,res){
    // 得到orderID
    var orderId = req.params.orderId;
    // 这辆车的文件夹地址
    var picurl = path.resolve(__dirname,"../www/carimages/"+orderId);

    var view = fs.readdirSync(picurl + "/view");
    var inner = fs.readdirSync(picurl + "/inner");
    var engine = fs.readdirSync(picurl + "/engine");
    var more = fs.readdirSync(picurl + "/more");

    res.json({
        "images":{
            view,
            inner,
            engine,
            more
        }
    })
};
// 查汽车的推荐车【找相似车】
exports.showCarLike = function(req,res){
    // 得到orderID
    var orderId = req.params.orderId;

    Car.find({"id":orderId},function(err,docs){
        var brand = docs[0].brand;
        var series = docs[0].series;
        // 然后寻找和上面一样的车
        Car.find({brand,series},function(err,docs){
            res.json({
                "results":docs
            })
        })
    })
};
exports.carsearch = function(req,res){
    var form = new formidable.IncomingForm();

    form.parse(req,function(err,fields){
        // 得到前端post请求发过来的信息了。 信息是数组
        var nowfilters = fields.nowfilters;
        // 前端发过来的分页
        var pagination = fields.pagination;
        // 前端发过来的排序
        var sorter = fields.sorter;
        // 查询体
        var CHAXUNTI = {};
        nowfilters.forEach(item=>{
            CHAXUNTI[item.key] = item.value;
            if( item.key == "km"){
                item.value[0] *= 10000;
                item.value[1] *= 10000;
            };
            // 如果发过的value是范围的值
            if( item.key == "price"
                ||
                item.key == "buydate"
                ||
                item.key == "km"
                ){

                CHAXUNTI[item.key] = {
                    "$gte":Number(item.value[0]),
                    "$lte":Number(item.value[1])
                }
            };
            // 验收买车是否含牌，将中文变为boolean
            if ( item.key == "license") {
                CHAXUNTI[item.key] = item.value == "是" ? true : false;
            };
        });
        // 查询
        // 查询数据和查询数据总数
        Car.count(CHAXUNTI,function(err,total){
            Car
            .find(CHAXUNTI)
            .sort({[sorter.sortby]:sorter.sortdirection == "ascend" ? 1 : -1}) //排序
            .skip(pagination.pagesize * (pagination.page - 1)) //跳过多少条在查询
            .limit(pagination.pagesize) // 一次查询多少条
            .exec(function(err,docs){
                    res.json({
                        total,
                        "results":docs
                    })
            })
        })

    })
}