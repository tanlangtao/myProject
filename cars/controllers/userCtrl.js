var path = require("path");
var Admin = require("../models/Admin.js");
var formidable = require("formidable");
var gm = require("gm");
exports.up = function(req,res){
    var form = new formidable.IncomingForm();
    //文件上传路径
    form.uploadDir = path.resolve(__dirname,"../www/uploads");
    //设置文件的拓展名
    form.keepExtensions = true;
    //获取文件的信息
    form.parse(req,function(err,fields,files){
        var base = path.parse(files.adminavatar.path).base;
        gm(path.resolve(__dirname,"../www/uploads/"+base))
        // size用来获取图片的尺寸的。
        .size(function(err,size){
            // console.log(size.height,size.width);
            // 上传之后屏幕上显示内容
            res.send("<script type='text/javascript'>window.parent.onUpDone('"+base+"',"+size.width+","+size.height+")</script>")
        });
    })
};
// 裁切图片
exports.docut = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,{w,h,l,t,picurl},files){
        gm(path.resolve(__dirname,"../www/uploads/"+picurl))
        .crop(w,h,l,t)
        .write(path.resolve(__dirname,"../www/avatars/"+picurl),function(){
            // 改变管理员的数据库
            Admin.update({
                "email":"huang@163.com"
            },{
                "$set":{
                    "avatar":picurl
                }
            },function(){
              res.json({
                "result":1
              })
            })
        })
    })
}

// 获取裁切完毕的头像
exports.getAvatar = function(req,res){
    // 读数据库
    Admin.find({"email":"huang@163.com"},function(err,docs){
        // 头像
        if(docs[0].avatar){
            var avatar = path.resolve(__dirname,"../www/avatars/"+ docs[0].avatar)
        }else{
            var avatar = path.resolve(__dirname,"../www/avatars/defaultAvatar.jpg");
        }

        // 直接返回头像的本身
        // sendFile发送的是信息本身
        res.sendFile(avatar)
    })
}