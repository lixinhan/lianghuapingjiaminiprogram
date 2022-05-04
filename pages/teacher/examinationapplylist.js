// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    "studentlist":[
      {
        "photo":"/static/image/home.png",
        "name":"张毅1",
        "event":"参加河北省廊坊市第三十七届评课比赛，获得安次区第一名",
        "score":"30",
      },
      {
        "photo":"/static/image/home.png",
        "name":"张毅1",
        "event":"打骂学生",
        "score":"-30",
      },
      {
        "photo":"/static/image/home.png",
        "name":"张毅1",
        "event":"参加河北省廊坊市第三十七届评课比赛，获得安次区第一名",
        "score":"30",
      },
      {
        "photo":"/static/image/home.png",
        "name":"张毅1",
        "event":"打骂学生",
        "score":"-30",
      },
    ]
  },
  goToOperation(){
    wx.navigateTo({
      url: "/pages/student/operation",
    })
  },
  refuseExamination(){
    wx.showModal({
      title: '提示',
      content: '确定拒绝申请么?',
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
  agreementExamination(){
    wx.navigateTo({
      url: '/pages/teacher/examinationapply',
    })
  },
  // 事件处理函数
  bindViewTap() {
  
  }
})
