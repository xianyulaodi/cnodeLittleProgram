/*
* @Author: xianyulaodi
* @Date:   2017-01-16 17:33:45
*/

// 引入这个是为了解析详情页的html
var WxParse = require('../../wxParse/wxParse.js');

Page({

    data:{
        title:'',
        loading: false,
        loadtxt: '正在加载',
        data:{}
    },
    onLoad: function(params){
        console.log(params); //这里是上一个跳转页面传过来的参数，可以直接获取
        var id=params.id;
        var self=this;//这里需要注意
        wx.request({
          url: 'https://cnodejs.org/api/v1/topic/'+id, 

          header: {
              'content-type': 'application/json'
          },
          success: function(rs) {
            console.log(rs);
            var data=rs.data.data;
            var content=data.content;
            self.setData({
                loading: true,
                loadtxt: '数据加载完成',
                data: data
            });
            /**
            * WxParse.wxParse(bindName , type, data, target,imagePadding)
            * 1.bindName绑定的数据名(必填)
            * 2.type可以为html或者md(必填)
            * 3.data为传入的具体数据(必填)
            * 4.target为Page对象,一般为this(必填)
            * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
            * 可参考此文：https://weappdev.com/t/wxparse-version0-2-html-markdown/326 -->
            */
            WxParse.wxParse('content', 'html', content, self,5);
          }
        });
    },

})