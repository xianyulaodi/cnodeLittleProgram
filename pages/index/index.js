/*
* @Author: xianyulaodi
* @Date:   2017-01-16 17:33:45
*/

//创建精选页面对象
Page({

    data: {
        loading: false,
        loadtxt: '正在加载',
        currentTab: 'all',
        dataList:[],
        page:1,
        section: [
            {name : '全部',tab : 'all'},
            {name : '精华',tab : 'good'},
            {name : '分享',tab : 'share'},
            {name : '问答',tab : 'ask'},
            {name : '招聘',tab : 'job'}
        ]
    },
    /*
    *@param {Number} page      页数
    *@param {String} tab       主题分类。目前有 ask share job good
    *@param {Number} limit     每一页的主题数量
    *@param {String} mdrender  当为 false 时，不渲染。默认为 true，渲染出现的所有 markdown 格式文本。
    */
    onLoad: function(){
        var self=this;//这里需要注意
        wx.request({
          url: 'https://cnodejs.org/api/v1/topics', 
          data: {
             'page':self.data.page,
             'tab':self.data.currentTab,
             'limit':10,
             'mdrender':true,
          },
          header: {
              'content-type': 'application/json'
          },
          success: function(rs) {
            var dataArr=rs.data.data;
            console.log(dataArr);
            var dataList=self.data.dataList;
            //合并数组，用于上拉加载更多,没有append方法，我这种方法不是很好，因为到后面数组会很大
            var renderArr=self.data.page==1 ? dataArr : dataList.concat(dataArr);
            self.setData({
                loading: true,
                loadtxt: '数据加载完成',
                dataList: renderArr
            })
          }
        })
    },

    // 页面上拉触底事件的处理函数，用于上拉记载更多
    onReachBottom:function(e){
        var page=this.data.page;
        // 控制一下，最多显示十页的数据
        if(page<10){
            this.setData({ page: page+1 });
            this.onLoad();
        }
        return false;
        
    },
    handleTap: function(e){
        console.log(e);
        let tab = e.currentTarget.id;
        if(tab){
            this.setData({ 
                currentTab: tab,
                page:1  //重置page为1
            })
            this.onLoad();
        }
    },
    /*
    使用wx.navigateTo或者直接使用它的组件navigator要注意：
    在app.json里面也需要pages里面的配置里要写上跳转的路径，但是在app.json里面不需要写上这个跳转的路径。
    */
    goToDetail:function(e){
        var id=e.target.id;
        // wx.navigateTo，是保留当前页面，调到应用内某个页面，使用wx.navigateBack可以返回
        wx.navigateTo({
          url: '../detail/detail?id='+id
        })
    }
})
