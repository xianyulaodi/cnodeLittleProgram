/*
* @Author: xianyulaodi
* @Date:   2017-01-16 17:33:45
*/

Page({
    data: {
        userInfo: {
            nickName: '咸鱼老弟',
            avatarUrl: 'http://images2015.cnblogs.com/blog/776370/201609/776370-20160914124035805-437895007.png'
        }
    },

    // 获取用户信息
    getUserInfo () {
        let that = this;
        wx.getUserInfo({
            success (res) {
                console.log(res)
                that.setData({ userInfo: res.userInfo })
            }
        })
    },

    onLoad (params) {
        wx.login({
            success (res) {
                if (res.code) {
                    console.log('登录成功！' + res.code)
                } else {
                    console.error('获取用户登录态失败！' + res.errMsg)
                }
            }
        })
    }

})
