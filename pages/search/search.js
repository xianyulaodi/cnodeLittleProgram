/*
* @Author: xianyulaodi
* @Date:   2017-01-16 17:33:45
*/

Page({
    data:{
        ranking:[],
        loading: false,
        loadtxt: '正在加载',
        value: '请输入搜索内容...'
    },

    onLoad: function(params){

        

    },

    deleteTxt: function(e){
        
        this.setData({
            value:'请输入搜索内容...'
        })

    },

    onFouse: function(e){

        this.setData({
            value:''
        })  

    },

    onBlue: function(){
        this.setData({
            value:'请输入搜索内容...'
        }) 
    }




})