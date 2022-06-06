import { teacherExamineApplyAudit, teacherExamineApplyList } from "../../api/teacher"
const util = require('../../utils/util.js')


// pages/teacher/launchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unApplyList:[],
    applyedList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    teacherExamineApplyList({
      data:{status:2},
      success:(responseData)=>{
      var unApplyList=responseData.data.data
      unApplyList.forEach(item => {
        item.start_time=util.formatDate(new Date(item.teacher_examine_apply_start_time*1000))
        item.end_time=util.formatDate(new Date(item.teacher_examine_apply_end_time*1000))

        //格式化状态
        if(item.teacher_examine_status==1){
          const nowTime=new Date().getTime()/1000
          if(item.teacher_examine_apply_start_time>nowTime){
            item.status=10
            item.status_text="待申报"
          }else if(item.teacher_examine_apply_start_time<=nowTime&&item.teacher_examine_apply_end_time>=nowTime){
            item.status=11
            item.status_text="申报中"
          }else{
            item.status=12
            item.status_text="待审批"
          }

        }else if(item.teacher_examine_status==2){
          item.status=20
          item.status_text="审核通过"
        }else{
          item.status=30
          item.status_text="审核拒绝"
        }


      });
      this.setData({unApplyList})

    }})
    teacherExamineApplyList({
      data:{status:1},
      success:(responseData)=>{
      var applyedList=responseData.data.data
      applyedList.forEach(item => {
        item.start_time=util.formatDate(new Date(item.teacher_examine_apply_start_time*1000))
        item.end_time=util.formatDate(new Date(item.teacher_examine_apply_end_time*1000))

        //格式化状态
        if(item.teacher_examine_status==1){
          const nowTime=new Date().getTime()/1000
          if(item.teacher_examine_apply_start_time>nowTime){
            item.status=10
            item.status_text="待申报"
          }else if(item.teacher_examine_apply_start_time<=nowTime&&item.teacher_examine_apply_end_time>=nowTime){
            item.status=11
            item.status_text="申报中"
          }else{
            item.status=12
            item.status_text="待审批"
          }

        }else if(item.teacher_examine_status==2){
          item.status=20
          item.status_text="审核通过"
        }else{
          item.status=30
          item.status_text="审核拒绝"
        }
    });
      this.setData({applyedList})

    }})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToTeacherExamineAdd(){
    wx.navigateTo({
      url: '/pages/teacher/launch',
    })
  },
  goToTeacherExamineEdit(event){
    const query=util.httpBuildQuery({
      teacher_examine_id:event.currentTarget.dataset.id,
      teacher_examine_apply_type:event.currentTarget.dataset.type,
      teacher_examine_apply_type_id:event.currentTarget.dataset.type_id,
    })
    wx.navigateTo({
      url: '/pages/teacher/applydetail?'+query
    })
  },
  
})