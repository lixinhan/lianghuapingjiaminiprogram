// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
      "event":"参加河北省廊坊市第三十七届评课比赛，获得安次区第一名",
      "score":"30",
      "teacherlist":[
        {"tearcher":"张老师","tearcher_id":"123123"},
        {"tearcher":"李老师","tearcher_id":"123123"},
        {"tearcher":"刘老师","tearcher_id":"123123"},
        {"tearcher":"王老师","tearcher_id":"123123"},
        {"tearcher":"赵老师","tearcher_id":"123123"},
      ]
      
  },
  agreementExamination(){
    wx.showModal({
      title: '提示',
      content: '确定申报么',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '/pages/index/index'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 事件处理函数
  bindViewTap() {
  
  }
})
