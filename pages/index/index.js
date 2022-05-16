// index.js

import { powerList } from "../../api/home";

// 获取应用实例
const app = getApp()

Page({
  data: {
    isLogin:false,
    videoSrc:"",
    eventArray:[]
  },
  onLoad(){
    const loginToken=wx.getStorageSync("login_token")||"";
    console.log("onReady",loginToken)
    if(loginToken!==""){
      this.setData({isLogin:true})
    }
    powerList({
      success:(res)=>{
          const data=res.data;
          var  powerList=[
            {"icon":"/static/image/student.png","name":"学生考核","color":"338ced","clickevent":"goToStudentExamine"},
            {"icon":"/static/image/class.png","name":"班级考核","color":"16a11c","clickevent":"goToClassExamine"},
            {"icon":"/static/image/floor.png","name":"楼层考核","color":"d95536","clickevent":"goToFloorExamine"},
            {"icon":"/static/image/student_search.png","name":"学生查询","color":"5f40b6","clickevent":"goToStudentSearch"},
            {"icon":"/static/image/class_search.png","name":"班级查询","color":"fe7f26","clickevent":"goToClassSearch"},
            {"icon":"/static/image/floor_search.png","name":"楼层查询","color":"cf0053","clickevent":"goToFloorSearch"},
            {"icon":"/static/image/operation_detail.png","name":"考核日志","color":"ec443a","clickevent":"goToExamineItemLog"},

            {"icon":"/static/image/audit.png","name":"教师考核审批","color":"E51400","clickevent":"goToTeacherAuditList"},
            {"icon":"/static/image/apply.png","name":"教师考核申请","color":"6D8764","clickevent":"goToTeacherApplyList"},
            {"icon":"/static/image/launch.png","name":"教师考核发起","color":"76608A","clickevent":"goToTeacherLaunchList"},
            {"icon":"/static/image/detail.png","name":"学生考核细则","color":"f4ba24","clickevent":"goToExamineItemDetail"},
          ]
          if(data.code!=90000){
             for(var x in powerList){
                  if(data.data.indexOf(powerList[x].clickevent)==-1){
                    delete powerList[x];
                  }
             }
          }
          var list=[];
          powerList.forEach(element => {
            if(element!==null){
              list.push(element)
            }
          });
          this.setData({
            eventArray:list
           })
      }
    })
  },
  onShow(){
    const loginToken=wx.getStorageSync("login_token")||"";
    console.log("onReady",loginToken)

    if(loginToken!==""){
      this.setData({isLogin:true})
    }
  },
  //学生考核
  goToStudentExamine(){
      console.log(this.data.isLogin);
      if(this.data.isLogin){
        wx.navigateTo({
          url: '/pages/student/search?type=examine',
        })      
      }else{
        wx.navigateTo({
          url: '/pages/system/login',
        })       
      }
  },
    //学生查询
    goToStudentSearch(){
      console.log(this.data.isLogin);
      if(this.data.isLogin){
        wx.navigateTo({
          url: '/pages/student/search?type=search',
        })      
      }else{
        wx.navigateTo({
          url: '/pages/system/login',
        })       
      }
  },
    //楼层查询
    goToFloorSearch(){
      console.log(this.data.isLogin);
      if(this.data.isLogin){
        wx.navigateTo({
          url: '/pages/floor/statistics?type=floor',
        })      
      }else{
        wx.navigateTo({
          url: '/pages/system/login',
        })       
      }
    },
  //班级搜索
  goToClassSearch(){
    console.log(this.data.isLogin);
    if(this.data.isLogin){
      wx.navigateTo({
        url: '/pages/floor/statistics?type=class',
      })      
    }else{
      wx.navigateTo({
        url: '/pages/system/login',
      })       
    }
  },
  //班级考核
  goToClassExamine(){
    wx.navigateTo({
      url: '/pages/class/search',
    })
  },
  //楼层考核
  goToFloorExamine(){
    wx.navigateTo({
      url: '/pages/floor/search',
    })
  },
  goToTearchExamination(){
    wx.navigateTo({
      url: '/pages/teacher/examination',
    })
  },
  goToLongPress:function(){
    console.log("长按事件")
  },
  goToExamineItemDetail(){
    wx.navigateTo({
      url: '/pages/student/examineitem',
    })
  },
  goToExamineItemLog(){
    wx.navigateTo({
      url: '/pages/student/examineitemlog',
    })
  },
  goToExaminationApplyList(){
    wx.navigateTo({
      url: '/pages/teacher/examinationapplylist',
    })
  },
  goToTeacherAuditList(){
    wx.navigateTo({
      url: '/pages/teacher/auditlist',
    })
  },
  goToTeacherApplyList(){
    wx.navigateTo({
      url: '/pages/teacher/applylist',
    })
  },
  goToTeacherLaunchList(){
    wx.navigateTo({
      url: '/pages/teacher/launchlist',
    })
  }
})
