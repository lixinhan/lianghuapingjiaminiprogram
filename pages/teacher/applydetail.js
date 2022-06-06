import { teacherExamineApply, teacherExamineApplyDetail, teacherExamineDetail } from "../../api/teacher"
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast';

// pages/teacher/applydetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher_examine_id:"",
    teacher_examine_apply_type:"",
    teacher_examine_apply_type_id:"",
    teacher_examine_title:"",
    teacher_examine_description:"",
    teacher_examine_type:"",
    grade_names:"",
      organization_names:"",
      examine_teachers:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      teacher_examine_id:options.teacher_examine_id,
      teacher_examine_apply_type:options.teacher_examine_apply_type,
      teacher_examine_apply_type_id:options.teacher_examine_apply_type_id
    },)
    teacherExamineDetail({
      data:{
        teacher_examine_id:options.teacher_examine_id,
        teacher_examine_apply_type:options.teacher_examine_apply_type,
        teacher_examine_apply_type_id:options.teacher_examine_apply_type_id
      },
      success: resposneData =>{
          var data=resposneData.data.data;
          this.setData({
            teacher_examine_title:data.teacher_examine_title,
            teacher_examine_description:data.teacher_examine_description,
            teacher_examine_type:data.teacher_examine_type,
            grade_names:data.grade_names,
            organization_names:data.organization_names,
          })

      }
    })
    teacherExamineApplyDetail({
      data:options,
      success:(resposneData)=>{
        var data=resposneData.data.data;
        this.setData({
          examine_teachers:data.examine_teachers,
          examine_items:data.examine_items
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onChange(event){
    var data=this.data.examine_teachers;
    data.forEach(element => {
        if(element.teacher_id==event.currentTarget.dataset.teacher_id){
          element.teacher_examine_item_id=event.detail
        }
    });

  },
  onSubmit(){
    var data={
      "teacher_examine_id": this.data.teacher_examine_id,
      "teacher_examine_apply_type": this.data.teacher_examine_apply_type,
      "teacher_examine_apply_type_id": this.data.teacher_examine_apply_type_id,
    }
    var list=[];
    var examine_teachers=this.data.examine_teachers;
    examine_teachers.forEach(element=>{
      if(element.teacher_examine_item_id != "" ){
        list.push(
          {
            teacher_id:element.teacher_id,
            teacher_examine_item_id:element.teacher_examine_item_id
          }
          )
      }
    })
    data.teacher_examine_item=JSON.stringify(list)
    teacherExamineApply({
      data:data,
      success:responseData=>{
        var data=responseData.data;
        if(data.code !== 0){
          Toast(data.msg)
        }else{
          wx.navigateBack({
            delta: 0,
            success:function(){
                  var page=getCurrentPages().pop();
                  if(page == undefined || page == null)return;
                  page.onLoad();
            }
          })
        }
      }
    })
  },
  canleSelect(event){
    const teacher_id=event.currentTarget.dataset.teacher_id
    var examine_teachers=this.data.examine_teachers;
    console.log(examine_teachers)
    examine_teachers.forEach(element=>{
      if(element.teacher_id==teacher_id){
          element.teacher_examine_item_id=""
      }
    })
    this.setData({examine_teachers})

  }
})